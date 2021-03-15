<script context="module">
	export const load = async({ fetch }) => {
		const query = `
			query Doubled($x: Int) {
				double(number: $x)
			}
		`;

		const variables = {
			x: 19,
		};

		const response = await fetch("/graphql", {
			body: { query, variables },
			headers: {
				"Authorization": "Token ABC123",
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const { data, errors } = await response.json();

		if (errors) return {
			error: new Error(errors.map(({ message }) => message).join("\n")),
			status: 500,
		};

		return {
			props: {
				doubled: data.double,
			},
		};
	}
</script>
<script>
	import Counter from '$lib/Counter.svelte';
  export let doubled;
</script>

<main>
	<h1>Hello world!</h1>
	<h2>The API said {doubled}</h2>

	<Counter />

	<p>Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.</p>
  <p>Visit <a href="/graphql">GraphiQL</a> to explore the API.</p>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
