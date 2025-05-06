<script>
	import Cta from '$lib/custom/root/cta.svelte';
	import Features from '$lib/custom/root/features.svelte';
	import Hero from '$lib/custom/root/hero.svelte';
	import HowItWorks from '$lib/custom/root/how-it-works.svelte';
</script>

<main class="flex-1">
	<Hero />

	<Features />

	<HowItWorks />

	<Cta />
</main>

<footer class="bg-muted/50 border-t">
	<div class="container flex w-full flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
		<p class="text-muted-foreground text-xs">@ 2025 SumFry. All rights reserved.</p>
		<nav class="flex gap-4 sm:ml-auto sm:gap-6">
			<a href="#top" class="text-xs underline-offset-4 hover:underline"> Terms </a>
			<a href="#top" class="text-xs underline-offset-4 hover:underline"> Privacy </a>
		</nav>
	</div>
</footer>

<svelte:head>
	<title>SumFry</title>
	<meta name="description" content="Summarize your text with SumFry" />
</svelte:head>
