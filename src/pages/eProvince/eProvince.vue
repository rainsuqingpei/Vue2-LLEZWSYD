<template>
  <div class="ez-wrap">
    <ez-header @search="searchBussiness"></ez-header>
    <div class="ep-wrap">
      <div class="ep-container">
        <div class="ep-container-title flex-col-align">
          <span @click="goHome">首页</span>
          <span v-if="type == 'fj' || type == 'ln'" @click="clearCity">省内通办</span>
          <span v-if="type == 'ks'" @click="clearProvince">跨省通办</span>
          <span v-if="curProvince">{{ curProvinceName }}</span>
        </div>
        <div class="ep-list flex-wrap">
          <div
            class="ep-item"
            v-for="item in list"
            :key="item.name"
            @click="getArea(item)"
          >
            <img :src="item.imgUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
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
  </div>
</template>

<script>
import ezHeader from "@/components/ezHeader.vue";
import ezPage from "@/components/ezPage.vue";
import ezFooter from "@/components/ezFooter.vue";
import ezSearch from "@/components/ezSearch.vue";
import ezDialog from "@/components/ezDialog.vue";

import { HeroJS } from "@/assets/js/hero.min";
import { getQueryVariable } from "@/assets/js/common";
import { get } from "@/assets/js/http";
export default {
  components: {
    ezHeader,
    ezPage,
    ezFooter,
    ezSearch,
    ezDialog,
  },
  data() {
    return {
      opMessageShow1: false, //弹窗显示隐藏
      opMessageTxt1: "", //弹窗文字
      type: "",
      list: [],
      page: 1,
      pageSize: 8,
      totalPage: 0,
      totalList: [],
      curProvince: "",
      curProvinceName: "",
      currentCitys: [],
      qgTotalList: [],
      lnTotalList: [
        {
          name: "辽宁省",
          province: "2100",
          imgUrl: require("@/assets/images/ln-ln.png"),
        },
        {
          name: "铁岭市",
          province: "2112",
          imgUrl: require("@/assets/images/ln-tl.png"),
        },
        {
          name: "朝阳市",
          province: "2113",
          imgUrl: require("@/assets/images/ln-cy.png"),
        },
        {
          name: "阜新市",
          province: "2109",
          imgUrl: require("@/assets/images/ln-fx.png"),
        },
        // {
        //   name: "凌源市",
        //   province: "211382",
        //   imgUrl: require("@/assets/images/ln-ly.png"),
        // },
      ],
      fjTotalList: [
        {
          name: "福州市",
          province: "3501",
          imgUrl: require("@/assets/images/fj-fz.png"),
        },
        {
          name: "厦门市",
          province: "3502",
          imgUrl: require("@/assets/images/fj-xm.png"),
        },
        {
          name: "漳州市",
          province: "3506",
          imgUrl: require("@/assets/images/fj-zz.png"),
        },
        {
          name: "泉州市",
          province: "3505",
          imgUrl: require("@/assets/images/fj-qz.png"),
        },
        {
          name: "三明市",
          province: "3508",
          imgUrl: require("@/assets/images/fj-sm.png"),
        },
        {
          name: "莆田市",
          province: "3504",
          imgUrl: require("@/assets/images/fj-pt.png"),
        },
        {
          name: "南平市",
          province: "3509",
          imgUrl: require("@/assets/images/fj-np.png"),
        },
        {
          name: "龙岩市",
          province: "3507",
          imgUrl: require("@/assets/images/fj-ly.png"),
        },
        {
          name: "宁德市",
          province: "3503",
          imgUrl: require("@/assets/images/fj-nd.png"),
        },
        {
          name: "平潭综合实验区",
          province: "350128",
          imgUrl: require("@/assets/images/fj-pingtan.png"),
        },
      ],
    };
  },
  mounted() {
    this.type = getQueryVariable("type");
    // this.type = this.$route.query.type
    this.findAllList();
  },
  methods: {
    findAllList() {
      get(
        "http://43.243.130.162:81/ems/base/AreaConstruction/findAllList/12/"
      ).then((res) => {
        if (res.success) {
          console.log(JSON.parse(HeroJS.decrypt(res.result)));
          let result = JSON.parse(HeroJS.decrypt(res.result));
          this.qgTotalList = result;
          if (this.type == "fj") {
            this.setList(this.fjTotalList);
          } else if (this.type == "ln") {
            this.setList(this.lnTotalList);
          } else {
            this.setList(this.qgTotalList);
          }
        }
      });
    },
    goHome() {
      window.location.href = "../" + sessionStorage.getItem("env");
      // this.$router.replace('/')
    },
    searchBussiness(val) {
      if (!val) {
        this.opMessageTxt1 = "请输入关键字";
        this.opMessageShow1 = true;
        return;
      }
      if(this.type == 'ks'){
        // 跨省逻辑
        let filterList = []
        if(this.curProvince){
          filterList = this.currentCitys.filter(function (item) {
            return item.name.indexOf(val) != -1 ;
          });
        }else {
          filterList = this.qgTotalList.filter(function (item) {
            return item.name.indexOf(val) != -1 ;
          });
        }

        console.log(filterList)
        if(filterList.length == 0) {
          this.opMessageShow1 = true
          this.opMessageTxt1 = "查无结果，请搜索其他关键字"
        }else {
          this.setList(filterList)
        }
      }
      if(this.type == 'fj'){
        // 福建省内逻辑
        let filterList = this.fjTotalList.filter(function (item) {
          return item.name.indexOf(val) != -1 ;
        });
        console.log(filterList)
        if(filterList.length == 0) {
          this.opMessageShow1 = true
          this.opMessageTxt1 = "查无结果，请搜索其他关键字"
        }else {
          this.setList(filterList)
        }
      }

      if(this.type == 'ln'){
        // 辽宁省内逻辑
        let filterList = this.lnTotalList.filter(function (item) {
          return item.name.indexOf(val) != -1 ;
        });
        console.log(filterList)
        if(filterList.length == 0) {
          this.opMessageShow1 = true
          this.opMessageTxt1 = "查无结果，请搜索其他关键字"
        }else {
          this.setList(filterList)
        }
      }
      return
      window.location.href = "../sResult.html?searval=" + encodeURI(val);
      // this.$router.push({name:'sResult',query:{searval:val}})
    },
    pageChange(list) {
      this.list = list;
    },
    clearProvince() {
      this.curProvince = "";
      this.curProvinceName = "";
      this.currentCitys = []
      this.setList(this.qgTotalList);
    },
    clearCity() {
      if(this.type == 'fj') {
        this.setList(this.fjTotalList);
      }
      if(this.type == 'ln') {
        this.setList(this.lnTotalList);
      }
    },
    setList(list, item) {
      if (item) {
        this.curProvince = item.province;
        this.curProvinceName = item.name;
      }
      this.page = 1;
      this.totalList = list;
      this.list = this.totalList.slice(0, this.pageSize);
      this.totalPage = Math.ceil(this.totalList.length / this.pageSize);
    },
    getArea(item) {
      if (item.areaConstructionList && item.areaConstructionList.length > 0) {
        this.currentCitys = item.areaConstructionList
        this.setList(item.areaConstructionList, item);
      } else {
        console.log(item)
        let fwzCode = sessionStorage.getItem("fwzCode")
        let mac = sessionStorage.getItem("mac")
        switch (item.province) {
          case "3501":
          case "350128":
          case "3502":
          case "3503":
          case "3504":
          case "3505":
          case "3506":
          case "3507":
          case "3508":
          case "3509":
          case "211382":
            sessionStorage.setItem("areaCode", item.province);
            window.location.href = "../" + sessionStorage.getItem("env");
            // this.$router.replace('/')
            break;
          case "2100":
            sessionStorage.setItem("areaCode", "");
            sessionStorage.setItem("env", "");
            setTimeout(() => {
            window.location.href = `http://221.180.205.79:8034/formalHomes.html?fwzCode=${fwzCode}&mac=${mac}`;
            }, 300);
            break;
          case "2112":
            sessionStorage.setItem("areaCode", "");
            sessionStorage.setItem("env", "");
            setTimeout(() => {
            window.location.href = `http://60.18.233.232:8037/tlHomes.html?fwzCode=${fwzCode}&mac=${mac}`;
            }, 300);
            break;
          case "2113":
            this.opMessageTxt1 = "建设中，敬请期待";
            this.opMessageShow1 = true;
            break;
          case "2109":
            this.opMessageTxt1 = "建设中，敬请期待";
            this.opMessageShow1 = true;
            break;
          case "420000":
            this.opMessageTxt1 = "系统升级维护中";
            this.opMessageShow1 = true;
            break;
          case "230000":
            this.opMessageTxt1 = "系统升级维护中";
            this.opMessageShow1 = true;
            break;
          default:
            window.location.href = item.linkUrl;
            break;
        }
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
