// user的仓库
import {reqGetCode, reqLogOut, reqUserInfo, reqUserLogin, reqUserRegister} from "@/api";
import {deleteToken, getToken, saveToken} from "@/utils/token";
//state:仓库存储数据的地方
const state = {
    // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化的】
    code: '',
    token: getToken(),
    userInfo: {},
};

//mutations:修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    LOGOUT(state){
        // 帮仓库中先关用户信息清空和本地token数据
        state.token="";
        state.userInfo={};
        deleteToken()
    }
};

//action:处理action,面以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCode({commit}, phone) {
        // 向服务器发送的APi请求
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return "success";
        } else {
            return Promise.reject(new Error("用户获取验证码失败"));
        }
    },
    // 用户注册
    async UserRegister({commit}, user) {
        // 向服务器发送的APi请求
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return "success";
        } else {
            return Promise.reject(new Error("用户注册失败"));
        }
    },
    // 用户登录业务
    async reqUserLogin({commit}, data) {
        // 向服务器发送的APi请求
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            // 持久化存储token
            saveToken(result.data.token)
            return "success";
        } else {
            return Promise.reject(new Error("用户登陆失败"));
        }
    },
    // 获取用户信息 业务逻辑有问题。
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("USERINFO", result.data)
            return "success";
        }else {
            return Promise.reject(new Error("获取用户信息失败"));
        }
    },
    async userLogOut({commit}){
        let result = await reqLogOut();
        if (result.code == 200) {
            commit("LOGOUT")
            return "success";
        } else {
            return Promise.reject(new Error("用户退出系统失败"));
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