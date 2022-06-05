import { createApp } from 'vue/dist/vue.esm-bundler.js';
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import Multiselect from '@vueform/multiselect'
import Draggable from "vuedraggable";
import { PopoverRow, Calendar, DatePicker } from 'v-calendar';
import { Money3Component } from 'v-money3';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import Vue3Tour from 'vue3-tour'
import 'vue3-tour/dist/vue3-tour.css';
// import axiosPlugin from './plugins/axios';
// import apiPlugin from './plugins/api';

import { isUserAuthenticated } from './utils/auth';

window.moment = require('moment');
// set a navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isAuthOrHomePage = to.name !== 'login' && to.name !== 'signup' && to.name !== 'reset';
  if (!isUserAuthenticated() && isAuthOrHomePage) next({ name: 'login' })
  else next()
});

createApp(App)
  .use(router)
  .use(store)
  // .use(axiosPlugin)
  // .use(apiPlugin)
  .use(VueChartkick)
  .use(Vue3Tour)
  // .use('v-tour', Vue3Tour)
  .component('multi-select', Multiselect)
  .component('money', Money3Component)
  .component('draggable', Draggable)
  .component('popover-row', PopoverRow)
  .component('v-calendar', Calendar)
  .component('v-date-picker', DatePicker)
  .directive('click-outside', {
    mounted (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) { warn += `Found in component '${compName}'` }

            console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e)
            }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
    },

    unmounted (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
    }
  })
  .mount('#app')
