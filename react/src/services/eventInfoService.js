import axios from 'axios';
import * as helper from './serviceHelpers';


const evtInfoEndpoint = `${helper.API_HOST_PREFIX}/api/eventsinfo`;

const getAll = () => {
	const config = {
		method: 'GET',
		url: `${evtInfoEndpoint}/`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getById = (id) => {
	const config = {
		method: 'GET',
		url: `${evtInfoEndpoint}/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const paginate = (pageIndex, pageSize) => {
	const config = {
		method: 'GET',
		url: `${evtInfoEndpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const search = (pageIndex, pageSize, query) => {
	const config = {
		method: 'GET',
		url: `${evtInfoEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
		withCredentials: true,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
	};



const evtInfoServices = { getAll, getById, paginate, search};

export default evtInfoServices;