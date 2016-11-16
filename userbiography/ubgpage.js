/**
 * Created by baird on 2016/11/9.
 */
var uid = getQueryString("uid");
$.post("http://123.207.47.17/xgg/getdetailedinfo",{
        uid:uid
     },
    function(data){
        var baseinfo = data['baseinfo'];
        var name = baseinfo['firstname']+baseinfo['lastname'];
        if(!name){
            name = '匿名';
        }
        var livecity = baseinfo['livecity'];
        if(!livecity){
            livecity = '未知现居住地';
        }
        else {
            livecity = "现住地：" + livecity;
        }
        var html1 =
        '<div class="card-content">'+
        '<div class="list-block media-list">'+'' +
        '<ul>'+
        '<li class="item-content">'+
        '<div class="item-media">' +
        '<img  class="userface" src= ' + ' "http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"> '+
        '</div>'+
        '<div class="item-inner">'+
        '<div class="item-title-row">'+
        '<div class="item-title">'+ name +'</div>'+
        '</div>'+
        '<div class="item-subtitle">'+ livecity +'</div>'+
        '</div>'+'' +
        '</li>'+'' +
        '</ul>'+'' +
        '</div>'+'' +
        '</div>';
        $("#baseheader").append(html1);

        var birthday = baseinfo['birthday'];
        var hometown = baseinfo['hometown'];
        var mobile = baseinfo['mobile'];
        var wexin = baseinfo['wexin'];
        var professional = baseinfo['professional'];
        var introduction = baseinfo['introduction'];
        var html2='';
        if (birthday){
            html2 = html2 +'<div class="card-content-inner">'+'<p class="xggcontent">'+'生日：'+birthday+'</p>'+'</div>';
        }
        if (hometown){
            html2 = html2 +'<div class="card-content-inner">'+'祖籍：'+hometown+'</div>';
        }
        if (mobile){
            html2 = html2 +'<div class="card-content-inner">'+'电话：'+mobile+'</div>';
        }
        if (wexin){
            html2 = html2 +'<div class="card-content-inner">'+'微信：'+wexin+'</div>';
        }
        if (professional){
            html2 = html2 +'<div class="card-content-inner">'+'职业：'+professional+'</div>';
        }
        if(introduction){
            html2 = html2 +'<div class="card-content-inner">'+'简介：'+introduction+'</div>';
        }
        $("#basecontent").append(html2);
     });
/*获取故事列表*/
$.post("http://123.207.47.17/xgg/getthestory",{
        uid:uid
    },
    function(data){
        var list = data['list'];
        for(var i = 0;i<list.length;i++){
            var Obj = list[i];
            var content = Obj['content'];
            var time = getLocalTime(Obj['mtime']);
            var name = Obj['basieinfo']['firstname']+Obj['basieinfo']['lastname'];
            var html =
                '<div class="card">'+
                '<div class="card-content">'+
                '<div class="card-content-inner">'+'<p class="xgg-content">'+content+'</p>'+'</div>'+
                '<div class="card-footer">'+
                '<p class="xgg-litle-title">'+time+'</p>'+
                '<p class="xgg-litle-title">'+ name +'</p>'+
                '</div>'+
                '</div>';
            $("#stlist").append(html);
        }
    });
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

