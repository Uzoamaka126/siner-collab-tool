import { createApp } from 'vue/dist/vue.esm-bundler.js'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuesticPlugin, VaButtonDropdown, VaButton } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css' 
import jquery from 'jquery'
import "bootstrap/dist/css/bootstrap.min.css"

// window.$ = window.jQuery = require('jquery');

createApp(App)
  .use(router)
  .use(store)
//   .use(jquery)
  .use(VuesticPlugin)
  .component('va-button', VaButton)
  .component('va-button-dropdown', VaButtonDropdown)
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
