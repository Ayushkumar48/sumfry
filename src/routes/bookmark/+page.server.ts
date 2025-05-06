import { db } from '$lib/server/db';
import { bookmarks } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(308, '/login');
	}
	const allBookmarks = await db
		.select()
		.from(bookmarks)
		.where(eq(bookmarks.userId, locals.user.id));
	const formatedBookmarks = allBookmarks.map((item) => ({
		id: item.id,
		title: item.metaData.title,
		url: item.url,
		summary: item.summary,
		icon: item.metaData.icon,
		description: item.metaData.description,
		createdAt: item.createdAt
	}));
	return {
		bookmarks: formatedBookmarks
	};
};
