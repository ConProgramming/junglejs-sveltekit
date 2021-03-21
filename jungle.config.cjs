const fetch = require('node-fetch');

module.exports = async () => {
    const bookRes = await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:0201558025,LCCN:93005405&format=json');

    return {
        dataSources: [
            {
                format: "json", name: "book", items: Object.values(await bookRes.json()),
            },
            {
                format: "json", name: "author", items: [
                    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
                    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
                    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
                ], queryArgs: { id: 'Int!' },
            }
        ]
    }
};