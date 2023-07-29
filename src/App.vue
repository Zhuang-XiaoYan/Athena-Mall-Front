<template>
    <div>
        <HeaderPage></HeaderPage>
        <router-view></router-view>
        <FooterPage v-show="$route.meta.show"></FooterPage>
    </div>
</template>

<script>
import HeaderPage from "@/components/Header/HeaderPage.vue";
import FooterPage from "@/components/Footer/FooterPage.vue";

export default {
    name: 'App',
    methods: {},
    components: {
        HeaderPage,
        FooterPage,
    },
    mounted() {
        // 通知Vuex发请求,获取数据，存储于仓库当中
        this.$store.dispatch("getCategoryList")
    }
}
</script>

<style>

</style>
