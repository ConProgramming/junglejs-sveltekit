const fs = require('fs');
const path = require('path');

const jungleConfig = require(path.join(process.cwd(), 'jungle.config.cjs'));

Promise.all(jungleConfig.dataSources.map(async (source) => {
    return {
        ...source,
        items: await (jungleConfig.handlers[source.format](source.items)),
    }
})).then((transformedDataSources) => {
    const jungleDataPath = path.join(process.cwd(), 'src', 'lib', 'jungle.data.json');
    fs.writeFileSync(jungleDataPath, JSON.stringify(transformedDataSources, undefined, 2));
});