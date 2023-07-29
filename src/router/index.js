//导入路由的package
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
// 使用插件
Vue.use(VueRouter);

// 编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误?
//
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;

VueRouter.prototype.push=function (location,reslove,reject){
    if (reslove&&reject){
        originPush.call(this,location,reslove,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace=function (location,reslove,reject){
    if (reslove&&reject){
        originReplace.call(this,location,reslove,reject)
    }else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 对外暴露VueRouter类的实例
let router= new VueRouter({
    // 上线设置 否则
    mode: 'hash',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0, y: 0
            }
        }
    }
})

// 全局守卫:前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // 表示全部放行
    // next();
    //用户登录了,才会有token,未登录一定不会有token
    let token = store.state.user.token;
    // 用户信息
    let name= store.state.user.userInfo.name;
    // 用户登录才会有token
    if (token){
        // 用户如果还去login
        if (to.path=='/login'){
            // 直接给他跳转到home 首页
            next("/home")
        }else {
            // 登陆了去的不是login而是其他页面
            if (name){
                // 如果用户已经有了，表示已经登录，那么应该是都可以放行。
                next();
            }else {
                // 如果是没有用户信息，表示没有登录，那么在有的页面就不能登录了
                // 获取用户信息在首页展示
                try {
                    await  store.dispatch("getUserInfo");
                    // 放行访问页面
                    next()
                }catch (error){
                    // 打印错误
                    alert(error.message);
                    // 信息失效了，清楚原来的token
                    await store.dispatch("userLogOut")
                    // 用户需要重新登录
                    next("/login")
                }
            }
        }
    }else {
        // 未登录:不能去交易相关、不能去支付相关pay|paysuccess，不能去个人中心
        let topath=to.path;
        if (topath.indexOf('/trade')!=-1 ||topath.indexOf('/pay')!=-1|| topath.indexOf('/center')!=-1 ){
            // 把未登录的时候向去而没有去成的信息,存储于地址栏中
            next('/login?redirect='+topath);
        }else {
            // 其他的应该放行
            next()
        }
    }
})

export default router;