import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueResource from "vue-resource"
import VueCookies from 'vue-cookies'
import SocialSharing  from "vue-social-sharing"

/*
 * START vee validate
 */
// import VeeValidate, { Validator } from 'vee-validate'

// Validator.localize({ vi: vi })
// Vue.use(VeeValidate, config_v)
/* ----END vee validate--- */

// import AsyncComputed from 'vue-async-computed'

import App from './App.vue'
import store from "./store"
import routes from './router/index'
// import { store } from './_stores'
import moment from 'moment'
// import i18n from './lang/i18n'
import VueAudio from 'vue-audio-better'

Vue.use(VueAudio)
Vue.prototype.moment = moment
// let { URL } = require("./config");
// let URL_API = URL.API_ROOT;
Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(SocialSharing);
Vue.use(Vuex);
// Vue.use(AsyncComputed);


// set cookie sidebar
// VueCookies.config('7d')
// VueCookies.set('toggleSidebar',true);

//URL api root
// Vue.http.options.root = URL_API;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faUserLock, faUser, faUserCog, faBars, faUsers, faUserCheck, faHistory, faListUl, faFileSignature, faPhoneVolume, faArchive, faExchangeAlt, faArrowAltCircleRight, faInfoCircle, faLock, faCog, faCaretUp, faChevronRight, faChevronLeft, faSearch, faSortDown, faCaretRight, faUserPlus, faEdit, faUndo, faHeadphones, faDownload, faClock, faBlenderPhone, faTrashAlt, faExclamationTriangle, faNotesMedical, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from './i18n'


library.add(faUserSecret, faUserLock, faUser, faUserCog, faBars, faUsers, faUserCheck, faHistory, faListUl, faFileSignature, faPhoneVolume, faArchive, faExchangeAlt, faArrowAltCircleRight, faInfoCircle, faLock, faCog, faCaretUp, faChevronRight, faChevronLeft, faSearch, faSortDown, faCaretRight, faUserPlus, faEdit, faUndo, faHeadphones, faDownload, faClock, faBlenderPhone, faTrashAlt, faExclamationTriangle, faNotesMedical, faBell)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// import './custom.css'

export const eventBus = new Vue();

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})
new Vue({
    router,
    store,
    i18n,

    // i18n,
    render: h => h(App)
}).$mount('#app')