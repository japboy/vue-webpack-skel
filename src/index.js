import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import './index.css'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

async function init () {
  try {
    const [ Top, Sub ] = await Promise.all([
      import(/* webpackChunkName: "Top" */ './Top.chunk.vue'),
      import(/* webpackChunkName: "Sub" */ './Sub.chunk.vue')
    ])

    const routes = [
      {
        path: '/',
        component: Top,
        props: () => ({ store })
      },
      {
        path: '/:id',
        component: Top,
        props: (route) => {
          return {
            id: route.params.id,
            store
          }
        }
      }
    ]

    const router = new VueRouter({
      routes
    })

    const app = new Vue({
      name: 'app-root',
      router
    })

    const sub = new Vue({
      name: 'sub-root',
      render (createElement) {
        return createElement(Sub, {
          props: {
            store
          }
        })
      }
    })

    app.$mount('#app')
    sub.$mount('#subapp')
  } catch (error) {
    console.warn(error.message)
  }
}

console.log('Hello.')
init()
