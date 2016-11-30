/**
 * Created by baird on 2016/11/23.
 */

var index = 0;
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
$("#addtext").on('click',function (){
    index = index+1;
    var text_id = index;
    var html = '<div class="list-block"><ul><div class="item-content"><div class="item-inner"><div class="item-input"><textarea id=' + '"'+text_id+ '">' + '</textarea></div></div></div></ul></div>';
    $("#mycontent").append(html);
});
/*添加图片*/
$("#addpic").change(function (){
    var $file = $(this);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    index = index+1;
    var pic_id = index;
    var html_pic = '<div class="content-block">'+'<div class="card-content"><img class="card-cover" id="'+pic_id +'"'+ 'width="100%"></div></div>';
    if(fileObj && fileObj.files && fileObj.files[0]){
        $("#mycontent").append(html_pic);
        var $img = $("#"+pic_id);
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.attr('src',dataURL);
    }
})

/*addrelease*/
$("#addrelease").on('click',function (){
    var mycontent =  $("#mycontent").children();
    if (mycontent.length==0){
        $.toast("请添加内容");
    }
    else{
       for(var i = 0;i<mycontent.length;i++){
           var listid = "#"+(i+1);
           var obj = $(listid);
           var classname = obj.attr("class");
           //图片
           if (classname=="card-cover"){
               var src = obj.attr("src");
               // console.log(src);
               $.ajax({
                   type: "POST",
                   url: "http://123.207.47.17/xgg/updatetheavatar",
                   enctype: 'multipart/form-data',
                   data: {
                       img:src,
                       "img":src,
                       "token":"D82377E8-7F4E-929F-7AD5-858EDE572814",
                       "usertoken":"9f91c90dc803f9c668b3c521de9399d1"
                   },
                   success: function (result) {

                       console.log(result);
                       // alert("Data Uploaded: ");
                   },
                   error:function (error) {
                       // alert(error);
                   }
               });
           }
           //文字
           else {

           }
       }
    }
})









