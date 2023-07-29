// 引入mockjs 模块
import Mock from 'mockjs'
// 把SON数据格式引入进来 json 数据格式没有对外暴露 但是可以导入
// webpack默认对外暴露的:图片、JSON数据格式
import banner from "@/mock/banner.json"
import floor from "@/mock/floor.json"

//mock数据:第一个参数请求地址第二个参数:请求数据
// Mock.mock( " /mock/banner" ,'get',{code:200,data: banner}); 这样的写法是错误的，有可能是以前的版本。新的mockjs 中的写法如下所示：
// Mock.mock( " /mock/floor" ,'get',{code: 200,data:floor});

//模拟首页大的轮播图的数据
Mock.mock('/mock/banner', 'get', () => {
    return  {code: 200,data: banner};
});

Mock.mock('/mock/floor', 'get', () => {
    return  {code: 200,data: floor};
});