import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

export default jsonServerProvider(`${process.env.REACT_APP_DOMAIN_API}`, httpClient);