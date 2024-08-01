<template>
  <div class="ez-search1">
    <input
      v-model="searchVal"
      type="text"
      placeholder="输入关键字搜索"
      @focus="openKeyboard"
      @blur="closeKeyboard"
      @keyup.enter="search"
    />
    <div class="search-img flex-col-row-align" @click="search">
      <img src="../assets/images/search.png" alt="" />
    </div>
  </div>
</template>

<script>
import { POSTbyJSON } from "@/assets/js/http.js";

export default {
  data() {
    return {
      nowDate: "",
      nowTime: "",
      nowDay: "",
      searchVal: "",
    };
  },
  mounted() {},
  methods: {
    search() {
      this.$emit("search", this.searchVal);
    },
    openKeyboard() {
      POSTbyJSON("http://localhost:8801/device/keyboardManage/open", {
        token: "111",
      }).then((res) => {});
    },
    closeKeyboard() {
      POSTbyJSON("http://localhost:8801/device/keyboardManage/close", {
        token: "111",
        moduleId: 8,
        status: 1,
      }).then((res) => {});
    },
  },
};
</script>

<style>
</style>
