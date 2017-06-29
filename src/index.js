import Vue from 'vue'
import App from './App.vue'

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

function init (ev) {
  document.removeEventListener(ev.type, init)
  app.$mount('#app') // Wait for DOMContentLoaded
  console.log('Hello.')
}

document.addEventListener('DOMContentLoaded', init, false)
