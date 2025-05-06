<script>
	import { Button } from '$lib/components/ui/button';
</script>

<section class="w-full py-12 md:py-24 lg:py-32">
	<div class="container px-4 md:px-6">
		<div class="flex flex-col items-center justify-center space-y-4 text-center">
			<div class="space-y-2">
				<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Ready to Get Started?
				</h2>
				<p
					class="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
				>
					Sign up now and start saving your important links with automatic summaries.
				</p>
			</div>
			<div class="flex flex-col gap-2 min-[400px]:flex-row">
				<a href="/login?signup=true">
					<Button size="lg">Create Account</Button>
				</a>
				<a href="/login">
					<Button variant="outline" size="lg">Log In</Button>
				</a>
			</div>
		</div>
	</div>
</section>
