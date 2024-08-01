import {ipConfig} from "./configure"
export function getUrl(toPath) {
    var url = window.location.href;
    var prot = window.location.protocol;
    var origin = ipConfig;
    var localhost = "";
    if(url && url !== ""){
        localhost = origin + toPath;
    }
    return localhost;
}
