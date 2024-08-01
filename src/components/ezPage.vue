<template>
  <div class="ep-btn-group flex-col-row-align">
    <div class="flex-col-row-align" v-if="totalList.length > pageSize">
      <span class="disabled" v-if="curPage == 1">上一页</span>
      <span v-if="curPage > 1" @click="prevPage">上一页</span>
      <span v-if="curPage < totalPage" @click="nextPage">下一页</span>
      <span class="disabled" v-if="curPage == totalPage">下一页</span>
    </div>
    <img src="../assets/images/hot_line.png" alt="" />
  </div>
</template>

<script>
export default {
  props: ["page", "pageSize", "totalPage", "totalList"],
  data() {
    return {
      curPage: 1,
    };
  },
  mounted() {
    this.curPage = this.page;
  },
  methods: {
    resetPage() {
      this.curPage = this.page;
    },
    prevPage() {
      if (this.curPage > 1) {
        this.curPage--;
        let list = this.totalList.slice(
          (this.curPage - 1) * this.pageSize,
          this.curPage * this.pageSize
        );
        this.$emit("pageChange", list);
      }
    },
    nextPage() {
      if (this.curPage < this.totalPage) {
        this.curPage++;
        let list = this.totalList.slice(
          (this.curPage - 1) * this.pageSize,
          this.curPage * this.pageSize
        );
        this.$emit("pageChange", list);
      }
    },
  },
};
</script>

<style>
</style>
