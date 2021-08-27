import { createApp } from 'vue/dist/vue.esm-bundler.js';
import vSelect from 'vue-next-select';
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
    .use(store)
    .use(router)
    .component('vue-select', vSelect)
    .mount('#app')
