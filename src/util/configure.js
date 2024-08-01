
var ipConfigs = window.location.origin;
//判断orgin是否为undefined,如果是undefined则进行拼接
if (typeof (ipConfigs) == "undefined") {
    ipConfigs = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
};
export const  ipConfig = ipConfigs

// export const ipConfig="http://36.101.208.87:8705"; //测试外网
export const porjectName="/zwzzj";//测试外网

