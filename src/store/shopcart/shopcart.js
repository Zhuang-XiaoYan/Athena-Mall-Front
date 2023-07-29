// shopcart的仓库
import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

//state:仓库存储数据的地方
const state = {
    cartList:[],
};

//mutations:修改state的唯一手段
const mutations = {
    CARTLIST(state,cartList){
        state.cartList=cartList;
    },
};

//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取购物车列表的数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("CARTLIST", result.data)
        }
    },
    // 删除购物车的某一个产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("failed deleteCartListBySkuId"));
        }
    },
    // 修改购物车的一个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("failed updateCheckedById"));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromisAll=[];
        //context :小仓库，comit【提交mutations修改state】 getters【计算属性】·dispatch【派发action】 state【当前仓库数据】
        getters.cartList.cartInfoList.forEach(item=>{
            if (item.isChecked==1){
                let promise=dispatch("deleteCartListBySkuId",item.skuId)
                //将每一次返回的Promise添加到数组当中
                PromisAll.push(promise)
            }
        })
        // 只要全部的p1|p2....都成功,返回结果即为成功如果有一个失败,返回即为失败结果
        return Promise.all(PromisAll);
    },
    // 修改全部产品的状态
    updateAllCartChecked({dispatch,state},isChecked){
        let PromisAll=[];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise=dispatch("updateCheckedById",{skuId:item.skuId,isChecked:isChecked});
            //将每一次返回的Promise添加到数组当中
            PromisAll.push(promise)
        })
        // 只要全部的p1|p2....都成功,返回结果即为成功如果有一个失败,返回即为失败结果
        return Promise.all(PromisAll);
    }
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据方便
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}