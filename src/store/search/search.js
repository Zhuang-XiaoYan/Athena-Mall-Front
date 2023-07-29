// search的仓库
import {reqSearchList} from "@/api"

//state:仓库存储数据的地方
const state = {
    searchList: {},
};
//mutations:修改state的唯一手段
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({commit}, params = {}) {
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
        //params形参:是当用户派发action的时候，第二个参数传递过球的，至少是一个空对象
        let result = await reqSearchList(params)
        if (result.code == 200) {
            commit("SEARCHLIST", result.data)
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了1|
const getters = {
    // 当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state) {
        return state.searchList.goodsList;
    },
    attrsList() {
        return state.searchList.attrsList;
    },
    trademarkList() {
        return state.searchList.trademarkList;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}