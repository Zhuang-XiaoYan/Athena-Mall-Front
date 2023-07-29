// 导入vuex
import Vue from "vue";
import Vuex from 'vuex'
import home from "@/store/home/home";
import search from "@/store/search/search";
import detail from "@/store/detail/detail";
import shopcart from "@/store/shopcart/shopcart";
import user from "@/store/user/user";
import trade from "@/store/Trade/trade";
// 使用插件
Vue.use(Vuex)
// 配置devtools显示vuex组件
Vue.config.devtools = true

// 对外暴露一个veux的实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
});