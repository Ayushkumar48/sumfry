import { hash, verify } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(302, '/bookmark');
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		try {
			const formData = await event.request.formData();

			const email = formData.get('email') as string;
			const password = formData.get('password') as string;

			if (!email || !validateEmail(email)) {
				return fail(400, {
					message: 'Invalid username (min 3, max 31 characters, alphanumeric only)',
					success: false
				});
			}
			if (!password || !validatePassword(password)) {
				return fail(400, {
					message: 'Invalid password (min 6, max 255 characters)',
					success: false
				});
			}

			const [result] = await db.select().from(table.user).where(eq(table.user.email, email));

			if (!result) {
				return fail(400, { message: 'Incorrect username or password', success: false });
			}

			const validPassword = await verify(result.password, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1
			});
			if (!validPassword) {
				return fail(400, { message: 'Incorrect username or password', success: false });
			}

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, result.id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'An error has occurred', success: false });
		}
		redirect(302, '/bookmark');
	},

	register: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const password = formData.get('password') as string;

		if (!email || !validateEmail(email)) {
			return fail(400, { message: 'Invalid email', success: false });
		}
		if (!password || !validatePassword(password)) {
			return fail(400, { message: 'Invalid password', success: false });
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db.insert(table.user).values({ id: userId, name, email, password: passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.error(e);
			return fail(500, { message: 'An error has occurred', success: false });
		}
		redirect(302, '/bookmark');
	}
};

function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

function validateEmail(email: unknown): boolean {
	if (typeof email !== 'string') return false;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email) && email.length >= 3 && email.length <= 31;
}

function validatePassword(password: unknown): boolean {
	return typeof password === 'string' && password.length >= 6 && password.length <= 255;
}
