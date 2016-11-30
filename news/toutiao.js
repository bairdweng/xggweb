/**
 * Created by baird on 2016/11/9.
 */
$.showIndicator()
$.get("/xgg/news",function(response){
    var data = response['result']['data'];
    // console.log(data);
    $.hideIndicator()
    for (var i=0;i<data.length;i++){
        /*这里可以看到数组的每个对象*/
        var dataDic = data[i];
        /*把新闻的标题取出*/
        var newsTitle = dataDic['title'];
        var thumbnail_pic_s = dataDic['thumbnail_pic_s'];
        var newsurl = dataDic['url'];
        var html =
            '<div class="content-block-title">' + newsTitle + '</div>' +
            '<div class="card demo-card-header-pic">' +
            '<div valign="bottom" class="card-header color-white no-border no-padding">' +
            '<img class="card-cover" obj='+ '"' + newsurl + '"' + ' src=' + thumbnail_pic_s + '>'+
            '</div>' +
            '</div>';
        $("#mylist").append(html);
    }
});
/*给卡片添加事件*/
$(document).on('click', '.card-cover', function (){
    //获取元素
    var thiss = $(this);
    var obj = thiss.attr('obj');
    var xggserver = 'server::'+obj;
    window.location.href=xggserver;
});
$.init();




