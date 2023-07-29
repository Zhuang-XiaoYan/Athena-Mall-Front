<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startAndEndNum.start>2">……</button>
        <button v-for="(page,index) in startAndEndNum.end" :key="index" v-if="page>=startAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>
        <button v-if="startAndEndNum.end<totalPage-1">……</button>
        <button v-if="startAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>

<script>
export default {
    name: "PaginationPage",
    props:['pageNo','pagesize','total','continues'],
    //计算相关属性的值
    computed: {
        totalPage() {
            // 向上取整的功能
            return Math.ceil(this.total / this.pagesize)
        },
        startAndEndNum() {
            const {continues, totalPage, pageNo} = this
            let start = 0, end = 0;
            // 连续页码数字5【就是至少五页】,如果出现不正常的现象【就是不够五页】
            if (continues > totalPage) {
                start = 1;
                end = totalPage;
            } else {
                // 正常现象【连续页码5，但是你的总页数一定是大于5的】
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                // 把出现不正常的现象【start数字出现e|负数】纠正
                if (start<1){
                    start=1;
                    end=continues;
                }
                // 把出现不正常的现象[end数字大于总页码]纠正
                if (end>totalPage){
                    start=totalPage-continues+1;
                    end=totalPage;
                }
            }
            return{start,end}
        },
    }
}
</script>

<style scoped>

.pagination {
    text-align: center;
}

.pagination button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    &.active {
        cursor: not-allowed;
        background-color: #e1251b;
        color: #fff;
    }
}
</style>
