const models = require("../../models");
const frame = require('../frameJson');

const bucket = '/api/';
let runningModel, modelName, limit, page,response, statusCode;

module.exports = function (router) {
    router.get(`${bucket}:module`, (req, res) => {

        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;

        runningModel.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(runningModel => {
                res.json(runningModel);
            })
            .catch(err => {
                res.json(err)
            });
    });

    router.get(`${bucket}:module/:id`, (req, res) => {
        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        runningModel.findAll({
            where: { id: req.params.id },
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(runningModel => {
                console.log(runningModel);
                res.json(runningModel[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(`${bucket}:module`, (req, res) => {
        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        runningModel.create(req.body)
            .then(runningModel => {
                response = frame(runningModel, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = runningModel;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.put(`${bucket}:module/:id`, (req, res) => {
        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        runningModel.update(req.body, { where: { id: req.params.id } })
            .then(runningModel => {
                response = frame(runningModel, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = runningModel;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.delete(`${bucket}:module/:id`, (req, res) => {
        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];
      
        runningModel.destroy({ where: { id: req.params.id } })
            .then(runningModel => {
                response = frame(runningModel, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = runningModel;
                res.status(statusCode).json(response);
            })
            .catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });
};