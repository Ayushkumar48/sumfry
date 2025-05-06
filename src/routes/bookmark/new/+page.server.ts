import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import getMetaData from 'metadata-scraper';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(302, '/login');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const url = data.get('url') as string;
			const target = encodeURIComponent(url);

			const res = await fetch(`https://r.jina.ai/${target}`, {
				headers: { Accept: 'application/json' }
			});
			const r = await res.json();
			const content = r.data.content;
			const metaData = await getMetaData(url);

			return { success: true, content, metaData, url };
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	}
};
