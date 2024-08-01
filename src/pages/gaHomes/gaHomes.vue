<template>
  <div class="ez-bg">
    <div class="ez-noright-wrap" v-if="!hasPermision">
      <ez-header
        myTitle="辽宁省公安便民服务自助专区"
        :isHome="true"
        :isNeedSearch="false"
        @search="searchBussiness"
      ></ez-header>
      <div class="ez-err">
        <span class="ez-txt" v-if="fwzCode && mac">该设备无权限</span>
        <span class="ez-txt" v-else>找不到设备</span>
        <div class="hide-txt" @dblclick="showIt=!showIt">
          <span v-if="showIt">fwzCode:{{ fwzCode }} <br> mac:{{ mac }}</span>
          <span v-else></span>
        </div>
        <div class="ez-tel flex-col-row-align">
          <img src="../../assets/images/phone22.png" alt="" />
          <span class="tx">设备维护热线</span>
          <span class="tel">400-0952-195</span>
        </div>
      </div>
    </div>
    <div class="ez-wrap" v-if="hasPermision">
      <ez-header
        myTitle="辽宁省公安便民服务自助专区"
        :isHome="true"
        @search="searchBussiness"
        @goHome="level = '1'"
      ></ez-header>
      <div class="ez-container" v-if="level == '1'">
        <div class="ez-container-left">
          <div class="ez-left-title flex-col-row-between">
            <div class="ex-title-tab">
              <span
                :class="{
                  on: curTab == item.value,
                  big: item.value == 'cxdylyw' || item.value == 'dzzzyw',
                }"
                v-for="item in tabList"
                :key="item.value"
                @click="changeTab(item)"
                ><i></i>{{ item.name }}</span
              >
            </div>
          </div>
          <div class="ez-left-list flex-wrap">
            <template v-if="buLists.length > 0">
              <div
                class="ez-left-col-item"
                v-for="item in buLists"
                :key="item.value"
                @click="getChild(item)"
              >
                <div class="ez-left-item">
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
        <div class="ez-container-right">
          <!-- <div class="ez-con-bt-one" @click="goPage('lnzwfww')">
            <div class="txt">辽宁政务服务网</div>
          </div>
          <div class="ez-con-bt-blue-and-red">
            <div class="txt" @click="goEProvince('ks')">
              跨省通办 <br />
              专区
            </div>
            <div class="txt" @click="goEProvince('ln')">
              省内通办 <br />
              专区
            </div>
          </div> -->
          <div class="ez-con-bt-sub-con">
            <div class="ez-con-bt-hot-line"></div>
          </div>
        </div>
      </div>
      <div class="ep-wrap" v-if="level == '2' || level == '3'">
        <div class="ep-container">
          <div class="ep-container-title flex-col-align">
            <span @click="setLevel('1')">首页</span>
            <span @click="setLevel('2')">{{ curItem }}</span>
            <span v-if="level == '3'">{{ curSecItem }}</span>
          </div>
          <div class="sr-list flex-wrap">
            <template v-if="childList.length > 0">
              <div
                class="sr-list_col"
                v-for="item in childList"
                :key="item.id"
                @click="goModule(item)"
              >
                <div class="sr-item flex-col-align">
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
          ref="ezPage"
          :page="page"
          :pageSize="pageSize"
          :totalPage="totalPage"
          :totalList="totalList"
          @pageChange="pageChange"
        ></ez-page>
      </div>
    </div>

    <!-- 提示弹窗 -->
    <ez-dialog
      :opMessageShow1="opMessageShow1"
      :opMessageTxt1="opMessageTxt1"
      @opMessageClose1="opMessageClose1"
    ></ez-dialog>
    <!-- 选择类型 -->
    <ez-choose-type
      :opMessageShow2="opMessageShow2"
      @chooseType="chooseType"
    ></ez-choose-type>
  </div>
</template>

<script>
import { post, POSTbyJSON } from "@/assets/js/http.js";
import ezHeader from "@/components/ezHeader.vue";
import ezPage from "@/components/ezPage.vue";
import ezFooter from "@/components/ezFooter.vue";
import ezSearch from "@/components/ezSearch.vue";
import ezDialog from "@/components/ezDialog.vue";
import ezChooseType from "@/components/ezChooseType.vue";
import ezEmpty from "@/components/ezEmpty.vue";

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
      showIt: false,//左下角信息
      fwzCode: null, //服务站地址
      mac: null, //机器MAC
      opMessageShow1: false, //弹窗显示隐藏
      opMessageTxt1: "", //弹窗文字
      opMessageShow2: false, //选择框显示隐藏
      areaCode: "",
      level: "1",
      curItem: "",
      curModule: "",
      curSecItem: "",
      curTab: "gayw",
      tabList: [
        {
          name: "公安专区",
          value: "gayw",
        },
      ],
      buLists: [],
      page: 1,
      pageSize: 9,
      totalPage: 0,
      totalList: [],
      childList: [],
      hasPermision: false,
      firstTime: false,
    };
  },
  created() {
    // 逻辑-默认areaCode=2100 在省内通办 点击下属菜单时候 eProvince.vue L236设置存储sessionStorage areaCode
    sessionStorage.setItem("env", "gaHomes.html");
    if (sessionStorage.getItem("areaCode")) {
      this.areaCode = sessionStorage.getItem("areaCode");
    } else {
      this.areaCode = "2100";
      sessionStorage.setItem("areaCode", this.areaCode);
    }

    let that = this;
    // 先从缓存中判断有无fwzCode mac 有则接口检查 无则判断Url上的入参
    let fwzCode = sessionStorage.getItem("fwzCode");
    let mac = sessionStorage.getItem("mac");
    if (
      fwzCode &&
      mac &&
      fwzCode != "undefined" &&
      mac != "undefined" &&
      fwzCode != "null" &&
      mac != "null"
    ) {
      this.fwzCode = fwzCode;
      this.mac = mac;
      this.checkDevice();
    } else {
      // 判断Url上的入参 有则检查无则无权限
      var params = this.utils.getUrlParams();
      if (params.fwzCode) {
        this.fwzCode = params.fwzCode.split("#")[0];
        this.mac = decodeURIComponent(params.mac.split("#")[0]);
        sessionStorage.setItem("fwzCode", that.fwzCode);
        sessionStorage.setItem("mac", that.mac);
        that.checkDevice();
      } else {
        Promise.all([that.getFwzCode(), that.getMacCode()])
          .then(function (res) {
            if (res && res.length > 0) {
              that.fwzCode = res[0];
              that.mac = res[1];
              console.log(res[0], "fwzCode");
              console.log(res[1], "mac");
              sessionStorage.setItem("fwzCode", that.fwzCode);
              sessionStorage.setItem("mac", that.mac);
              that.checkDevice();
            } else {
              that.hasPermision = false;
            }
          })
          .catch((res) => {
            console.log(res);
            that.hasPermision = false;
          });
      }
    }
  },
  mounted() {},
  methods: {
    getFwzCode() {
      var that = this;
      return new Promise(function (resolve) {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8801/device/deviceManage/GetFwzCode",
          dataType: "json",
          data: { token: "111", moduleCode: "fgg111" },
          success: function (data) {
            if (data.code == 0) {
              resolve(data.data.FwzCode);
            }
          },
          error: function (jqXHR) {
            console.log(jqXHR)
          },
        });
      });
    },
    getMacCode() {
      var that = this;
      return new Promise(function (resolve) {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8801/device/deviceManage/gain",
          dataType: "json",
          data: { token: "111", moduleCode: "fgg111" },
          success: function (data) {
            if (data.data.macAddress) {
              resolve(data.data.macAddress);
            }
          },
          error: function (jqXHR) {
            console.log(jqXHR)
          },
        });
      });
    },
    checkDevice() {
      let that = this;
      let params = {
        fwzCode: this.fwzCode,
        mac: this.mac,
      };
      post("/macCheck/checkDevice", params)
        .then((res) => {
          if (res.code == 200) {
            that.hasPermision = true;
            // 有权限后获取数据
            // 如果页面入参moduleType存在于tabList中则请求该tab
            let pageParams = this.utils.getUrlParams();
            let pageModuleType = decodeURIComponent(
              pageParams.moduleType || ""
            );
            let pageModuleName = decodeURIComponent(
              pageParams.moduleName || ""
            );
            let tabObj = this.tabList.find(
              (item) => item.value == pageModuleType
            );
            if (tabObj && pageModuleName) {
              that.firstTime = true;
              that.curTab = pageModuleType;
              that.GetCityBusinessTree(pageModuleType);
            } else {
              that.GetCityBusinessTree("gayw");
            }
          } else {
            that.hasPermision = false;
          }
        })
        .catch((res) => {
          console.log(res);
          that.hasPermision = false;
        });
    },
    formatedModuleType: function (moduleType) {
      switch (moduleType) {
        case "gryw":
          return "";
        case "fryw":
          return "2";
        case "dzzzyw":
          return "3";
        case "cxdylyw":
          return "4";
        case "gayw":
          return "9";
        default:
          return "";
      }
    },
    GetCityBusinessTree(moduleType) {
      let params = {
        areaCode: this.areaCode,
        stageState: "1",
        moduleType: this.formatedModuleType(moduleType),
      };
      POSTbyJSON("/bmModuleInfo/GetCityBusinessTree", params).then((res) => {
        if (res.success) {
          this.buLists = res.result.BusinessList.filter((item) => {
            return (
              item.stageState && item.stageState.toString().indexOf("1") != -1
            );
          });
          this.buLists = this.buLists.filter((item) => {
            if (this.areaCode == "350128") {
              return item.areaCode.indexOf(this.areaCode) != -1;
            } else if (this.areaCode == "211382") {
              return item.areaCode.indexOf(this.areaCode) != -1;
            } else {
              // return item.areaCode.indexOf(this.areaCode + "00") != -1;
              return item.areaCode.indexOf(this.areaCode) != -1;
            }
          });
          // 如果页面入参moduleType存在于tabList中则请求该tab，如果有moduleName且firstTime则显示改部门
          let pageParams = this.utils.getUrlParams();
          let pageModuleType = decodeURIComponent(pageParams.moduleType || "");
          let pageModuleName = decodeURIComponent(pageParams.moduleName || "");
          if (this.firstTime && pageModuleType && pageModuleName) {
            let moduleObj = this.buLists.find(
              (item) => item.moduleName == pageModuleName
            );
            moduleObj && this.getChild(moduleObj);
            this.firstTime = false;
          }
        } else {
        }
      });
    },
    getChild(item) {
      // moduleType=9 公安事项服务 直接跳转地址
      // if(item.moduleType == "9"){
      //   window.location.href = item.moduleUrl;
      //   return
      // }
      this.level = "2";
      this.curModule = item;
      this.curItem = item.moduleName;
      this.setInfo(item);
    },
    setInfo(item) {
      this.page = 1;
      this.totalList = item.children;
      this.childList = this.totalList.slice(0, this.pageSize);
      this.totalPage = Math.ceil(this.totalList.length / this.pageSize);
    },
    goModule(item) {
      if (item.children && item.children.length > 0) {
        this.level = "3";
        this.curSecItem = item.moduleName;
        this.setInfo(item);
      } else {
        console.log(item);
        sessionStorage.setItem("moduleUrl", item.moduleUrl);
        sessionStorage.setItem("moduleCode", item.moduleCode);
        sessionStorage.setItem("moduleType", item.moduleType);
        // moduleType=3 电子证照业务 则弹窗选择 其余进入正常的人证合一页面
        if(item.moduleType == '3'){
          this.opMessageShow2 = true
        } else if (item.isNeedFace) {
          window.location.href = item.moduleUrl;
        }else {
          window.location.href = "../readingCardnoface.html";
        }
      }
    },
    setLevel(level) {
      this.level = level;
      if (level == "2") {
        this.setInfo(this.curModule);
        this.$refs["ezPage"].resetPage();//重置分页页码为1
      }
    },
    goPage(type) {
      if (type == "lnzwfww") {
        window.location.href = "https://www.lnzwfw.gov.cn/?gb=1";
      }
    },
    pageChange(list) {
      this.childList = list;
    },
    searchBussiness(val) {
      if (!val) {
        this.opMessageTxt1 = "请输入关键字";
        this.opMessageShow1 = true;
        return;
      }
      // 增加moduleType过滤
      window.location.href = "../sResult.html?moduleType=9&searval=" + encodeURI(val);
      // this.$router.push({name:'sResult',query:{searval:val}})
    },
    changeTab(item) {
      this.curTab = item.value;
      this.GetCityBusinessTree(item.value);
    },
    goEProvince(type) {
      window.location.href = "../eProvince.html?type=" + type;
      // this.$router.push({name:'eProvince',query:{type:type}})
      // window.location.href = "http://218.98.100.2:8607/allezwdemo/Lnkstb.html"
    },
    opMessageClose1() {
      this.opMessageShow1 = false;
    },
    chooseType(type) {
      console.log(type)
      if(type == "card"){
        window.location.href = "../readingCardnoface.html";
      }
      if(type == "code"){
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
  },
};
</script>

<style scoped>
@import url("../../assets/css/common.css");
</style>
