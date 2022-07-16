import axios from 'axios';
import * as helper from './serviceHelpers';


const getEvtById = (id) => {
	const config = {
		method: 'GET',
		url: `${helper.API_HOST_PREFIX}/api/events/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getEvtByCreatedBy = (pageIndex, pageSize, createdBy) => {
  const config = {
 		method: 'GET',
 		url: `${helper.API_HOST_PREFIX}/api/events/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&createdBy=${createdBy}`,
 		withCredentials: true,
 		crossdomain: true,
 		headers: {'Content-Type':'application/json'},
 	};
 	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
 }


const getAllEvts = (pageIndex, pageSize) => {
	const config = {
		method: 'GET',
		url: `${helper.API_HOST_PREFIX}/api/events/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}


const addNewEvt = (payload) => {
	const config = {
		method: 'POST',
		data: payload,
		url: `${helper.API_HOST_PREFIX}/api/events/`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}


const updateEvt = (id, payload) => {
	const config = {
		method: 'PUT',
		data: payload,
		url: `${helper.API_NODE_HOST_PREFIX}/api/events/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: {'Content-Type':'application/json'},
	};
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}


const deleteEvt = (id) => {
	const config = {
		method: 'PUT',
		data: id,
		url: `${helper.API_NODE_HOST_PREFIX}/api/events/${id}`,
		crossdomain: true,
		header: {"Content-Type":"application/json"}
	}
	return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError)
}


const evtServices = { getAllEvts, getEvtById, getEvtByCreatedBy, addNewEvt, updateEvt, deleteEvt };

export default evtServices;