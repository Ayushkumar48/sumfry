<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { enhance } from '$app/forms';
	let showPassword: boolean = $state(false);
	let login: boolean = $state(true);
	let { form } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	{#if login}
		<!-- Login -->

		<Card.Root class="w-2xl">
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Login</Card.Title>
				<Card.Description>Enter your email below to login</Card.Description>
				{#if form?.message}
					<p class="text-sm text-red-600">{form.message}</p>
				{/if}
			</Card.Header>
			<Card.Content>
				<form action="?/login" use:enhance class="grid gap-4" method="POST">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" name="email" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••••••"
							name="password"
						/>
					</div>
					<Button class="w-full cursor-pointer" type="submit">Login</Button>
				</form>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full flex-col gap-y-2">
					<small>
						Don't have an account, <button
							class="cursor-pointer font-semibold text-blue-700"
							onclick={() => (login = false)}>create</button
						> here.
					</small>
				</div>
			</Card.Footer>
		</Card.Root>
	{:else}
		<!-- Registere -->

		<Card.Root class="w-2xl">
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Create an account</Card.Title>
				<Card.Description>Enter your email below to create your account</Card.Description>
				{#if form?.message}
					<p class="text-sm text-red-600">{form.message}</p>
				{/if}
			</Card.Header>
			<Card.Content>
				<form action="?/register" use:enhance class="grid gap-4" method="POST">
					<div class="grid gap-2">
						<Label for="name">Name</Label>
						<Input id="name" type="text" placeholder="John Doe" name="name" />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" name="email" />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="••••••••••••"
							name="password"
						/>
					</div>
					<Button class="w-full cursor-pointer" type="submit">Create account</Button>
				</form>
			</Card.Content>
			<Card.Footer>
				<div class="flex w-full flex-col gap-y-2">
					<small>
						Already have an account, <button
							class="cursor-pointer font-semibold text-blue-700"
							onclick={() => (login = true)}>login</button
						> here.
					</small>
				</div>
			</Card.Footer>
		</Card.Root>
	{/if}
</div>

<svelte:head>
	<title>SumFry | Login</title>
	<meta name="description" content="Login to SumFry" />
</svelte:head>
