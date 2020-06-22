import { getCookie } from '../../../utils/cookie';
export const check = handler => {
    return (req, res) => {
        if (typeof (req.headers['x-api-key']) === 'undefined' || !req.headers['x-api-key']) {
            res.status(400).json({ error: 'Header x-api-key is missing' });
            res.end();
        }
        switch (req.method) {
            case 'PUT':
            case 'POST':
                console.log('req.body', req.body);
                req.body = helper(req.body);
                break;
        }

        return handler(req, res);
    }
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
            console.log('cleanUser', cleanUser)
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
           // console.log('req.headers[Authorization]', req.headers);
        }

        req.headers['x-api-key'] = tenant;
        return handler(req, res);
    }
}