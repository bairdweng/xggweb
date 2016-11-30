/**
 * Created by baird on 2016/11/23.
 */


/*添加事件*/
$("#subbtn").on('click',function (){
   var input = $("#account").val();
   if (input == 'xgg'){
       $.toast('操作成功，正在跳转...', 2345, 'success top');
       window.location.href='/xggweb/pages/newarticle.html';
   }
   else if(input.length == 0){
       $.toast("请输入作者id");
   }
   else{
        $.toast("作者id错误");
   }
});

/*添加文本*/
$("#addtext").on('click',function () {
    var html = '<div class="list-block"><ul><div class="item-content"><div class="item-inner"><div class="item-input"><textarea></textarea></div></div></div></ul></div>';
    $("#myinput").before(html);
});
/*添加图片*/
$("#addpic").change(function (){
    var $file = $(this);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var pic_id = "preview2";
    var html_pic = '<div class="content-block">'+'<div class="card-content"><img class="card-cover" id="'+pic_id +'"'+ 'width="100%"></div></div>';
    if(fileObj && fileObj.files && fileObj.files[0]){
        $("#myinput").before(html_pic);
        var $img = $("#"+pic_id);
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
    }
})









