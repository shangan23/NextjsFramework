const afterCreate = async (model, options) => {
    try {
        const models = require('../../models');
        let bomItems = [];

        await prepareBomObjects(models.SubItems, model.dataValues.itemId)
            .then((firstLevel) => {
                firstLevel.map(async (first, fIdx) => {
                    bomItems.push(first.dataValues);

                    first.dataValues.moduleId = model.dataValues.id;
                    first.dataValues.quantity = first.dataValues.quantity;
                    first.dataValues.createdBy = model.dataValues.updatedBy;
                    first.dataValues.updatedBy = model.dataValues.updatedBy;
                    await models.BomItem.create(first.dataValues);

                    /*await prepareBomObjects(models.SubItems, first.dataValues.itemId)
                        .then((secondLevel) => {
                            secondLevel.map(async (second, sIdx) => {
                                bomItems.push(second.dataValues);

                                second.dataValues.moduleId = model.dataValues.id;
                                second.dataValues.quantity = second.dataValues.quantity;
                                second.dataValues.createdBy = model.dataValues.updatedBy;
                                second.dataValues.updatedBy = model.dataValues.updatedBy;
                                await models.BomItem.create(second.dataValues);

                                await prepareBomObjects(models.SubItems, first.dataValues.itemId)
                                    .then((thirdLevel) => {
                                        thirdLevel.map(async (third, tIdx) => {
                                            bomItems.push(third.dataValues);

                                            third.dataValues.moduleId = model.dataValues.id;
                                            third.dataValues.quantity = third.dataValues.quantity;
                                            third.dataValues.createdBy = model.dataValues.updatedBy;
                                            third.dataValues.updatedBy = model.dataValues.updatedBy;
                                            await models.BomItem.create(third.dataValues);
                                        });
                                    });
                            });
                        });*/
                })
            })
            .then(() => {
                console.log('data-bomItems -- > ', bomItems);
                return model;
            });

    } catch (err) {
        console.log(err);
    }
}

const prepareBomObjects = async (SubItems, itemId) => {
    return SubItems.findAll({
        where: { moduleId: itemId }
    });
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