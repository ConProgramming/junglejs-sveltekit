//TODO: Make this export an async function, that function will get called and its result will be 
//      cached to the filesystem for it to be then read in by sveltekit
module.exports = {
    dataSources: [
        {
            format: "json", name: "author", items: [
                { id: 1, firstName: 'Tom', lastName: 'Coleman' },
                { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
                { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
            ], queryArgs: { id: 'Int!' },
        }
    ]
}