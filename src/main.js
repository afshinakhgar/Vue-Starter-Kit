// main.js
var Vue = require('vue');
// var App = require('./src/components/app.vue')

import App from './components/app.vue';

new Vue({
  el: 'body',
  components: {
    app: App
  }
});