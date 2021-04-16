import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDtzoPlcXM4UhANiviVm0qn9a_zqm1Zkug",
  authDomain: "confession-demo.firebaseapp.com",
  projectId: "confession-demo",
  storageBucket: "confession-demo.appspot.com",
  messagingSenderId: "288681040725",
  appId: "1:288681040725:web:c53e5200b958c3483faddc",
  measurementId: "G-L7FE2E0ZFN",
};
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
