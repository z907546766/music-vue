// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"
import VueLazyload from "vue-lazyload"
import 'babel-polyfill'
import 'lib-flexible'

import store from './store/index'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import '@/common/less/reset.less'
import '@/common/less/icon.less'

Vue.use(VueLazyload, {
    loading: require('@/common/image/default.png')
})

Vue.prototype.$ajax = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
})