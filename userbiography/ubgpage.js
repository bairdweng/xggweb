/**
 * Created by baird on 2016/11/9.
 */
var Uid = getQueryString("uid");
console.log(Uid);
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

