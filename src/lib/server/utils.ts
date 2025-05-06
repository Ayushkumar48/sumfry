import { gemini } from './db';

export async function shortenSummary(content: string) {
	const prompt = `
  Summarize the following content in 1-2 pages of A4 size. If the content is less than 2 para then return the content as is. If there are images then keep 2-3 images maximum which are most relevant.
  But if the content is more than 1-2 pages of A4 size, summarize it in a concise manner.
  Content:
  ${content}
  `;
	try {
		const response = await gemini.models.generateContent({
			model: 'gemini-2.0-flash',
			contents: prompt
		});
		if (response.text && response.text.length > 0) {
			return response.text;
		}
		return '';
	} catch (err) {
		console.error(err);
		return '';
	}
}
