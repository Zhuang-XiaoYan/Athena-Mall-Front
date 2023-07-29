// vee-validate插件 表单的验证区域
import Vue from 'vue'
import zh_CN from "vee-validate/dist/locale/zh_CN"
import VeeValidate from "vee-validate";
// 注册插件
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同`
    },
    attributes:{
        phone:"手机号",
        code:"验证码",
        password:"密码",
        password1:"确认密码",
        agree:"协议",
    }
});

// 自定义校验规则
VeeValidate.Validator.extend('agree',{
    validate:value => {
        return value
    },
    getMessage:field => field+"同意协议后才能注册"
})