// 对于axios的二次封装
import axios from "axios";
import nprogress from "nprogress"
import store from "@/store";
// 引入样式
import "nprogress/nprogress.css"

// 利用axios 对象create 创建一个axios的实例
// request就是axios 只是增加相关的配置
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

// 请求拦截器:在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情.
requests.interceptors.request.use((config) => {
    // 请求头添加一个字段(userTempId):和后台老师商量好了
    if (store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 携带token带给服务器
    if (store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start();
    return config;
})

// 响应的拦截器
requests.interceptors.response.use((response) => {
    nprogress.done();
    // 成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return response.data
}, (error) => {
    //响应失败的回调函数
    console.log(error)
    return Promise.reject(new Error("failed"));
})

export default requests

