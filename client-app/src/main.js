import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuesticPlugin, VaButtonDropdown, VaButton } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css' 
import "bootstrap/dist/css/bootstrap.min.css";
import Draggable from "vuedraggable";
import { PopoverRow, Calendar, DatePicker } from 'v-calendar';
import { Money3Component } from 'v-money3';

window.moment = require('moment');

createApp(App)
  .use(router)
  .use(store)
  .use(VuesticPlugin)
  .component('money', Money3Component)
  .component('va-button', VaButton)
  .component('draggable', Draggable)
  .component('va-button-dropdown', VaButtonDropdown)
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
