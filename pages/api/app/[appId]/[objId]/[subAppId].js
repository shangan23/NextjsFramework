import { API, RecordsPerPage } from '../../../../../config';
import { check, set } from '../../../middlewares/headers';

const get = (req, res) => {

    const headers = {
        'x-api-key': req.headers['x-api-key'],
        'Content-Type':'application/json'
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
            parameters += (query.filter) ? `&filter=${query.filter}` : '';
            parameters = (parameters == '?') ? `?limit=${RecordsPerPage}` : parameters;
            fetch(`${API}/${query.appId}/${query.objId}/${query.subAppId}${parameters}`, { headers })
                .then((res) => res.json())
                .then((data) => {
                    res.status(200).json(data)
                    res.end();
                }).catch(error => {
                    console.log(error);
                });
            break;
        case 'POST':
            console.log('payload --', JSON.stringify(req.body));
            console.log('req.method --', req.method);
            console.log('req.headers --', headers);
            console.log('req.url --', `${API}/${query.appId}/${query.objId}/${query.subAppId}`);
            fetch(`${API}/${query.appId}/${query.objId}/${query.subAppId}`, { method: req.method, headers: headers, body: JSON.stringify(req.body)})
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