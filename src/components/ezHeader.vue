<template>
  <div class="ez-header">
    <div
      class="ez-header-con flex-col-align"
      :class="{ 'flex-col-row-between': !isNeedSearch }"
    >
      <div class="ez-header-txt" v-if="myTitle">
        {{ myTitle }}
      </div>
      <div class="ez-header-txt" v-else>
        {{ defaultTxt }}政务一体化便民自助服务终端
      </div>
      <div class="ez-btn-con" v-if="isNeedButton">
        <div class="ez-home flex-col-row-align" @click="goHome">
          <img src="../assets/images/icon_home.png" alt="" />
          <span>首页</span>
        </div>
        <div class="ez-home flex-col-row-align" @click="goBack">
          <img src="../assets/images/icon_back.png" alt="" />
          <span>返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { POSTbyJSON } from "@/assets/js/http.js";
export default {
  props: {
    isHome: {
      type: Boolean,
      default: false,
    },
    isNeedSearch: {
      type: Boolean,
      default: true,
    },
    myTitle: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      defaultTxt: "辽宁",
      searchVal: "",
      isNeedButton: false,
    };
  },
  mounted() {
    var areaCode = sessionStorage.getItem("areaCode");
    this.getCityName(areaCode);
    if (
      sessionStorage.getItem("env") == "formalHomes.html" ||
      sessionStorage.getItem("env") == "gaHomes.html" ||
      sessionStorage.getItem("env") == "tlHomes.html" ||
      sessionStorage.getItem("env") == "testHomes.html"
    ) {
      this.isNeedButton = true;
    }
  },
  methods: {
    getCityName(areaCode) {
      let that = this;
      switch (areaCode) {
        case "2100":
          that.defaultTxt = "辽宁";
          break;
        case "2112":
          that.defaultTxt = "铁岭";
          break;
        case "2113":
          that.defaultTxt = "朝阳";
          break;
        case "211382":
          that.defaultTxt = "凌源";
          break;
      }
    },
    goHome() {
      if (this.isHome) {
        this.$emit("goHome");
      } else {
        window.location.href = "../" + sessionStorage.getItem("env");
        // this.$router.replace('/')
      }
    },
    goBack() {
      // window.history.go(-1);
      if (this.isHome) {
        this.$emit("goHome");
      } else {
        window.history.back();
      }
    },
    search() {
      this.$emit("search", this.searchVal);
    },
  },
};
</script>

<style scoped>
</style>
