'use strict';

const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

module.exports = (filters) => {

    filters = JSON.parse(filters);
    let obj = {}; //$and = [], $or = [],
    filters.sort(dynamicSort('lo'));
    filters.map((data, index) => {
        if (data.k.indexOf('fk_') === 0) {
            obj[data.k.replace('fk_', '')] = data.v;
        } else {
            obj[data.k] = data.v;
        }
        /*obj[data.k] = { $like: `%${data.v}%` };
        if (data.lo === 'AND') {
            $and.push(obj);
        } else if (data.lo === 'OR') {
            $or.push(obj);
        }*/
    });

    return obj;
}