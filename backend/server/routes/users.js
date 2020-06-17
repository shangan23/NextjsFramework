const Msg = require('../messages').Messages;
const User = require("../../models").Users;
const frame = require('../frameJson');

const bucket = '/api/users';

module.exports = function (router) {
    router.get(bucket, (req, res) => {
        let limit, page;
        limit = (req.query.limit && req.query.limit != 'undefined') ? parseInt(req.query.limit) : 10;
        page = (req.query.page && req.query.page != 'undefined') ? parseInt(req.query.page) : 0;
        User.findAndCountAll({
            offset: (page * limit),
            limit: limit,
            subQuery: false,
            order: [
                ['id', 'DESC']
            ],
        })
            .then(users => {
                res.json(users);
            })
            .catch(err => res.json(err));
    });

    router.get(`${bucket}/:id`, (req, res) => {
        User.findAll({
            where: { id: req.params.id }
        })
            .then(users => {
                res.json(users[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(bucket, (req, res) => {
        let response, statusCode;
        User.create(req.body)
            .then(users => {
                response = frame(users, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = users;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.post(`${bucket}/auth`, (req, res) => {
        User.findOne({
            attributes: ['uname', 'role', 'isAdmin', 'email', 'fullName', 'createdAt', 'updatedAt'],
            where: { uname: req.body.uname, password: req.body.password }
        }).then(users => {
            if (users != null) {
                let results = {}
                results.token = new Buffer(req.body.uname + ":" + req.body.password).toString("base64");
                results.details = users;
                res.json(results);
            } else {
                res.status(401).json({ error: Msg.authError });
            }
        }).catch(err => res.json(err));
    });

    router.put(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        User.update(req.body, { where: { id: req.params.id } })
            .then(users => {
                response = frame(users, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = users;
                res.status(statusCode).json(response);
            }).catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.delete(`${bucket}/:id`, (req, res) => {
        let response, statusCode;
        User.destroy({ where: { id: req.params.id } })
            .then(users => {
                response = frame(users, req.method);
                statusCode = response.httpCode;
                delete response.httpCode;
                response.details = users;
                res.status(statusCode).json(response);
            })
            .catch(err => {
                response = frame(err, req.method);
                res.status(response.httpCode).json(response);
            });
    });

    router.post(`${bucket}/upload`, (req, res) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
                let avatar = req.files.avatar;

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                avatar.mv('./server/uploads/' + avatar.name);

                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: avatar.name,
                        mimetype: avatar.mimetype,
                        size: avatar.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
};