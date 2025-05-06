<script>
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { BookmarkIcon } from '@lucide/svelte';
	import UserNav from '../user-nav.svelte';
	import DarkToggler from '../dark-toggler.svelte';
</script>

<header class="border-b">
	<div class="container flex h-16 items-center justify-between px-4 md:px-6">
		<a href="/" class="flex items-center gap-2 text-xl font-bold">
			<BookmarkIcon class="h-5 w-5" />
			<span>SumFry</span>
		</a>
		<nav class="hidden gap-6 md:flex">
			<a href="/bookmark" class="text-sm font-medium underline-offset-4 hover:underline">
				Bookmarks
			</a>
		</nav>
		<div class="flex items-center gap-4">
			<DarkToggler />
			{#if page.data.user}
				<UserNav />
			{:else}
				<a href="/login">
					<Button variant="outline" size="sm">Log In</Button>
				</a>
				<a href="/login?signup=true">
					<Button size="sm">Sign Up</Button>
				</a>
			{/if}
		</div>
	</div>
</header>
