const fs = require('fs');
const path = require('path');

// RUN WITH: node .jungle/temp-cli.cjs

const jungleConfigImport = require(path.join(process.cwd(), 'jungle.config.cjs'));

const jungleDataPath = path.join(process.cwd(), 'src', 'lib', 'jungle.data.json');
  
jungleConfigImport().then(({ dataSources }) => {
    fs.writeFileSync(jungleDataPath, JSON.stringify(dataSources, undefined, 2)); 
});