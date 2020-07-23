'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const moduleController = async (...params) => {

    const hasModules = fs
        .readdirSync('modules/')
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        });

    console.log('__dirname',hasModules,path.dirname)

    let module = params[0];
    let settings = params[1];

    console.log('params ===>', hasModules.includes(`${module}.js`));

    if (!hasModules.includes(`${module}.js`))
        return;

    let currentModule = require(`./${module}`);
    let columns = currentModule(module, settings);
    console.log('index cols ->', columns)
    return columns;
};

module.exports = moduleController;