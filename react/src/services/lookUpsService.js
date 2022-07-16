import axios from 'axios';
import './serviceHelpers';
import logger from 'sabio-debug';
import { API_HOST_PREFIX, onGlobalSuccess } from './serviceHelpers';

const _logger = logger.extend('look up axios');

const endpoint = `${API_HOST_PREFIX}/api/lookups`;

const getLookUps = (payload) => {
    _logger('lookUp', payload);
    const config = {
        method: 'POST',
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {'Content-Type': 'application/json'}
    };
    return axios(config).then(onGlobalSuccess);

};
export default getLookUps