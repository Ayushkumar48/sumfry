<script>
	import { BookmarkIcon, LinkIcon, TextIcon } from '@lucide/svelte';
</script>

<section id="features" class="w-full py-12 md:py-24 lg:py-32">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center justify-center space-y-4 text-center">
			<div class="space-y-2">
				<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
				<p
					class="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
				>
					Everything you need to save and understand web content
				</p>
			</div>
		</div>
		<div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
			<div class="flex flex-col justify-center space-y-4">
				<div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
					<LinkIcon class="text-primary h-6 w-6" />
				</div>
				<div class="space-y-2">
					<h3 class="text-xl font-bold">Save Bookmarks</h3>
					<p class="text-muted-foreground">
						Paste any URL to save it with title and favicon automatically extracted.
					</p>
				</div>
			</div>
			<div class="flex flex-col justify-center space-y-4">
				<div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
					<TextIcon class="text-primary h-6 w-6" />
				</div>
				<div class="space-y-2">
					<h3 class="text-xl font-bold">Auto-Summary</h3>
					<p class="text-muted-foreground">
						AI-powered summaries generated for each bookmark using Jina AI.
					</p>
				</div>
			</div>
			<div class="flex flex-col justify-center space-y-4">
				<div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
					<BookmarkIcon class="text-primary h-6 w-6" />
				</div>
				<div class="space-y-2">
					<h3 class="text-xl font-bold">Organize & Access</h3>
					<p class="text-muted-foreground">
						View your bookmarks in a responsive grid with easy deletion.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
