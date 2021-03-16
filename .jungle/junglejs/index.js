const { SchemaComposer } = require('graphql-compose');
const { composeWithJson } = require('graphql-compose-json');

const find = require('lodash.find');

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
