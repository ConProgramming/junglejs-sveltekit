import gql from 'graphql-tag';

export const getQueryFirstDef = (query) => {
    return (typeof query == "string" ? gql(query) : query)["definitions"][0];
};

export const getQueryVariableNames = (query) => {
    return getQueryFirstDef(query)["variableDefinitions"].map(
        (def) => def.variable.name.value
    );
};

const fixValFromString = (val) => {
    const fixed = parseInt(val); //TODO: More cases

    if (isNaN(fixed)) return val;

    return fixed;
}

export const getVariablesFromPage = (page, query) => {
    const queryVariableNames = getQueryVariableNames(query);

    let variableVals = {};

    for (const varName of queryVariableNames) {
        const splitVarName = varName.split("_");

        if (splitVarName[0] == "page") {
            let valueFromPage;

            splitVarName.slice(1).forEach((varPart, index) => {
                valueFromPage = valueFromPage
                    ? valueFromPage[varPart]
                    : page[varPart];
            });

            variableVals[varName] = fixValFromString(valueFromPage);
        }
    }

    return variableVals;
};