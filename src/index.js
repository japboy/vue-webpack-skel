import Vue from 'vue'

import './index.css'

const appLoaded = import(/* webpackChunkName: "App" */ './App.chunk.vue')

const documentLoaded = new Promise((resolve) => {
  const loaded = (event) => {
    event.target.removeEventListener(event.type, loaded)
    resolve(event.target)
  }
  document.addEventListener('DOMContentLoaded', loaded, false)
})

async function init () {
  try {
    const initiated = await Promise.all([appLoaded, documentLoaded])
    const App = initiated[0]

    const app = new Vue({
      data: {
        parentName: 'Donald'
      },
      // el: '#app', // Possible if DOMContentLoaded already
      render (createElement) {
        return createElement(App, {
          props: app.$data
        })
      }
    })

    app.$mount('#app') // In case to assign entry DOM later
  } catch (error) {
    console.warn(error.message)
  }
}

console.log('Hello.')
init()
