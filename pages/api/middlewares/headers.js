import { getCookie } from '../../../utils/cookie';
import moduleController from '../../../modules/controller';

export const check = handler => {
    return (req, res) => {
        if (typeof (req.headers['x-api-key']) === 'undefined' || !req.headers['x-api-key']) {
            res.status(400).json({ error: 'Header x-api-key is missing' });
            res.end();
        }
        switch (req.method) {
            case 'PUT':
            case 'POST':
                console.log('req.body<', req.body);
                req.body = helper(req.body);
                //req.body = hasDynamicSet(req.query, req.body);
                console.log('req.body>', req.body);
                break;
        }

        return handler(req, res);
    }
}

export const hasDynamicSet = (query, data) => {
    let fieldsToRender, dynamicSetId, dynamicSetLookupId;
    fieldsToRender = moduleController(query.appId, {});

    dynamicSetId = fieldsToRender.filter(fld => {
        if (fld.type == "DynamicSet") {
            return fld;
        }
    });

    if (dynamicSetId[0].id) {
        dynamicSetLookupId = JSON.parse(JSON.stringify(dynamicSetId[0].fields));
        dynamicSetLookupId = dynamicSetLookupId.map((dt, idx) => {
            return dt.filter(flds => {
                if (flds.type == 'Lookup') {
                    return flds.id;
                }
            })[0];
        });

        dynamicSetId = dynamicSetId[0].id

        if (dynamicSetLookupId[0].id) {
            dynamicSetLookupId = dynamicSetLookupId[0].id;
            data[dynamicSetId].filter((fldVal) => {
                return fldVal[dynamicSetLookupId] = fldVal[dynamicSetLookupId].id;
            });
        }
    }
    return data;
}

export const helper = (data) => {
    Object.keys(data).filter(function (key) {
        if (key.indexOf("fk_") === 0) {
            let actualKey = key.replace('fk_', '');
            data[actualKey] = data[key].id;
            delete data[key];
        }
    });
    return data;
}

export const set = handler => {
    let tenant, host, user, cleanUser, x, txt;
    return (req, res) => {

        //Tenant header
        host = req.headers.host;
        if (host.indexOf(':')) {
            host = host.split(':');
            host = host[0];
        }
        switch (host) {
            case 'localhost':
                tenant = 'demo';
                break;
        }

        //Authorization header from Cookie
        if (getCookie('user', req)) {
            user = getCookie('user', req);
            cleanUser = unescape(user);
            cleanUser = JSON.parse(cleanUser);
            req.headers['Authorization'] = `Basic ${cleanUser.token}`;
        }

        //'user-agent': 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
        if (req.headers['user-agent'] === 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)') {
            if (req.headers.authorization) {
                req.headers['Authorization'] = req.headers['authorization'];
                delete req.headers['authorization'];
            }

            if (req.headers['content-type']) {
                req.headers['Content-Type'] = req.headers['content-type'];
                delete req.headers['content-type'];
            }
        }

        req.headers['x-api-key'] = tenant;
        return handler(req, res);
    }
}