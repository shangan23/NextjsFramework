const beforeCreate = async (model, options) => {
    try {
        const models = require('../../models');
        let data = await models.Items.findAll({ where: { id: model.dataValues.itemId } });
        model.dataValues.cost = await (model.dataValues.quantity * data[0].dataValues.cost)
        await console.log('model.dataValues.quantity * data[0].dataValues.cost',model.dataValues.quantity * data[0].dataValues.cost);
        return model;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { beforeCreate }