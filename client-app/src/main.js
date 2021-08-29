import { createApp } from 'vue/dist/vue.esm-bundler.js';
// import { createApp } from 'vue';
import vSelect from 'vue-next-select';
import App from './App.vue'
import router from './router'
import store from './store'

function customDirectives () {
    return 
}


createApp(App)
    .directive('click-outside', {
        bind: function (el, binding, vNode) {
            // Provided expression must evaluate to a function.
            if (typeof binding.value !== 'function') {
                const compName = vNode.context.name;
                console.log(compName);
                let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
                if (compName) { warn += `Found in component '${compName}'` }

                console.warn(warn)
            }
            // Define Handler and cache it on the element
            const bubble = binding.modifiers.bubble;
            const handler = (e) => {
                if (bubble || (!el.contains(e.target) && el !== e.target)) {
                    binding.value(e)
                }
            };
            el.__vueClickOutside__ = handler;

            // add Event Listeners
            document.addEventListener('click', handler)
        },

        unbind: function (el, binding) {
            // Remove Event Listeners
            document.removeEventListener('click', el.__vueClickOutside__);
            el.__vueClickOutside__ = null

        }
    })
    .use(store)
    .use(router)
    .component('vue-select', vSelect)
    .mount('#app')
