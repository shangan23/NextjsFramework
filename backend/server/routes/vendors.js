const Vendors = require("../../models").Vendors;
const frame = require('../frameJson');

const bucket = '/api/vendors';

module.exports = function (router) {
    router.get(bucket, (req, res) => {
        let limit, page;
        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;

        Vendors.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(Vendors => {
                res.json(Vendors);
            })
            .catch(err => res.json(err));
    });

    router.get(`${bucket}/:id`, (req, res) => {
        Vendors.findAll({
            where: { id: req.params.id },
            include: ['fk_createdBy', 'fk_updatedBy']
        })
            .then(Vendors => {
                res.json(Vendors[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(bucket, (req, res) => {
        console.log('req.body',req.body);
        let response, statusCode;
        Vendors.create(req.body)
            .then(Vendors => {
                response = frame(Vendors, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Vendors;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.put(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        Vendors.update(req.body, { where: { id: req.params.id } })
            .then(Vendors => {
                response = frame(Vendors, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Vendors;
                res.status(statusCode).json(response); 
            }).catch(err => {
                response = frame(err, req.method);
              res.status(response.httpCode).json(response);
            });
    });

    router.delete(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        Vendors.destroy({ where: { id: req.params.id } })
            .then(Vendors => {
                response = frame(Vendors, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = Vendors;
                res.status(statusCode).json(response);
            })
            .catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });
};