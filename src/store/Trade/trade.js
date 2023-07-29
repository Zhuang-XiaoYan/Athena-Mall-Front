// trade的仓库
import {reqAddressInfo,reqOrderInfo} from "@/api";

//state:仓库存储数据的地方
const state = {
    addressinfo: [],
    orderinfo: {},
};

//mutations:修改state的唯一手段
const mutations = {
    ADDRESSINFO(state, addressinfo) {
        state.addressinfo = addressinfo;
    },
    ORDERINFO(state, orderinfo) {
        state.orderinfo = orderinfo;
    }
};

//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getUserAddressInfo({commit}) {
        // 向服务器发送的APi请求
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("ADDRESSINFO", result.data)
            return "success";
        } else {
            return Promise.reject(new Error("获取用户收货地址失败"));
        }
    },
    // 获取用户订单数据
    async getOrderInfo({commit}) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit("ORDERINFO", result.data)
            return "success";
        }else {
            return Promise.reject(new Error("获取用户订单数据失败"));
        }
    }
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}