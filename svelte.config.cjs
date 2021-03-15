/** @type {import('@sveltejs/kit').Config} */

const junglePreprocess = {
  script: async ({ content }) => {
    if (!content.includes('QUERY')) return { code: content };

    return { code: `
      ${content}

      export const load = async({ fetch }) => {
        const response = await fetch("/graphql", {
          body: { query: QUERY, variables: (VARIABLES ? VARIABLES : {}) },
          headers: {
            "Content-Type": "application/json",
            "cache": "no-cache"
          },
          method: "POST",
        });

        const { data, errors } = await response.json();

        if (errors) return {
          error: new Error(errors.map(({ message }) => message).join("\\n")),
          status: 500,
        };

        return {
          props: data,
        };
      }
    `};
  },
};

module.exports = {
  preprocess: [
    junglePreprocess,
  ],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: '@sveltejs/adapter-node',

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
