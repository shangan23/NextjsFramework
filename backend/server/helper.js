'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

const association = (model) => {
	return model.associations;
}

const filters = (filters) => {
	filters = JSON.parse(filters);
	console.log('parse filters', filters);
	let obj = {}; //$and = [], $or = [],
	//filters.sort(dynamicSort('lo'));
	console.log('filterObj', typeof (filters))
	filters.map((data, index) => {
		switch (data.o) {
			case 'is':
				obj[data.k] = data.v;
				break;
			case 'contain':
				obj[data.k] = { [Op.like]: `${data.v}%` };
				break;
			case 'ne':
				obj[data.k] = { [Op.ne]: data.v };
				break;
		}
		if (data.k.indexOf('fk_') === 0) {
			obj[data.k.replace('fk_', '')] = data.v;
			delete obj[data.k];
		}
	});
	console.log('filterObj', obj);
	return obj;
}

module.exports = {
	filters: filters,
	association: association,
};