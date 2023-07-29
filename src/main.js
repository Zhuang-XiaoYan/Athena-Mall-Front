import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import CarouselPage from "@/components/Carousel/CarouselPage.vue";
import PaginationPage from "@/components/Pagination/PaginationPage.vue";
// 引入mock 服务
import '@/mock/mockService'
// 引入swiper的样式文件
import 'swiper/css/swiper.css'
// 引入element-ui的问题
import {Button,MessageBox} from "element-ui";
// 引入插件服务
import "@/plugins/validate"
import "@/plugins/vuelazyload"
// 全局组件注册
Vue.component(TypeNav.name,TypeNav)
Vue.component(CarouselPage.name,CarouselPage)
Vue.component(PaginationPage.name,PaginationPage)
Vue.component(Button.name,Button)
//ElementUI注册组件的时候,还有一种写法，挂在原型上
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
Vue.config.productionTip = false
// 统一接口api文件夹里面的全部请求函数
import * as API from "@/api"

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  router,
  store,
}).$mount('#app')
