<script lang="ts">
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { CopyIcon, Trash2 } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { bookmarks } from '$lib/store/store.svelte';

	let { url, id }: { url: string; id: string } = $props();
	async function handleBookmarkDelete() {
		const response = await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
		if (!response.ok) {
			toast.error('Failed to delete bookmark');
		} else {
			bookmarks.current = bookmarks.current.filter((bookmark) => bookmark.id !== id);
			toast.success('Bookmark deleted');
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item
				onclick={() => {
					navigator.clipboard.writeText(url);
					toast.success('URL copied to clipboard');
				}}
				class="flex items-center"
			>
				<CopyIcon class="h-4 w-4" />
				Copy URL
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={handleBookmarkDelete} class="flex items-center">
			<Trash2 class="h-4 w-4" />
			Delete
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
