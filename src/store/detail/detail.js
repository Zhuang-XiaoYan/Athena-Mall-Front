// detail的仓库
import {reqAddOrUpdateShopCart, reqGoodInfo} from "@/api";
import {getUUID} from "@/utils/uuid";

//state:仓库存储数据的地方
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID(),
};

//mutations:修改state的唯一手段
const mutations = {
    GOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};

//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodInfo(skuId)
        if (result.code == 200) {
            commit("GOODINFO", result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId, skuNum}) {
        // 加入购物车返回的结果
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功因为服务器没有返回其余数据,因此咱们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前的这个函数如果执行返回Promise
        if (result.code == 200) {
            return "success";
        }else {
           return Promise.reject(new Error("failed addOrUpdateShopCart"));
        }
    },
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
const getters = {
    // 路径导航简化数据
    categoryView(state) {
        //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        return state.goodInfo.categoryView || {};
    },
    // 简化产品的信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖数据的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}