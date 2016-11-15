/**
 * Created by baird on 2016/11/9.
 */
var uid = getQueryString("uid");
$.showIndicator()
$.post("http://123.207.47.17/xgg/getdetailedinfo",{
        uid:uid
     },
    function(data){
        $.hideIndicator()
        var baseinfo = data['baseinfo'];
        var name = baseinfo['firstname']+baseinfo['lastname'];
        if(!name){
            name = '匿名';
        }
        var livecity = baseinfo['livecity'];
        if(!livecity){
            livecity = '未知现居住地';
        }
        var html1 =
        '<div class="facebook-avatar">' +
        '<img src= ' + ' "http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" ' + ' width="34" height="34"> '+
        '</div>'+
        '<div class="facebook-name">'+ name +'</div>'+
        '<div class="facebook-date">'+ livecity +'</div>';
        $("#baseheader").append(html1);
        var birthday = baseinfo['birthday'];
        var hometown = baseinfo['hometown'];
        var mobile = baseinfo['mobile'];
        var wexin = baseinfo['wexin'];
        var professional = baseinfo['professional'];
        var introduction = baseinfo['introduction'];
        var html2='';
        if (birthday){
            html2 = html2 +'<div class="card-content-inner">'+'生日：'+birthday+'</div>';
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

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

