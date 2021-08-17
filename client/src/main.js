import App from './App.vue'
import { router } from './router/index';
// import { store } from './store/index';
import axios from 'axios'
import moment from 'moment';

window.moment = moment;

const API_BASE_URL = process.env.API_BASE_URL;
const AUTH_TOKEN_KEY = 'auth_token';

//axios global defaults
const token = localStorage.getItem(AUTH_TOKEN_KEY);
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common = {
    "x-access-token" : token,
};
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

// Add a response interceptor || random change
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     if(response.data && response.data.status == 'error' && response.data.data && response.data.data.data ){
//         if(response.data.data.data.name == 'TokenExpiredError'){
//             window.location = '/logout'
//         }
//         else if(response.data.data.data.name == 'JsonWebTokenError'){
//             window.location.reload();
//         }

//     }else{
//         return response;
//     }
// }, function (error) {
//     // Do something with response error
//     if(error.response.data.error == true){
//         if (error.response.data.data){
//             //scenarios
//             if(error.response.data.data.data  &&  error.response.data.data.data.name){
//                 if(error.response.data.data.data.name == 'TokenExpiredError'){
//                     window.location = '/logout'
//                 }
//                 else if(error.response.data.data.data.name == 'JsonWebTokenError'){
//                     window.location.reload();
//                 }
//             }
//         }
//         else{
//             return Promise.reject(error);
//         }
//     }
//     else{
//         return Promise.reject(error);
//     }
// });
// createApp(Tabs)

// createApp(App).mount('#app')
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
