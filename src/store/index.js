import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import music from './module/music'

export default new Vuex.Store({
    modules: {
        music
    }
})