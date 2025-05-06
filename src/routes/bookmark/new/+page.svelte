<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	let url = $state('');
	let { form } = $props();
	let summary = $state('');
	let parsedSummary = $state('');
	let parsedMetaData = $derived(
		Object.entries(form?.metaData || {}).map(([key, value]) => ({ key, value }))
	);

	$effect(() => {
		async function parseMarkdown() {
			parsedSummary = DOMPurify.sanitize(await marked.parse(summary));
		}
		parseMarkdown();
	});
	async function handleShortenSummary() {
		if (!summary) {
			toast.error('No summary to shorten');
			return;
		}
		toast.loading('Shortening summary...');
		const shortened = await fetch('/api/summaryShorten', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(summary)
		});
		const shortenedSummary = await shortened.json();
		if (!shortenedSummary.summary) {
			toast.error('Failed to shorten summary');
			return;
		}
		summary = shortenedSummary.summary;
		toast.success('Summary shortened');
	}
	async function handleSave() {
		if (!summary) {
			toast.error('No summary to save');
			return;
		}
		let toastId = toast.loading('Saving summary...');
		const response = await fetch('/api/bookmarkSave', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url, summary, metaData: form?.metaData })
		});
		const res = await response.json();
		if (!response.ok) {
			toast.error(res.message || 'Failed to save summary', { id: toastId });
			return;
		}
		toast.success('Summary saved!', { id: toastId });
		goto('/bookmark');
	}
</script>

<div class="flex flex-1 items-center justify-center px-4 py-8">
	<div
		class="flex max-w-6xl min-w-4xl flex-col gap-6 rounded-2xl bg-gray-100 p-8 shadow-lg dark:bg-gray-800"
	>
		<div>
			<h3 class="text-3xl font-semibold text-gray-900 dark:text-white">Get Summary</h3>
			<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
				Enter the URL to get a summary of the webpage.
			</p>
		</div>

		<form
			class="flex w-full flex-col gap-4 sm:flex-row"
			method="POST"
			use:enhance={() => {
				const toastId = toast.loading('Generating summary...');

				return async ({ update }) => {
					await update();
					url = form?.url as string;
					summary = form?.content;
					toast.success('Summary generated!', { id: toastId });
				};
			}}
		>
			<Input
				type="url"
				placeholder="Enter the URL..."
				class="flex-1 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				name="url"
				bind:value={url}
			/>
			<Button type="submit" class="w-full cursor-pointer sm:w-auto">Get Summary</Button>
		</form>
		{#if form?.content && form?.metaData}
			<div class="flex items-center justify-between">
				<Button variant="outline" class="cursor-pointer" onclick={handleShortenSummary}>
					Shorten Summary
				</Button>

				<Button class="cursor-pointer" onclick={handleSave}>Save</Button>
			</div>
			<div>
				<span class="text-xl font-bold">Meta Data</span>
				<br />
				<table class="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
					<thead class="bg-gray-100 dark:bg-gray-800">
						<tr>
							<th class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Key</th>
							<th class="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Value</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
						{#each parsedMetaData as item (item.key)}
							<tr>
								<td class="px-4 py-2 text-gray-800 dark:text-gray-200">{item.key}</td>
								<td class="px-4 py-2 break-words text-gray-800 dark:text-gray-200">{item.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div>
				<span class="text-xl font-bold">Summary</span>
				<br />
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html parsedSummary}
			</div>
		{/if}
	</div>
</div>

<svelte:head>
	<title>SumFry | New Bookmark</title>
	<meta name="description" content="Manage your bookmarks with SumFry" />
</svelte:head>
