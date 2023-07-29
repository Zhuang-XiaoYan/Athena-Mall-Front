<template>
    <div class="outer">
        <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <!-- 使用过度动画 必要要组件包含v-show或者v-if-->
                    <transition name="typenav">
                        <div class="sort" v-show="show">
                            <!-- 利用事件委派+编程式导航实现路由的跳转-->
                            <div class="all-sort-list2" @click="goSearch">
                                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                    <h3 @mouseenter="changeIndex(index)">
                                        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                    </h3>
                                    <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                        <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                            <dl class="fore">
                                                <dt>
                                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                    </em>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import throttle from "loadsh/throttle";

export default {
    name: "TypeNav",
    data() {
        return {
            // 存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true,
        }
    },
    // 组件挂载完毕:可以向服务器发请求
    mounted() {
        // 通知Vuex发请求,获取数据，存储于仓库当中 由于性能调优 所以防止zai vapp 组件中，保证只执行一次就可以使用
        // this.$store.dispatch("categoryList")
        // 当组件挂载完毕,让show属性变为false
        // 如果不是Home路由组件，将typeNav进行隐藏
        if (this.$route.path != '/home') {
            this.show = false;
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次'注入一个参数state，其实即为大仓库中的数据
            categoryList: (state) => {
                return state.home.categoryList;
            }
        })
    },
    methods: {
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // changeIndex(index){
        // console.log(index)
        // 正常情况（用户慢慢的操作）:鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
        // 非正常情况（用户操作很快)∶本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发
        // 就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
        // this.currentIndex=index
        // },
        leaveIndex() {
            this.currentIndex = -1;
            // 当鼠标移出的时候,让商品分类列表进行关闭
            this.show=false;
            // console.log(this.currentIndex)
        },
        goSearch(event) {
            // 最好的解决方案:编程式导航+事件委派
            // 存在一些问题:事件委派，是把全部的子节点【h3、dt、dl、em】的事件委派给父亲节点
            // 点击a标签的时候I才会进行路由跳转【怎么能确定点击的一定是a标签】
            let element = event.target
            // 获取到当前出发这个事件的节点【h3、a、dt、dl】，需要带有data-categoryname这样节点【一定是a标签】I
            let {categoryname, category1id, category2id, category3id} = element.dataset;
            if (categoryname) {
                let location = {name: "search"};
                let query = {categoryName: categoryname};
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                // 判断:如果路由跳转的时候,带有params参数，捎带脚传递过去
                if (this.$route.params){
                    location.params=this.$route.params;
                    // 合并参数
                    location.query = query;
                    // 路由跳转
                    this.$router.push(location)
                }
            }
        },
        leaveShow(){
            this.currentIndex = -1;
            if (this.$route.path!='/home'){
                // 当鼠标移出的时候,让商品分类列表进行关闭
                this.show=false;
            }
        },
        enterShow(){
            if (this.$route.path!='/home'){
                // 当鼠标移入的时候,让商品分类列表进行展示
                this.show=true;
            }
        },
    }
}
</script>

<style scoped>

.outer .type-nav {
    border-bottom: 2px solid #e1251b;
}

.outer .type-nav .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
}

.outer .type-nav .container .all {
    width: 210px;
    height: 45px;
    background-color: #e1251b;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
}

.outer .type-nav .container .nav a {
    height: 45px;
    margin: 0 22px;
    line-height: 45px;
    font-size: 16px;
    color: #333;
}

.outer .type-nav .container .sort {
    left: 0;
    top: 45px;
    width: 210px;
    height: 461px;
    position: absolute;
    background: #fafafa;
    z-index: 999;
}

.outer .type-nav .container .typenav-enter {
    height: 0px;
}

.outer .type-nav .container .typenav-enter-to {
    height: 461px;
}

.outer .type-nav .container .typenav-enter-active {
   transition: all 0.5s linear;
}

.outer .type-nav .container .sort .all-sort-list2 .cur {
    background: #e1251b;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    padding: 0 20px;
    margin: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
    display: none;
    position: absolute;
    width: 734px;
    min-height: 460px;
    background: #f7f7f7;
    left: 210px;
    border: 1px solid #ddd;
    top: 0;
    z-index: 9999 !important;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
    float: left;
    width: 650px;
    padding: 0 4px 0 8px;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
    border-top: 1px solid #eee;
    padding: 6px 0;
    overflow: hidden;
    zoom: 1;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
    border-top: 0;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
    float: left;
    width: 54px;
    line-height: 22px;
    text-align: right;
    padding: 3px 6px 0 0;
    font-weight: 700;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
    float: left;
    width: 415px;
    padding: 3px 0 0;
    overflow: hidden;
}

.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
    float: left;
    height: 14px;
    line-height: 14px;
    padding: 0 8px;
    margin-top: 5px;
    border-left: 1px solid #ccc;
}

/* 通过的样式来控制的菜单的显示与隐藏
/* .outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {*/
/*    display: block;*/
/*}*/
</style>