module.exports = {
  junglePreprocess: {
    script: async ({ content }) => {
      if (!content.includes('QUERY')) return { code: content };

      //TODO: Make a jungle adapter that takes an argument of another adapter, it first does its preloading from a jungle.config.js then calls that adapter

      //TODO: Resolve variables like page_params_slug to page.params.slug

      return {
        code: `
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
        `,
      };
    },
  }
};
