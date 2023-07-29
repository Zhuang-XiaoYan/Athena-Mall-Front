<template>
    <header class="header">
        <div class="top">
            <div class="container">
                <div class="homehead">
                    <p>上海[更换]</p>
                </div>
                <div class="typeList">
                    <div class="loginList">
                        <p v-if="!userName">
                            <router-link to="/login">你好！请登陆</router-link>
                            <router-link to="/register" class="register">免费注册 &nbsp;|</router-link>
                        </p>
                        <p v-else>
                            <a>{{ userName }}</a>
                            <a class="register" @click="logout" href="javascript:">退出登陆</a>
                        </p>
                    </div>
                    <router-link to="/center">我的订单 &nbsp;</router-link>
                    <router-link to="/login">我的Vue-Mall &nbsp;</router-link>
                    <router-link to="/shopcart">我的购物车 &nbsp;</router-link>
                    <a href="">企业采购</a>
                    <a href="">商家服务</a>
                    <a href="">网站导航</a>
                    <a href="">手机Vue-Mall</a>
                    <a href="">网站无障碍</a>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="Vue-Mall" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    name: "HeaderPage",
    data() {
        return {
            keyword: "",
        }
    },
    methods: {
        //获取keyword关键字并跳转search
        goSearch() {
            this.$router.push({
                name: "search",
                query: {
                    ...this.$route.query,
                    keyword: this.keyword || undefined,
                },
            });
        },
        // 用户退出系统 退出登录需要做的事情
        async logout() {
            try {
                // 1:需要发请求,通知服务器退出登录【清除一些数据:token】
                // 2:清除项目当中的数据【userInfo、 token】
                await this.$store.dispatch("userLogOut")
                // 回到首页
                this.$router.push("/home")
            } catch (error) {
                // 打印错误
                alert(error.message);
            }
        }
    },
    mounted() {
        // 通过全局事件总线将关键字设置空
        this.$bus.$on("clear", () => {
            this.keyword = '';
        });
    },
    computed: {
        // 用户名信息
        userName() {
            return this.$store.state.user.userInfo.name;
        }
    }
}
</script>

<style scoped>

.header > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
}

.header > .top .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.header > .top .container .homehead {
    float: left;
}

.header > .top .container .homehead p {
    float: left;
    margin-right: 10px;
}

.header > .top .container .loginList {
    float: left;
}

.header > .top .container .loginList p {
    float: left;
    margin-right: 0px;
}

.header > .top .container .loginList p .register {
    border-left: 1px solid #b3aeae;
    padding: 0 5px;
    margin-left: 5px;
}

.header > .top .container .typeList {
    float: right;
}

.header > .top .container .typeList a {
    padding: 0 10px;
}

.header > .top .container .typeList a + a {
    border-left: 1px solid #b3aeae;
}

.header > .bottom {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}

.header > .bottom .logoArea {
    float: left;
}

.header > .bottom .logoArea .logo img {
    width: 250px;
    margin: 20px 0px;
}

.header > .bottom .searchArea {
    position: absolute;
    left: 350px;
    margin-top: 35px;
}

.header > .bottom .searchArea .searchForm {
    text-align: center;
    overflow: hidden;
}

.header > .bottom .searchArea .searchForm input {
    box-sizing: border-box;
    width: 490px;
    height: 32px;
    padding: 0px 4px;
    border: 2px solid #ea4a36;
    float: left;
}

.header > .bottom .searchArea .searchForm input:focus {
    outline: none;
}

.header > .bottom .searchArea .searchForm button {
    height: 32px;
    width: 68px;
    background-color: #ea4a36;
    border: none;
    color: #fff;
    float: left;
    cursor: pointer;
}

.header > .bottom .searchArea .searchForm button:focus {
    outline: none;
}
</style>