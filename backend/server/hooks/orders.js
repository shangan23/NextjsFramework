const afterCreate = async (model, options) => {
    try {
        const models = require('../../models');
        let data = await models.OrderedItems.create(model.dataValues)
            .then(runningModel => {
                
            }).catch(err => {
                
            });
        model.dataValues.cost = await (model.dataValues.quantity * data[0].dataValues.cost)
        return model;
    } catch (err) {
        console.log(err);
    }
}

const afterUpdate = async (model, options) => {
    try {
        const models = require('../../models');
        let data = await models.Items.findAll({ where: { id: model.dataValues.itemId } });
        model.dataValues.cost = await (model.dataValues.quantity * data[0].dataValues.cost)
        return model;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { afterCreate, afterUpdate }