/** @type {import('@sveltejs/kit').Config} */

const jungleConfig = require('./jungle.config.cjs');
const { junglePreprocess } = require('junglejs');

module.exports = {
  preprocess: [junglePreprocess],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: ['@junglejs/adapter-junglejs', { adaptwith: '@sveltejs/adapter-static', jungleConfig }],

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte'
  }
};
