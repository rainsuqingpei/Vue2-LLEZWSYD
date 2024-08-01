const utils = {
  //判空
  isEmpty: function(value) {
    if (
      value == "" ||
      value == "null" ||
      value == null ||
      typeof value == "undefined" ||
      JSON.stringify(value) == "{}"
    ) {
      return true;
    } else {
      return false;
    }
  },
  //截取地址栏参数
  getUrlParams: function () {
    var sHref = window.location.href;
    var args = sHref.split('?');
    if(args[0] == sHref){
        return "";
    }
    var arr = args[1].split('&');
    var obj = {};
    for(var i = 0;i< arr.length;i++){
        var arg = arr[i].split('=');
        obj[arg[0]] = arg[1];
    }
    return obj;
  },
  //获取唯一的id
  getUuid() {
      function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },
  //获取fwzCode
  readTextFwzCode: function () {
      var fwzCode = "";
      var f = null;
      try {
          var fso = new ActiveXObject("Scripting.FileSystemObject");
          f = fso.OpenTextFile("C:\\BMFWZClient\\config\\fwzCode.txt", 1, true);
          while (!f.AtEndOfStream) {
              fwzCode = f.ReadLine();
              return fwzCode;
          }
      } catch (e) {
          // alert("当前浏览器不支持或文件读取失败");
      } finally {
          if (f != null) {
              f.close();
          }
      }
  },
  //获取mac
  readTextMac: function () {
      var mac = "";
      var f = null;
      try {
          var fso = new ActiveXObject("Scripting.FileSystemObject");
          f = fso.OpenTextFile("C:\\BMFWZClient\\config\\mac.txt", 1, true);
          while (!f.AtEndOfStream) {
              mac = f.ReadLine();
              return mac;
          }
      } catch (e) {
          // alert("当前浏览器不支持或文件读取失败");
      } finally {
          if (f != null) {
              f.close();
          }
      }
  },

  nowTime() {
    //获取年月日
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var day = time.getDate();

    //获取时分秒
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();

    //检查是否小于10
    h = this.checkTime(h);
    m = this.checkTime(m);
    s = this.checkTime(s);
    let currentDate = year + "年" + month + "月" + day + "日";
    let currentTime = h + ":" + m + ":" + s;
    return {
      currentDate,
      currentTime
    };
  },

  getNowTime:function () {
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    this.milliSeconds = date.getMilliseconds();
    var currentTime = this.year + '-' + this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' + this.second + '.' + this.milliSeconds;
    return currentTime;
  },

  checkTime(i) {
    //方法一，用三元运算符
    var num;
    i < 10 ? (num = "0" + i) : (num = i);
    return num;
  },
   /**
     * 日期格式化
     *
     */
    dateFormat(date, fmt) {
      var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;

  },

  /**
   * 比较两个日期相差天数
   *
   */
  compareDate(date1, date2) {
      if (this.isEmpty(date1) || this.isEmpty(date2)) {
          return;
      }
      var dateSpan,
          iDays;
      date1 = Date.parse(date1);
      date2 = Date.parse(date2);
      dateSpan = date2 - date1;
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays
  },
  compareDateTime(startDate, endDate) {
    if (startDate.length > 0 && endDate.length > 0) {
       var startDateTemp = startDate.split(" ");
       var endDateTemp = endDate.split(" ");

       var arrStartDate = startDateTemp[0].split("-");
       var arrEndDate = endDateTemp[0].split("-");

       var arrStartTime = startDateTemp[1].split(":");
       var arrEndTime = endDateTemp[1].split(":");

      var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
      var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);

          if (allStartDate.getTime() >= allEndDate.getTime()) {
                  return false;
          } else {
              return true;
          }
      } else {
          console.log("时间不能为空");
          return false;
      }
   } ,
  compareTime(startTime,stopTime){
    var intStartTime=0;
    if(typeof startTime=='string' && startTime.constructor==String ){
    var  startTimeArray=startTime.split(":");
    if(startTimeArray.length ==3){
      intStartTime= startTimeArray[0] *3600+startTimeArray[1] *60+startTimeArray[2];
    }else{
        console.log("开始时间格式错误");
        return false;
    }
    }else{
      console.log("开始时间格式错误");
      return false;
    }

    var intStopTime =0;
    if(typeof stopTime=='string' && stopTime.constructor==String ){
      var  stopTimeArray=stopTime.split(":");
      if(stopTimeArray.length ==3){
        intStopTime =stopTimeArray[0] *3600+stopTimeArray[1] *60+stopTimeArray[2];
      }else{
        console.log("结束时间格式错误");
        return false;
      }

    }else{
      console.log("结束时间格式错误");
      return false;
    }

    if(intStopTime>intStartTime){
      return true;
    }else{
      return false;
    }
  },
  ages(str){
    if(!str){
      return
    }
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if(r==null)return   false;
    var   d=   new   Date(r[1],   r[3]-1,   r[4]);
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
    {
          var   Y   =   new   Date().getFullYear();
          // return ("年龄   =   "+   (Y-r[1])   +"   周岁");
          return ((Y-r[1]));
    }
    return("输入的日期格式错误！");
}

};
export default utils;
