import { API } from '../../config';
import { check, set } from './middlewares/headers';

const api = (req, res) => {

    const headers = {
        headers: {
            'x-api-key': req.headers['x-api-key']
        }
    }

    if (req.headers['Authorization'])
        headers.headers.Authorization = req.headers['Authorization'];


    fetch(`${API}/siteSettings/1`, headers)
        .then((res) => res.json())
        .then((data) => {
            res.status(200).json(data)
            res.end();
        });
}

export default set(check(api))