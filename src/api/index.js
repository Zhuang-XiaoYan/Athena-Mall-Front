// 当前模块使用是对API进行的统一管理的
import requests from "@/api/ajax";
import mockRequests from "@/api/mockAjax";

// 三级联动
// http://sph-h5-api.atguigu.cn/api/product/getBaseCategoryList

export const reqCategoryList = () => {
    return requests(
        {
            url: "/product/getBaseCategoryList",
            method: "GET"
        }
    );
}
// 这也是一种数据访问的方式 获取页面的详情数据 携带参数的get请求
// export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:"GET"})
export const reqGoodInfo = (skuId) => {
    return requests(
        {
            url: `/item/${skuId}`,
            method: "GET"
        }
    );
}

//获取购物车列表的数据
export const reqCartList = () => {
    return requests(
        {
            url: `/cart/cartList`,
            method: "GET"
        }
    );
}

//删除购物的产品的接口
export const reqDeleteCartById = (skuId) => {
    return requests(
        {
            url: `/cart/deleteCart/${skuId}`,
            method: "DELETE"
        }
    );
}

// 用户注册接口
export const reqUserRegister = (params) => {
    return requests(
        {
            url: "/user/passport/register",
            method: "POST",
            data: params,
        }
    );
}
// 用户登录接口
export const reqUserLogin = (params) => {
    return requests(
        {
            url: "/user/passport/login",
            method: "POST",
            data: params,
        }
    );
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => {
    return requests(
        {
            url: "/user/passport/auth/getUserInfo",
            method: "GET",
        }
    );
}

// 退出登录
export const reqLogOut = () => {
    return requests(
        {
            url: "/user/passport/logout",
            method: "GET",
        }
    );
}

// 获取用户的地址信息
export const reqAddressInfo = () => {
    return requests(
        {
            url: "/user/userAddress/auth/findUserAddressList",
            method: "GET",
        }
    );
}

// 获取用户的交易信息
export const reqOrderInfo = () => {
    return requests(
        {
            url: "/order/auth/trade",
            method: "GET",
        }
    );
}

export const reqGetCode = (phone) => {
    return requests(
        {
            url: `/user/passport/sendCode/${phone}`,
            method: "GET"
        }
    );
}

// 提交订单接口
export const reqSubmitOrder = (tradeNo,params) => {
    return requests(
        {
            url: `/order/auth/submit0rder?tradeNo=${tradeNo}`,
            method: "POST",
            data: params,
        }
    );
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests(
        {
            url: `/payment/weixin/createNative/${orderId}`,
            method: "GET",
        }
    );
}

// 查询支付状态的结果
export const reqPayStatus = (orderId) => {
    return requests(
        {
            url: `/payment/weixin/queryPayStatus/${orderId}`,
            method: "GET",
        }
    );
}
// 获取个人中心数据
export const reqMyOrderList = (page,limit) => {
    return requests(
        {
            url: `order/auth/${page}/${limit}`,
            method: "GET",
        }
    );
}

//删除商品的选中状态
export const reqUpdateCheckedById= (skuId,isChecked) => {
    return requests(
        {
            url: `/cart/checkCart/${skuId}/${isChecked}`,
            method: "GET"
        }
    );
}

// 将产品添加到购物车中（获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests(
        {
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: "POST",
        }
    );
}

// 获取搜索页面数据(Search首页轮播图的接口) 携带参数的post表单数据请求。
export const reqSearchList = (params) => requests({
    url: "/list",
    method: "POST",
    data: params,
})

// 获取banner(Home首页轮播图的接口)
export const reqBannerList = () => mockRequests.get('/banner')
// 获取floor(floor接口)
export const reqFloorList = () => mockRequests.get('/floor')



