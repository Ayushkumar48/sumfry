import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { bookmarks } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, { message: 'User not logged in' });
	}
	try {
		const { summary, metaData, url } = await request.json();
		const userId = locals.user.id;
		await db.insert(bookmarks).values({ summary, metaData, url, userId });
		return json({ message: 'Bookmark saved successfully' });
	} catch (err) {
		console.error(err);
		error(500, { message: 'Failed to save bookmark' });
	}
};
