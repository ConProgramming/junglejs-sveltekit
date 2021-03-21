<script context="module">
  const QUERY = `
    query Authors {
      authors {
        id
        firstName
        lastName
      }
      books {
        bibKey: bib_key
        thumbnail: thumbnail_url
      }
    }
  `;

</script>

<script>
  import Counter from "$lib/Counter.svelte";
  export let authors = [], books = [];
</script>

<main>
  <h1>Test</h1>

  <Counter />

  {#each authors as author}
    <h3>
      The API said <a href="/author/{author.id}">{author.id}</a> is named {author.firstName}
      {author.lastName}
    </h3>
  {/each}

  {#each books as book}
    <h3>
      The API said {book.bibKey} is <img src={book.thumbnail}/>
    </h3>
  {/each}

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>
  <p>Visit <a href="/graphql">GraphiQL</a> to explore the API.</p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
