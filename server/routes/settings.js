const Msg = require('../messages').Messages;
const SiteSettings = require("../../models").SiteSettings;

const bucket = '/api/siteSettings';

module.exports = function (router) {
    router.get(`${bucket}/:id`, (req, res) => {
        SiteSettings.findAll({
            where: { id: req.params.id }
        })
            .then(siteSettings => {
                res.json(siteSettings[0]);
            })
            .catch(err => res.json(err));
    });

    router.post(`${bucket}`, (req, res) => {
        SiteSettings.create(req.body)
            .then(res => {
                res.json(res);
            })
            .catch(err => res.json(err));
    });

    router.put(`${bucket}/:id`, (req, res) => {
        SiteSettings.update(req.body, { where: { id: req.params.id } })
            .then(siteSettings => {
                res.json(siteSettings);
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
                let logo = req.files.logo;
                logo.mv('./server/uploads/site/logo.png');
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: 'logo.png',
                        mimetype: logo.mimetype,
                        size: logo.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
};