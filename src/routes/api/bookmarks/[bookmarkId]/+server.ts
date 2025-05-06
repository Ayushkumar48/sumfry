import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { bookmarks } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ params }) => {
	const bookmarkId = params.bookmarkId;
	try {
		await db.delete(bookmarks).where(eq(bookmarks.id, bookmarkId));
		return json({ message: 'Bookmark deleted successfully' });
	} catch (err) {
		console.error(err);
		error(500, 'Failed to delete bookmark');
	}
};
