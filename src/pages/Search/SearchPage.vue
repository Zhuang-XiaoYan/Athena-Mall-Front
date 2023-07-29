<template>
    <div class="outer">
        <TypeNav></TypeNav>
        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
                        <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
                        <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeattrValue(index)">×</i></li>
                    </ul>
                </div>
                <!--SearchSelector-->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>
                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder('1')">
                                    <a>综合<span v-show="isAsc">↑</span><span v-show="isDesc">↓</span></a>
                                </li>
                                <li :class="{active:isTwo}" @click="changeOrder('2')">
                                    <a>价格<span v-show="isAsc">↑</span><span v-show="isDesc">↓</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <!--在路由跳转的时候切记别忘记带id (params）参数-->
                                        <router-link :to="`/detail/${good.id}`">
                                            <img v-lazy="good.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{good.price}}.00</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" title="">{{good.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                           class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <PaginationPage :pageNo="searchParams.pageNo" :pagesize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></PaginationPage>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SearchSelector from "@/pages/Search/SearchSelector/SearchSelector.vue";
import {mapGetters} from "vuex";
import {mapState} from "vuex";

export default {
    name: "SearchPage",
    data() {
        return {
            searchParams: {
                // 一级分类id
                category1Id: null,
                // 二级分类id
                category2Id: null,
                // 三级分类id
                category3Id: null,
                // 分类的名字
                categoryName: "",
                // 搜素关键字
                keyword: "",
                trademark: "",
                props: [],
                pageNo: 1,
                pageSize: 10,
                // 排序初始状态应该是综合降序
                order: "1:desc",
            },
        };
    },
    components: {
        SearchSelector,
    },
    // 当组件挂载完毕之前执行一次【先与mounted之前】
    beforeMount() {
        // Object.assign() 是Es6的新增的语法合并对象。
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    // 当组件挂载的时候执行一次
    mounted() {
        // 在发请求之前带给服务器参数【searchParams】参数发生变
        this.getData()
    },
    methods: {
        // 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示)
        getData() {
            this.$store.dispatch("getSearchList", this.searchParams)
        },
        // 删除分类名字
        removeCategoryName() {
            // 把带给服务器的参数置空了，还需要向服务器发请求
            this.searchParams.categoryName = undefined;
            // 每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            this.getData();
            // 地址栏也需要需改:进行路由跳转
            if (this.$route.params) {
                this.$router.push({name: "search", params: this.$route.params})
            }
        },
        // 删除关键字
        removeKeyword(){
            // 给服务器带的参数searchParams的keyword置空
            this.searchParams.keyword = undefined;
            // 再次发送请求
            this.getData();
            // 通知兄弟组件Header组件清除关键字
            this.$bus.$emit("clear");
            // 进行路由跳转
            if (this.$route.query){
                this.$router.push({name: "search",query:this.$route.query})
            }
        },
        // 删除品牌分类
        removeTrademark(){
            this.searchParams.trademark = undefined;
            // 再次发送请求
            this.getData();
        },
        // 自定义事件回调
        trademarkInfo(trademark){
            // 整理品牌参数
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            // 再次发送请求
            this.getData();
        },
        // 收集平台属性的回调函数（自定义事件）
        attrInfo(attr, attrValue) {
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
            // 数组去重
            if (this.searchParams.props.indexOf(props)==-1){
                this.searchParams.props.push(props);
            }
            // 再次发送请求
            this.getData();
        },
        // 删除售卖属性
        removeattrValue(index){
            // 再次整理参数
            this.searchParams.props.splice(index,1);
            // 再次发送请求
            this.getData();
        },
        //排序操作
        changeOrder(flag){
            //flag形参:它是一个标记，代表用户点击的是综合（1）价格（2)
            let originOrder=this.searchParams.order;
            let orginFlag=originOrder.split(":")[0];
            let originSort=originOrder.split(":")[1];
            let newOrder="";
            if (flag==orginFlag){
                // 点击的综合
                newOrder=`${orginFlag}:${originSort=='desc'?'asc':'desc'}`;
            }else {
                // 点击的价格
                newOrder=`${flag}:${'desc'}`;
            }
            this.searchParams.order=newOrder;
            // 再次发送请求
            this.getData();
        },
        getPageNo(PageNo){
            // 整理参数
            this.searchParams.pageNo=PageNo;
            // 再次发送请求
            this.getData();
        }
    },
    computed:{
        // mapGetters里面的写法:传递的数组，因为getters计算是没有划分模块
        ...mapGetters(['goodsList']),
        isOne(){
            return this.searchParams.order.indexOf("1")!=-1;
        },
        isTwo(){
            return this.searchParams.order.indexOf("2")!=-1;
        },
        isAsc(){
            return this.searchParams.order.indexOf("asc")!=-1;
        },
        isDesc(){
            return this.searchParams.order.indexOf("desc")!=-1;
        },
        //
        ...mapState({
            total:state => state.search.searchList.total
        })
    },
    //数据监听:监听组件实例身上的属性的属性值变化
    watch:{
        // 监听$route是否有变化，如果有变化就再一次发起请求。
        $route(){
            // 再次发请求之前整理带给服务器参数
            Object.assign(this.searchParams,this.$route.query,this.$route.params)
            this.getData()
            // 每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
            this.searchParams.category1Id=undefined;
            this.searchParams.category2Id=undefined;
            this.searchParams.category3Id=undefined;
        }
    }
}
</script>

<style scoped>

.outer .typeNav .container .nav a {
    height: 45px;
    margin: 0 22px;
    line-height: 45px;
    font-size: 16px;
    color: #333;
}

.outer .typeNav .container .sort .all-sort-list2 .item h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
}

.outer .typeNav .container .sort .all-sort-list2 .item h3 a {
    color: #333;
}


.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl {
    border-top: 1px solid #eee;
    padding: 6px 0;
    overflow: hidden;
    zoom: 1;
}

.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
    float: left;
    width: 54px;
    line-height: 22px;
    text-align: right;
    padding: 3px 6px 0 0;
    font-weight: 700;
}

.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
    float: left;
    width: 415px;
    padding: 3px 0 0;
    overflow: hidden;
}

.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
    float: left;
    height: 14px;
    line-height: 14px;
    padding: 0 8px;
    margin-top: 5px;
    border-left: 1px solid #ccc;
}

.outer .main {
    margin: 10px 0;
}

.outer .main .py-container {
    width: 1200px;
    margin: 0 auto;
}

.outer .main .py-container .bread {
    margin-bottom: 5px;
    overflow: hidden;
    background: #fbfbfb;
    border: 1px solid #e2e2e2;
}

.outer .main .py-container .bread .sui-breadcrumb {
    padding: 3px 15px;
    margin: 0;
    font-weight: 500;
    border-radius: 3px;
    float: left;
}

.outer .main .py-container .bread .sui-breadcrumb li {
    display: inline-block;
    line-height: 18px;
}

.outer .main .py-container .bread .sui-breadcrumb li a {
    color: #666;
    text-decoration: none;
}

.outer .main .py-container .bread .sui-breadcrumb li a:hover {
    color: #4cb9fc;
}

.outer .main .py-container .bread .sui-tag {
    margin-top: -5px;
    list-style: none;
    font-size: 0;
    line-height: 0;
    padding: 5px 0 0;
    margin-bottom: 18px;
    float: left;
}

.outer .main .py-container .bread .sui-tag .with-x {
    font-size: 12px;
    margin: 0 5px 5px 0;
    display: inline-block;
    overflow: hidden;
    color: #000;
    background: #f7f7f7;
    padding: 0 7px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #dedede;
    white-space: nowrap;
    transition: color 400ms;
    cursor: pointer;
}

.outer .main .py-container .bread .sui-tag .with-x i {
    margin-left: 10px;
    cursor: pointer;
    font: 400 14px tahoma;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}

.outer .main .py-container .bread .sui-tag .with-x:hover {
    color: #28a3ef;
}

.outer .main .py-container .details {
    margin-bottom: 5px;
}

.outer .main .py-container .details .sui-navbar {
    overflow: visible;
    margin-bottom: 0;
}

.outer .main .py-container .details .sui-navbar .filter {
    min-height: 40px;
    padding-right: 20px;
    background: #fbfbfb;
    border: 1px solid #e2e2e2;
    padding-left: 0;
    border-radius: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}

.outer .main .py-container .details .sui-navbar .filter .sui-nav {
    position: relative;
    left: 0;
    display: block;
    float: left;
    margin: 0 10px 0 0;
}

.outer .main .py-container .details .sui-navbar .filter .sui-nav li {
    float: left;
    line-height: 18px;
}

.outer .main .py-container .details .sui-navbar .filter .sui-nav li a {
    display: block;
    cursor: pointer;
    padding: 11px 15px;
    color: #777;
    text-decoration: none;
}

.outer .main .py-container .details .sui-navbar .filter .sui-nav li.active a {
    background: #e1251b;
    color: #fff;
}

.outer .main .py-container .details .goods-list {
    margin: 20px 0;
}

.outer .main .py-container .details .goods-list ul {
    display: flex;
    flex-wrap: wrap;
}

.outer .main .py-container .details .goods-list ul li {
    height: 100%;
    width: 20%;
    margin-top: 10px;
    line-height: 28px;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .p-img {
    padding-left: 15px;
    width: 215px;
    height: 255px;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a {
    color: #666;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .price {
    padding-left: 15px;
    font-size: 18px;
    color: #c81623;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .price strong {
    font-weight: 700;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .price strong i {
    margin-left: -5px;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .attr {
    padding-left: 15px;
    width: 85%;
    overflow: hidden;
    margin-bottom: 8px;
    min-height: 38px;
    cursor: pointer;
    line-height: 1.8;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .attr a {
    color: #333;
    text-decoration: none;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .commit {
    padding-left: 15px;
    height: 22px;
    font-size: 13px;
    color: #a7a7a7;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .commit span {
    font-weight: 700;
    color: #646fb0;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate {
    padding: 12px 15px;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
    display: inline-block;
    padding: 2px 14px;
    box-sizing: border-box;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 0;
    background-color: transparent;
    margin-right: 15px;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
    min-width: 85px;
    background-color: transparent;
    border: 1px solid #8c8c8c;
    color: #8c8c8c;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
    border: 1px solid #666;
    color: #fff !important;
    background-color: #666;
    text-decoration: none;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
    border: 1px solid #e1251b;
    color: #e1251b;
}

.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
    border: 1px solid #e1251b;
    background-color: #e1251b;
    color: white !important;
    text-decoration: none;
}

.outer .main .py-container .details .page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;
}

.outer .main .py-container .details .page .sui-pagination {
    margin: 18px 0;
}

.outer .main .py-container .details .page .sui-pagination ul {
    margin-left: 0;
    margin-bottom: 0;
    vertical-align: middle;
    width: 490px;
    float: left;
}

.outer .main .py-container .details .page .sui-pagination ul li {
    line-height: 18px;
    display: inline-block;
}

.outer .main .py-container .details .page .sui-pagination ul li a {
    position: relative;
    float: left;
    line-height: 18px;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #e0e9ee;
    margin-left: -1px;
    font-size: 14px;
    padding: 9px 18px;
    color: #333;
}

.outer .main .py-container .details .page .sui-pagination ul li.active a {
    background-color: #fff;
    color: #e1251b;
    border-color: #fff;
    cursor: default;
}

.outer .main .py-container .details .page .sui-pagination ul li.prev a {
    background-color: #fafafa;
}

.outer .main .py-container .details .page .sui-pagination ul li.disabled a {
    color: #999;
    cursor: default;
}

.outer .main .py-container .details .page .sui-pagination ul li.dotted span {
    margin-left: -1px;
    position: relative;
    float: left;
    line-height: 18px;
    text-decoration: none;
    background-color: #fff;
    font-size: 14px;
    border: 0;
    padding: 9px 18px;
    color: #333;
}

.outer .main .py-container .details .page .sui-pagination ul li.next a {
    background-color: #fafafa;
}

.outer .main .py-container .details .page .sui-pagination div {
    color: #333;
    font-size: 14px;
    float: right;
    width: 241px;
}

.outer .main .py-container .hot-sale .hot-list ul {
    display: flex;
}

.outer .main .py-container .hot-sale .hot-list ul li {
    width: 25%;
    height: 100%;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
    padding-left: 15px;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
    max-width: 100%;
    vertical-align: middle;
    border: 0;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
    width: 85%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 8px;
    min-height: 38px;
    cursor: pointer;
    line-height: 1.8;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price {
    font-size: 18px;
    color: #c81623;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
    font-weight: 700;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {
    margin-left: -5px;
}

.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
    height: 22px;
    font-size: 13px;
    color: #a7a7a7;
}
</style>