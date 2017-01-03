import Vue from 'vue'
import App from './App.vue'

function init (ev) {
  document.removeEventListener(ev.type, init)

  new Vue({
    el: '#app',
    render: h => h(App)
  })

  console.log('Hello.')
}

document.addEventListener('DOMContentLoaded', init, false)
