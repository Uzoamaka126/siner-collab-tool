import { createApp } from 'vue'
import { createStore } from 'vuex'
// import state from './state'
// import actions from './actions'
// import mutations from './mutations'
// import getters from './getters'

// Create a new store instance.
export const store = createStore({
    // state,
    // getters,
    // mutations,
    // actions
})

const app = createApp({ /* your root component */ });
app.config.globalProperties.$store = store

// Install the store instance as a plugin
// app.use(store)