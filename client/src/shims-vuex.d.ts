import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

/* 

Here is an example of adding a property `$router` to every component instance:
```ts
import { createApp } from 'vue'
import { Router, createRouter } from 'vue-router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router
  }
}

// effectively adding the router to every component instance
const app = createApp({})
const router = createRouter()
app.config.globalProperties.$router = router

const vm = app.mount('#app')
// we can access the router from the instance
vm.$router.push('/')
```

*/