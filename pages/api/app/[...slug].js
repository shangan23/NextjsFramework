import { API } from '../../../config';
import { check, set } from '../middlewares/headers';

const get = (req, res) => {

    const headers = {
        'x-api-key': req.headers['x-api-key'],
        'Content-Type': 'application/json',
    }

    if (req.headers['Authorization'])
        headers.Authorization = req.headers['Authorization'];

    const {
        query,
    } = req

    switch (req.method) {
        case 'GET':
            fetch(`${API}/${query.slug.join('/')}`, { headers: headers })
                .then((res) => res.json())
                .then((data) => {
                    //res.status(200).json(helper(data))
                    res.status(200).json(data)
                    res.end();
                });
            break;
        case 'PUT':
            fetch(`${API}/${query.slug.join('/')}`, { method: req.method, headers: headers, body: JSON.stringify(req.body) })
                .then((res) => res.json())
                .then((data) => {
                    res.status(200).json(data)
                    res.end();
                });
            break;
        case 'DELETE':
            fetch(`${API}/${query.slug.join('/')}`, { method: req.method, headers: headers })
                .then((res) => res.json())
                .then((data) => {
                    res.status(200).json(data)
                    res.end();
                });
            break;
    }

}

export default set(check(get));