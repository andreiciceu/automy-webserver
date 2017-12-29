import axios from 'axios';
import { apiConfig } from '../config';


export function apiUrl(_endpoint) {
  // const host = window.location.hostname;
  const { host } = apiConfig;
  let endpoint = _endpoint;
  // if ('/' === host[host.length - 1]) {
  //   host = host.substr(0, host.length - 1);
  // }
  // if (host.indexOf(':')) {
  //   host = host.substr(0, host.indexOf(':'));
  // }
  if (endpoint[0] === '/') {
    endpoint = endpoint.substr(1);
  }

  return `${apiConfig.protocol}://${host}:${apiConfig.port}/${endpoint}`;
}

export function get(endpoint, breakCache) {
  let url = apiUrl(endpoint);
  if (breakCache) {
    url += `${endpoint.indexOf('?') > 0 ? '&' : '?'}_r=${Math.random()}`;
  }
  return axios.get(url);
}

export function post(endpoint, data) {
  return axios.post(apiUrl(endpoint), data);
}


const api = { get, post };
export default api;