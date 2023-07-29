// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件,这样就更加高效了。
// 所有的路由均采用懒加载的方式： component: ()=>import("@/pages/Center/CenterPage.vue"),
export default [
    {
        name: "center",
        path: "/center",
        // 设置路由懒加载
        component: ()=>import("@/pages/Center/CenterPage.vue"),
        meta: {show: true},
        // 二级路由
        children: [
            {
                path: "myorder",
                component: ()=>import("@/pages/Center/MyOrder/MyOrder.vue"),
            },
            {
                path: "grouporder",
                component: ()=>import("@/pages/Center/GroupOrder/GroupOrder.vue"),
            },
            {
                path: "/center",
                redirect:"/center/myorder",
            },
        ],
    },
    {
        name: "paysuccess",
        path: "/paysuccess",
        component: ()=>import("@/pages/PaySuccess/index.vue"),
        meta: {show: true},
    },
    {
        name: "pay",
        path: "/pay",
        component: ()=>import("@/pages/Pay/PayPage.vue"),
        meta: {show: true},
        // 设置路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须是从购物车而来
            if (from.path=="/trade"){
                next();
            }else {
                // 其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        name: "trade",
        path: "/trade",
        component: ()=>import("@/pages/Trade/TradePage.vue"),
        meta: {show: true},
        // 设置路由独享守卫
        beforeEnter:(to,from,next)=>{
            // 去交易页面,必须是从购物车而来
            if (from.path=="/shopcart"){
                next();
            }else {
                // 其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        name: "shopcart",
        path: "/shopcart",
        component: ()=>import("@/pages/ShopCart/ShopCart.vue"),
        meta: {show: true},
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: ()=>import("@/pages/AddCartSuccess/AddCartSuccess.vue"),
        meta: {show: true},
    },
    {
        name: "detail",
        path: "/detail/:skuid",
        component: ()=>import("@/pages/Detail/DetailPage.vue"),
        meta: {show: true},
    },
    {
        name: "home",
        path: "/home",
        component: ()=>import("@/pages/Home/HomaPage.vue"),
        meta: {show: true},
    },
    {
        name: "search",
        path: "/search",
        component: ()=>import("@/pages/Search/SearchPage.vue"),
        meta: {show: true},
    },
    {
        name: "login",
        path: "/login",
        component: ()=>import("@/pages/Login/LoginPage.vue"),
    },
    {
        name: "register",
        path: "/register",
        component: ()=>import("@/pages/Register/RegisterPage.vue"),
    },
    // 重定向，在项目启动的时候定向到home下面
    {
        path: "/",
        redirect: "/home",
    },
]