const Customers = require("../../models").Customers;
const frame = require('../frameJson');

const bucket = '/api/customers';

module.exports = function (router) {
    router.get(bucket, (req, res) => {
        let limit, page;
        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;

        Customers.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(Customers => {
                res.json(Customers);
            })
            .catch(err => res.json(err));
    });

    router.get(`${bucket}/:id`, (req, res) => {
        Customers.findAll({
            where: { id: req.params.id },
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(Customers => {
                res.json(Customers[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(bucket, (req, res) => {
        console.log('req.body',req.body);
        let response, statusCode;
        Customers.create(req.body)
            .then(Customers => {
                response = frame(Customers, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Customers;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.put(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        Customers.update(req.body, { where: { id: req.params.id } })
            .then(Customers => {
                response = frame(Customers, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Customers;
                res.status(statusCode).json(response); 
            }).catch(err => {
                response = frame(err, req.method);
              res.status(response.httpCode).json(response);
            });
    });

    router.delete(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        Customers.destroy({ where: { id: req.params.id } })
            .then(Customers => {
                response = frame(Customers, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Customers;
                res.status(statusCode).json(response);
            })
            .catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });
};