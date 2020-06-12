const Msg = require('../messages').Messages;
const User = require("../../models").Users;

const bucket = '/api/users';

module.exports = function (router) {
    router.get(bucket, (req, res) => {
        User.findAll({
            order: [
                ['id', 'DESC']
            ]
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
        User.create(req.body)
            .then(res => {
                res.json(res);
            })
            .catch(err => res.json(err));
    });

    router.post(`${bucket}/auth`, (req, res) => {
        User.findOne({
            attributes: ['uname', 'role','isAdmin', 'email', 'fullName', 'createdAt', 'updatedAt'],
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

    router.put("/users/:id", (req, res) => {
        User.update({ uname: req.body.uname, password: req.body.password }, { where: { id: req.params.id } })
            .then(users => {
                res.json(users);
            })
            .catch(err => res.json(err));
    });

    router.delete("/users/:id", (req, res) => {
        User.destroy({
            where: { id: req.params.id }
        })
            .then(users => {
                res.json(users);
            })
            .catch(err => res.json(err));
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