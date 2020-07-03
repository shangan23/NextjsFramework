const models = require("../../models");
const frame = require('../frameJson');
const helper = require('../helper');

const bucket = '/api/';
let runningModel, modelName, limit, page, filter, response, statusCode;

module.exports = function (router) {

    router.get(`${bucket}:module`, (req, res) => {

        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        console.log('req.query.filter', req.query.filter);

        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;
        filter = (req.query.filter && req.query.filter != 'undefined') ? helper.filters(req.query.filter) : '';

        //console.log('runningModel', Object.keys(helper.association(runningModel)));
        console.log('filter', JSON.stringify(filter));

        runningModel.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
            include: Object.keys(helper.association(runningModel)),
            where: filter
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
            include: Object.keys(helper.association(runningModel)),
        })
            .then(runningModel => {
                //console.log(runningModel);
                res.json(runningModel[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(`${bucket}:module`, (req, res) => {
        //console.log('payload -- ', req.body);
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

    /*
    * SubApp routers
    */
    router.get(`${bucket}:module/:moduleId/:subModule`, (req, res) => {

        //Running model will be SubApp
        modelName = (req.params.subModule)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];


        console.log(' subModule req.body', req.body);

        moduleId = (req.params.moduleId);

        //console.log('req.query.filter', req.query.filter);

        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;
        filter = (req.query.filter && req.query.filter != 'undefined') ? helper.filters(req.query.filter) : {};

        (typeof (filter) === undefined) ? { 'moduleId': moduleId } : ''
        Object.assign(filter, { 'moduleId': moduleId });

        console.log('subModule filter', typeof (filter));
        console.log('subModule filter', JSON.stringify(filter));

        runningModel.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
            include: Object.keys(helper.association(runningModel)),
            where: filter
        })
            .then(runningModel => {
                res.json(runningModel);
            })
            .catch(err => {
                res.json(err)
            });
    });

    router.post(`${bucket}:module/:moduleId/:subModule`, (req, res) => {
        console.log('payload -- ', req.body);
        modelName = (req.params.subModule)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];
        Object.assign(req.body, { 'moduleId': req.params.moduleId });
        console.log('req.body', req.body);
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

    router.get(`${bucket}:module/:moduleId/:subModule/:id`, (req, res) => {
        modelName = (req.params.module)
        modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        runningModel = models[modelName];

        runningModel.findAll({
            where: { id: req.params.id },
            include: Object.keys(helper.association(runningModel)),
        })
            .then(runningModel => {
                //console.log(runningModel);
                res.json(runningModel[0]);
            })
            .catch(err => res.json(err));
    });
};