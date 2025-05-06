<script>
	import { Button } from '$lib/components/ui/button';
	import { BookmarkIcon, LinkIcon, TextIcon } from '@lucide/svelte';
</script>

<section class="bg-muted/50 w-full py-12 md:py-24 lg:py-32">
	<div class="container px-4 md:px-6">
		<div class="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
			<div class="space-y-4">
				<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Save Links & Get Instant Summaries
				</h1>
				<p class="text-muted-foreground md:text-xl">
					SumFry helps you save important links and automatically generates summaries so you can
					quickly recall what matters.
				</p>
				<div class="flex flex-col gap-3 sm:flex-row">
					<a href="/signup">
						<Button size="lg">Get Started</Button>
					</a>
					<a href="#features">
						<Button variant="outline" size="lg">Learn More</Button>
					</a>
				</div>
			</div>
			<div class="flex justify-center">
				<div
					class="bg-background relative w-full max-w-md overflow-hidden rounded-xl border p-4 shadow-lg"
				>
					<div class="space-y-3">
						<div class="flex items-center gap-3 border-b pb-3">
							<div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
								<LinkIcon class="text-primary h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">Save Any Link</h3>
								<p class="text-muted-foreground text-xs">Paste URLs and save them instantly</p>
							</div>
						</div>
						<div class="flex items-center gap-3 border-b pb-3">
							<div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
								<TextIcon class="text-primary h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">Auto-Summary</h3>
								<p class="text-muted-foreground text-xs">
									AI-powered summaries of your saved content
								</p>
							</div>
						</div>
						<div class="flex items-center gap-3">
							<div class="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
								<BookmarkIcon class="text-primary h-5 w-5" />
							</div>
							<div>
								<h3 class="font-medium">Organize & Access</h3>
								<p class="text-muted-foreground text-xs">Easily find and manage your bookmarks</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
