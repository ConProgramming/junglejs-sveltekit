const { SchemaComposer } = require('graphql-compose');
const { composeWithJson } = require('graphql-compose-json');

const find = require('lodash.find');

//TODO: Add back types

module.exports = {
  createSchema: async () => {
    const jungleConfig = require(process.cwd() + '/jungle.config.cjs');
    const { dataSources = [] } = jungleConfig;

    const schemaComposer = new SchemaComposer();

    dataSources.forEach(source => {
      const typeName = source.name.charAt(0).toUpperCase() + source.name.slice(1);
      let newFields = {};

      switch (source.format) {
        //TODO: handle dir/markdown, etc...
        case "json":
          composeWithJson(typeName, source.items[0], { schemaComposer });

          newFields[source.name] = {
            type: typeName,
            args: source.queryArgs,
            resolve: (_, args) => find(source.items, args),
          };

          newFields[source.name + "s"] = {
            type: `[${typeName}]`,
            resolve: () => source.items,
          };
          break;
      }

      schemaComposer.Query.addFields(newFields);
    });

    return schemaComposer.buildSchema();
  },
  junglePreprocess: {
    script: async ({ content }) => {
      if (!content.includes('QUERY')) return { code: content };

      //TODO: Resolve variables like page_params_slug to page.params.slug

      return {
        code: `
          import { browser } from "$app/env";
          
          ${content}
    
          export const load = async({ fetch, page }) => {
            const { getVariablesFromPage } = await import("junglejs/helpers.mjs");

            let variables = {
              ...getVariablesFromPage(page, QUERY),
            }

            try {
              variables = { ...variables, ...VARIABLES }
            } catch(e) {}

            const response = await fetch("/graphql", {
              body: { query: QUERY, variables },
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
  },
};
