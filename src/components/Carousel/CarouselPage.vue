<template>
    <div class="swiper-container" ref="swiperComponent">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "CarouselPage",
    props:['list'],
    watch: {
        list: {
            // 立即监听:不管你数据有没有变化,我上来立即监听一次
            // 为什么watch监听不大list:因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面该有的数据都是
            immediate: true,
            handler() {
                // 第一次书写Swiper的时候:在mounted当中书写是不可以的，但是为什么现在这里可以啦!
                // 第一次书写轮播图的时候，是在当前组件内部发请求、动态渲染解构【前台至少服务器数据需要回来】，因此当年的写法在这里不行
                // 现在的这种写法为什么可以:因为请求是父组件发的，父组件通过props传递过来的，而且结构都已经有了的情况下执行mounted
                this.$nextTick(() => {
                    new Swiper(this.$refs.swiperComponent, {
                        loop: true, //环路，让Swiper看起来是循环的
                        speed: 150, //速度ms
                        freeMode: true, //根据惯性滑动可能不止一格且不会贴合
                        observer: true, //修改swiper自己或子元素时，自动初始化swiper
                        autoplay: true, //自动切换
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                })
            }
        }
    }
}
</script>

<style scoped>

</style>