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
                console.log(users);
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
        console.log(req.body)
        User.create({
            uname: req.body.uname,
            password: req.body.password,
            fullName: req.body.fullName,
            email: req.body.email
        })
            .then(res => {
                res.json(res);
            })
            .catch(err => res.json(err));
    });

    router.post(`${bucket}/auth`, (req, res) => {
        User.findOne({
            attributes: ['uname', 'email', 'fullName', 'createdAt', 'updatedAt'],
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
};