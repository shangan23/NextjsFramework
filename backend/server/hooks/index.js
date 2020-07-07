'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const hasHook = fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    });

console.log('hasHook', hasHook);

const hooksController = async (...params) => {
    
    let controllerIndex = params.findIndex(x => x.sourceModel)

    //check for hooks before proceeding
    if (!hasHook.includes(`${params[controllerIndex].sourceModel}.js`))
        return;

    console.log('-----');
    let currentHook = require(`./${params[controllerIndex].sourceModel}`);
    let data;
    console.log('-----', currentHook);
    switch (params[controllerIndex].hookToExec) {
        case 'beforeCreate':
            data = currentHook.beforeCreate(params[0], params[1]);
            break;
        case 'beforeUpdate':
            data = currentHook.beforeUpdate(params[0], params[1]);
            break;
    }
    console.log(`---${params[controllerIndex].hookToExec}--`, await data);
    console.log('----');
    return data;
};

module.exports = hooksController;