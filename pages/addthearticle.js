/**
 * Created by baird on 2016/11/23.
 */

var index = -1;
var images = new Array();
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
        var files = fileObj.files[0];
        var obj = {"index":index,"imgObj":files};
        images.push(obj);
        dataURL = windowURL.createObjectURL(files);
        $img.attr('src',dataURL);
    }
})

/*发布*/
$("#addrelease").on('click',function (){
    var mycontent =  $("#mycontent").children();
    if (mycontent.length==0){
        $.toast("请添加内容");
    }
    else{
        //添加文字
       var uploadtextofart = "http://xggserve.com/xgg/uploadtextofart";
       var texts = new Array();
       for(var i = 0;i<mycontent.length;i++){
           var listid = "#"+(i);
           var obj = $(listid);
           var classname = obj.attr("class");
           //获取文字内容。
           if (classname!="card-cover"){
               var index = i;
               var value = obj.val();
               var obj = {"index":i,"text":value};
               texts.push(obj);
           }
       }
        var json_texts = JSON.stringify(texts);
            $.post(uploadtextofart,{
                    uid:"3",
                    title:"测试啦",
                    content:json_texts
                },
                function(data){
                    var result = data['result'];
                    if (result == "1"){
                        var articleid = data['articleid'];
                        upimage(articleid);
                    }
                    else{
                        var error = data['error'];
                        $.toast(error);
                    }
                });
    }
})
/*上传图片*/
function upimage(a_id){
    var uploadURL = "http://xggserve.com/xgg/uploadpicofart";
    for(var i = 0;i<images.length;i++){
        //获取图片对象。
        var obj = images[i];
        //图片对象
        var imgObj = obj["imgObj"];
        //图片索引。排序。
        var index = obj["index"];
        var reader = new FileReader();
        reader.readAsDataURL(imgObj);
        reader.onload = function (){
            var imgData = this.result; //base64数据
            $.post(uploadURL,{
                    uid:"3",
                    articleid:a_id,
                    index:index,
                    img:imgData
                },
                function(data){
                    console.log(data);
                });
        };
    }
}









