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
                console.log('req.body',req.body);
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
    let tenant, host, user, cleanUser;
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

        //Authorization header
        if (getCookie('user', req)) {
            user = getCookie('user', req);
            cleanUser = unescape(user);
            cleanUser = JSON.parse(cleanUser);
            req.headers['Authorization'] = `Basic ${cleanUser.token}`;
        }

        req.headers['x-api-key'] = tenant;
        return handler(req, res);
    }
}

