<template>
  <div>
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <ListRecommend></ListRecommend>
      <ListRank></ListRank>
      <ListLike></ListLike>
      <ListFloor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></ListFloor>
      <ListBrand></ListBrand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer.vue";
import ListRecommend from "@/pages/Home/ListRecommend/ListRecommend.vue";
import ListRank from "@/pages/Home/ListRank/ListRank.vue";
import ListLike from "@/pages/Home/ListLike/ListLike.vue";
import ListFloor from "@/pages/Home/ListFloor/ListFllor.vue";
import ListBrand from "@/pages/Home/ListBrand/ListBrand.vue";
import {mapState} from "vuex";
export default {
    name: "HomaPage",
    components:{
        ListContainer,
        ListRecommend,
        ListRank,
        ListLike,
        ListFloor,
        ListBrand,
    },
    mounted() {
        // 派发action 获取flooer组件的数据
        this.$store.dispatch("getFloorList");
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次'注入一个参数state，其实即为大仓库中的数据
            floorList: state => state.home.floorList
        })
    },
}
</script>

<style scoped>

</style>