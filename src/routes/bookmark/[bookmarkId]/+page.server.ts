import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { bookmarks } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const bookmarkId = params.bookmarkId;
		const [bookmark] = await db.select().from(bookmarks).where(eq(bookmarks.id, bookmarkId));
		return {
			bookmark
		};
	} catch (err) {
		console.error(err);
		throw error(404, 'Bookmark not found');
	}
};
