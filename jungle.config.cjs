const fetch = require('node-fetch');

module.exports = {
    dataSources: [
        {
            format: "fetch/json", name: "book", items: ['https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&format=json'],
        },
        {
            format: "json", name: "author", items: [
                { id: 1, firstName: 'Tom', lastName: 'Coleman' },
                { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
                { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
            ], queryArgs: { id: 'Int!' },
        }
    ],
    sourceHandlers: {
        "json": (items) => items,
        "fetch/json": async (items) => Object.values(await (await fetch(...items)).json()),
        "dir/markdown": (items) => {
            throw "TODO: Implement as @junglejs/handler-dir-markdown";
            /*return fs.readdirSync(path.join(dirname, items)).map((fileName) => {
                const post = fs.readFileSync(
                    path.resolve(path.join(dirname, items), fileName),
                    "utf-8"
                );

                const renderer = new marked.Renderer();

                const { data, content } = grayMatter(post);
                const html = marked(content, { renderer });

                data['path'] = fileName.substring(0, fileName.length - 3);

                return { html, ...data };
            })*/
        }
    }
};