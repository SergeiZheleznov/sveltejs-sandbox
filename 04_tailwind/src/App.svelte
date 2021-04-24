<script lang="ts">
	export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a class="text-blue-600 underline" href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style style lang="postcss">
	main {
		@apply text-center;
		@apply p-4;
		max-width: 240px;
		@apply mx-auto;
	}

	h1 {
		@apply text-red-600;
		@apply uppercase;
		font-size: 4em;
		@apply font-thin;
	}

	@media (min-width: 640px) {
		main {
			@apply max-w-none;
		}
	}
</style>