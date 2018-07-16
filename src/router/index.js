import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "@/components/recommend/recommend"
import Rank from "@/components/rank/rank"
import Search from "@/components/search/search"
import Singer from "@/components/singer/singer"
import SingerDetail from "@/components/singer-detail/singer-detail"
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
        path: "/",
        redirect: "/recommend" //进入根页面跳转到第一个router-view解决第一个激活
    }, {
        path: "/recommend",
        component: Recommend
    }, {
        path: "/rank",
        component: Rank
    }, {
        path: "/search",
        component: Search
    }, {
        path: "/singer",
        component: Singer,
        children: [{
            path: ":id",
            component: SingerDetail
        }]
    }]
})