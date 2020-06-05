const User = require("../../models").Users;

module.exports = function (router) {
    router.get("/users", (req, res) => {
        User.findAll()
            .then(users => {
                res.json(users);
            })
            .catch(err => res.json(err));
    });

    router.get("/users/:id", (req, res) => {
        User.findAll({
            where: { id: req.params.id }
        })
            .then(users => {
                res.json(users[0]);
            })
            .catch(err => res.json(err));
    });

    router.post("/users", (req, res) => {
        User.create({
            uname: req.body.uname,
            password: req.body.password
        })
            .then(res => {
                res.json(res);
            })
            .catch(err => res.json(err));
    });

    router.post("/user/auth", (req, res) => {
        User.findAll({
            where: { uname: req.body.id, password:req.body.password }
        })
            .then(users => {
                res.json(users);
            })
            .catch(err => res.json(err));
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