<template>
  <div class="ez-footer">
    <div class="ez-footer-con flex-col-row-between">
      <div class="ez-footer-left">
        <!-- <span>XZ j102336</span>
		  	<span>|</span> -->
        <span>{{ nowDate }}</span>
        <span>{{ nowTime }}</span>
        <span>{{ nowDay }}</span>
      </div>
      <span>各具体业务咨询电话可点击进入各业务模块中查询</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowDate: "",
      nowTime: "",
      nowDay: "",
    };
  },
  mounted() {
    this.dateFormate();
    this.timeFormate();
    this.dayFormate();
    setInterval(this.timeFormate, 1000);
  },
  methods: {
    dateFormate() {
      let year = new Date().getFullYear();
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let date =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      this.nowDate = year + "年" + month + "月" + date + "日";
    },
    timeFormate() {
      let hh =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      let mm =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      this.nowTime = hh + ":" + mm + ":" + ss;
    },
    dayFormate() {
      let day = new Date().getDay();
      let dayWeek = ["一", "二", "三", "四", "五", "六", "日"];
      this.nowDay = "星期" + dayWeek[day - 1];
    },
  },
};
</script>

<style>
</style>
