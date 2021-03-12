import axios from 'axios';

const AxiosConfig = axios.create({
    baseURL: 'https://react-api-8d9e9-default-rtdb.firebaseio.com',
    timeout: 50000,
})

AxiosConfig.interceptors.request.use(function(config) {
    //ghab az return mitoonid functioni ro ejra konid
    return config;
} , function(err) {
    // handle error
    return Promise.reject(err)
})

AxiosConfig.interceptors.response.use(function(response) {
    //ghab az return mitoonid functioni ro ejra konid
    return response;
},function(err) {
    // System log
    return Promise.reject(err);
})


export default AxiosConfig;