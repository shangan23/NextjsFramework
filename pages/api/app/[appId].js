import { API, RecordsPerPage } from '../../../config';
import { check, set } from '../middlewares/headers';

const get = (req, res) => {

    const headers = {
        'x-api-key': req.headers['x-api-key']
    }

    if (req.headers['Authorization'])
        headers.Authorization = req.headers['Authorization'];

    const {
        query,
    } = req

    switch (req.method) {
        case 'GET':
            let parameters = `?`
            parameters += (query.limit) ? `limit=${query.limit}` : '';
            parameters += (query.page) ? `&page=${query.page}` : '';
            parameters = (parameters == '?') ? `?limit=${RecordsPerPage}` : parameters;
            fetch(`${API}/${query.appId}${parameters}`, { headers })
                .then((res) => res.json())
                .then((data) => {
                    res.status(200).json(data)
                    res.end();
                }).catch(error => {
                    console.log(error);
                });
            break;
        case 'POST':
            fetch(`${API}/${query.appId}`, { method: req.method, headers: headers, body: JSON.stringify(req.body) })
                .then((res) => res.json())
                .then((data) => {
                    res.status(200).json(data)
                    res.end();
                }).catch(error => {
                    console.log(error);
                });
            break;
    }
}

export default set(check(get))