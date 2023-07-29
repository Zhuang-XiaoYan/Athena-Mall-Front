import Vue from 'vue'
import VueLazyload from "vue-lazyload";
import defaultimage from "@/assets/logo.png"

// 注册插件
Vue.use(VueLazyload,{
    // 懒加载默认的图片
    loading:defaultimage,
})