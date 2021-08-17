import App from './App.vue'
import { createApp } from 'vue'
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

createApp(App)
    .use(router)
    .mount('#app')

// const app = Vue.createApp(App)
// const vm = app.mount('#app')
/* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
// });
