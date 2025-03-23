import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;

// Use the correct port (8002) for backend
const isDevelopment = process.env.NODE_ENV === 'development';
let backendUrl = isDevelopment 
  ? "http://localhost:8002/api" 
  : "http://" + window.location.hostname.toString() + ":8002/api";

axios.defaults.baseURL = backendUrl;

// Add request interceptor to prevent caching
axios.interceptors.request.use(function (config) {
  // Add timestamp to GET requests to bypass cache
  if (config.method === 'get') {
    config.params = config.params || {};
    config.params['_t'] = new Date().getTime();
  }
  return config;
});
