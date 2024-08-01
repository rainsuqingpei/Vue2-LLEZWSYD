<template>
  <div class="ez-wrap">
    <ez-header @search="searchBussiness"></ez-header>
    <div class="ep-wrap">
      <div class="ep-container">
        <div class="ep-container-title flex-col-align">
          <span @click="goHome">首页</span>
          <span>搜索“{{ searchVal }}”结果</span>
        </div>
        <div class="sr-list flex-wrap">
          <template v-if="list.length > 0">
            <div class="sr-list_col" v-for="item in list" :key="item.id" @click="goModule(item)">
              <div
                class="sr-item flex-col-align"
              >
                <img :src="item.linkImg" alt="" />
                <span>{{ item.moduleName }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <ez-empty></ez-empty>
          </template>
        </div>
        <ez-search @search="searchBussiness"></ez-search>
      </div>
      <ez-page
        :page="page"
        :pageSize="pageSize"
        :totalPage="totalPage"
        :totalList="totalList"
        @pageChange="pageChange"
      ></ez-page>
    </div>
    <!-- 提示弹窗 -->
    <ez-dialog
      :opMessageShow1="opMessageShow1"
      :opMessageTxt1="opMessageTxt1"
      @opMessageClose1="opMessageClose1"
    ></ez-dialog>
    <!-- 选择类型 -->
    <ez-choose-type :opMessageShow2="opMessageShow2" @chooseType="chooseType"></ez-choose-type>
  </div>
</template>

<script>
import ezHeader from "@/components/ezHeader.vue";
import ezPage from "@/components/ezPage.vue";
import ezFooter from "@/components/ezFooter.vue";
import ezSearch from "@/components/ezSearch.vue";
import ezDialog from "@/components/ezDialog.vue";
import ezChooseType from "@/components/ezChooseType.vue";
import ezEmpty from "@/components/ezEmpty.vue";

import { getQueryVariable } from "@/assets/js/common";
import { post, POSTbyJSON } from "@/assets/js/http";
export default {
  components: {
    ezHeader,
    ezPage,
    ezFooter,
    ezSearch,
    ezDialog,
    ezChooseType,
    ezEmpty,
  },
  data() {
    return {
      opMessageShow1: false, //弹窗显示隐藏
      opMessageTxt1: "", //弹窗文字
      searchVal: "",
      moduleType: "",
      list: [],
      page: 1,
      pageSize: 9,
      totalPage: 0,
      totalList: [],
      opMessageShow2: false, //选择框显示隐藏
    };
  },
  mounted() {
    if (getQueryVariable("searval")) {
      this.searchVal = decodeURI(getQueryVariable("searval"));
    }
    if (getQueryVariable("moduleType")) {
      this.moduleType = decodeURI(getQueryVariable("moduleType"));
    }
    this.searchModuleName();
  },
  methods: {
    searchModuleName() {
      let params = {
        areaCode: sessionStorage.getItem("areaCode"),
        moduleName: this.searchVal,
        moduleType: this.moduleType,
        limit: 9999,
        page: 1,
        stageState: 1,
      };
      POSTbyJSON("/bmModuleInfo/searchModuleName", params).then((res) => {
        if (res.success) {
          this.totalList = res.result.result.records;
          this.list = this.totalList.slice(0, this.pageSize);
          this.totalPage = Math.ceil(this.totalList.length / this.pageSize);
        }
      });
    },
    searchBussiness(val) {
      if (!val) {
        this.opMessageTxt1 = "请输入关键字";
        this.opMessageShow1 = true;
        return;
      }
      this.searchVal = val;
      this.searchModuleName();
    },
    goHome() {
      window.location.href = "../" + sessionStorage.getItem("env");
    },
    pageChange(list) {
      this.list = list;
    },
    goModule(item) {
      console.log(item);
      sessionStorage.setItem("moduleUrl", item.moduleUrl);
      sessionStorage.setItem("moduleCode", item.moduleCode);
      sessionStorage.setItem("moduleType", item.moduleType);
      // moduleType=3 电子证照业务 则弹窗选择 其余进入正常的人证合一页面
      if (item.moduleType == '3') {
        this.opMessageShow2 = true
      } else if (item.isNeedFace) {
        window.location.href = item.moduleUrl;
      } else {
        window.location.href = "../readingCardnoface.html";
      }
    },
    chooseType(type) {
      console.log(type)
      if (type == "card") {
        window.location.href = "../readingCardnoface.html";
      }
      if (type == "code") {
        let moduleUrl = sessionStorage.getItem("moduleUrl");
        let moduleCode = sessionStorage.getItem("moduleCode");
        window.location.href = moduleUrl + "&moduleCode=" + moduleCode;
      }
      if (type == "qrCode") {
        let moduleUrl = sessionStorage.getItem("moduleUrl");
        let moduleCode = sessionStorage.getItem("moduleCode");
        window.location.href = moduleUrl + "&moduleCode=" + moduleCode + "&loginType=qrCode";
      }
    },
    opMessageClose1() {
      this.opMessageShow1 = false;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common.css");
</style>
