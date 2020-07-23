const afterCreate = async (model, options) => {
    try {
        const models = require('../../models');
        model.dataValues.onHand = model.dataValues.openingStock
        model.dataValues.onAvailable = 0
        model.dataValues.onOrder = 0
        model.dataValues.itemId = model.dataValues.id
        console.log('model.dataValues', model.dataValues);
        await models.Inventory.create(model.dataValues)
            .then(runningModel => {
                console.log(`Created inventory for item Id : ${model.dataValues.id}`)
            }).catch(err => {

            });
        return model;
    } catch (err) {
        console.log(err);
    }
}

const afterDestroy = async (model, options) => {
    try {
        const models = require('../../models');
        await models.Inventory.destroy({ where: { id: model.dataValues.id } })
            .then(runningModel => {
                console.log(`Deleted inventory for item Id : ${model.dataValues.id}`)
            }).catch(err => {

            });
        return model;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { afterCreate, afterDestroy }