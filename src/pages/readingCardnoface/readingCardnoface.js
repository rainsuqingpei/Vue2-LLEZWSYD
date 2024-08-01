import Vue from "vue";
import readingCardnoface from "./readingCardnoface.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import $ from "jquery";
import sessionStorageHandler from "../../util/sessionStorageHandler"; // sessionStorage管理类
import localStorageHandler from "../../util/localStorageHandler"; // localStorage管理类
import "babel-polyfill";



Vue.prototype.$ = $;
Vue.prototype.SSH = sessionStorageHandler; // 挂载一个sessionStorage的操作类到Vue
Vue.prototype.LSH = localStorageHandler; // 挂载一个localStorage的操作类到Vue
Vue.use(ElementUI);

// 自定义工具类
import utils from '@/util/utils'
Vue.prototype.utils = utils;

new Vue({
    el: "#readingCardnoface",
    components: {
        readingCardnoface: readingCardnoface
    },
    template: "<readingCardnoface />"
});