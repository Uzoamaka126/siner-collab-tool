// import Vue from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

// import components
import Signup from '../components/auth/signup/Signup.vue'

export const router = createRouter({
    routes: [
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: Login
        // },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        }
    ],
    history: createWebHashHistory(),
    linkActiveClass: 'active'
});

// const app = createApp({ /* your root component */ });
// Vue.use(router)
