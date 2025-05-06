<script lang="ts">
	import { Calendar, Globe, ArrowLeft, Trash2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardTitle } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import DOMPurify from 'isomorphic-dompurify';
	import { Lexer, Parser, Renderer } from 'marked';
	import { toast } from 'svelte-sonner';
	import { bookmarks } from '$lib/store/store.svelte.js';
	import { goto } from '$app/navigation';
	let { data } = $props();
	const { bookmark } = data;
	function renderMarkdownLocally(markdown: string) {
		const tokens = Lexer.lex(markdown);
		const renderer = new Renderer();

		renderer.image = function ({ href, title, text }) {
			const titleAttr = title ? ` title="${title}"` : '';
			return `<img src="${href}" alt="${text}"${titleAttr} class="rounded-md max-w-40 h-auto" />`;
		};

		const parser = new Parser({ renderer });
		return parser.parse(tokens);
	}
	async function handleBookmarkDelete() {
		const response = await fetch(`/api/bookmarks/${bookmark.id}`, { method: 'DELETE' });
		if (!response.ok) {
			toast.error('Failed to delete bookmark');
		} else {
			bookmarks.current = bookmarks.current.filter((b) => b.id !== bookmark.id);
			goto('/bookmark');
		}
	}
</script>

<div class="space-y-8 p-10">
	<div class="flex items-center">
		<a
			href="/bookmark"
			class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
		>
			<ArrowLeft class="h-4 w-4" />
			<span>Back to bookmarks</span>
		</a>
	</div>

	{#if bookmark}
		<Card class="overflow-hidden border-none shadow-md">
			<div class="from-primary/10 to-primary/5 bg-gradient-to-r p-6">
				<div class="flex items-center gap-4">
					<Avatar class="h-12 w-12 rounded-md border shadow-sm">
						<AvatarImage src={bookmark.metaData.icon || ''} alt={bookmark.metaData.title} />
						<AvatarFallback class="bg-primary/10 text-primary rounded-md">
							{bookmark.metaData.title?.[0]?.toUpperCase() || 'B'}
						</AvatarFallback>
					</Avatar>
					<div class="space-y-1">
						<CardTitle class="text-2xl">{bookmark.metaData.title}</CardTitle>
						<CardDescription>
							<a
								href={bookmark.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-muted-foreground hover:text-primary inline-flex items-center gap-1.5 transition-colors"
							>
								<Globe class="h-3.5 w-3.5" />
								<span class="underline underline-offset-4">{bookmark.url}</span>
							</a>
						</CardDescription>
					</div>
				</div>
				<div class="flex w-full items-center justify-end gap-4">
					<div class="text-muted-foreground flex items-center text-sm">
						<Calendar class="mr-2 h-4 w-4" />
						<span>
							Bookmarked
							{new Date(bookmark?.createdAt).toLocaleString('en-US', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</span>
					</div>

					<Button
						variant="destructive"
						size="sm"
						onclick={handleBookmarkDelete}
						class="cursor-pointer"
					>
						<Trash2 class="h-4 w-4" />
						Delete
					</Button>
				</div>
			</div>

			<CardContent class="p-6 pt-6">
				<div>
					<h3 class="mb-2 text-lg font-medium">Summary</h3>
					<div class="text-muted-foreground text-justify leading-relaxed whitespace-pre-line">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html DOMPurify.sanitize(
							renderMarkdownLocally(
								bookmark?.summary || 'No summary available for this bookmark.'
							) as string
						)}
					</div>
				</div>

				{#if bookmark.metaData?.description}
					<Separator class="my-6" />
					<div class="prose prose-sm dark:prose-invert max-w-none">
						<h3 class="mb-2 text-lg font-medium">Description</h3>
						<p class="text-muted-foreground leading-relaxed">
							{bookmark.metaData?.description || ''}
						</p>
					</div>
				{/if}
			</CardContent>
		</Card>
	{:else}
		<Card>
			<CardContent class="p-6 text-center">
				<p>Bookmark not found</p>
			</CardContent>
		</Card>
	{/if}
</div>

<svelte:head>
	<title>SumFry | Bookmark | {bookmark?.metaData.title || 'Untitled'}</title>
	<meta name="description" content="Manage your bookmarks with SumFry" />
</svelte:head>
