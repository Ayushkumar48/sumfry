<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { columns } from '$lib/custom/bookmark/columns.js';
	import DataTable from '$lib/custom/bookmark/data-table.svelte';
	import { bookmarks } from '$lib/store/store.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	bookmarks.current = data.bookmarks;
</script>

<div class="px-6 py-10">
	<div class="flex justify-between">
		<h2 class="mb-4 text-2xl font-bold">Bookmarks</h2>
		<Button href="/bookmark/new">New Bookmark</Button>
	</div>
	<DataTable bind:data={bookmarks.current} {columns} />
</div>

<svelte:head>
	<title>SumFry | Bookmarks</title>
	<meta name="description" content="Manage your bookmarks with SumFry" />
</svelte:head>
