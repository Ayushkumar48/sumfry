import { shortenSummary } from '$lib/server/utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		const summary = await shortenSummary(data);

		return json({ success: true, summary });
	} catch (err) {
		console.error(err);
		return json({ success: false });
	}
};
