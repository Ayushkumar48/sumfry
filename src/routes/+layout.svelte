<script lang="ts">
	import Navbar from '$lib/custom/root/navbar.svelte';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors />
<div class="flex flex-col">
	<Navbar />
	{@render children()}
</div>

<svelte:head>
	<title>SumFry</title>
	<meta name="description" content="Summarize your text with SumFry" />
</svelte:head>
