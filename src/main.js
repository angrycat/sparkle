// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import {router} from './router/'
import Vuetify from 'vuetify'
import {store} from './store/'
import firebase from 'firebase'
import {config} from './db/firebase/config/'
import {USER_LOGIN, USER_LOGOUT} from './store/actions/user'

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
firebase.initializeApp(config)
let app

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created () {
        if (user) {
          this.$store.dispatch(USER_LOGIN, user)
        } else {
          this.$store.dispatch(USER_LOGOUT)
        }
      }
    })
  }
})
