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
        $.showPreloader('发布中')
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
    if (images.length==0){
        setTimeout(func,"1000");//三秒后执行
        function func(){
            $.hidePreloader();
            $.toast("发布成功");
        }
        setTimeout(func2,"1000");
        function func2(){
            location.reload();
        }
    }
    else{
        var uploadURL = "http://xggserve.com/xgg/uploadpicofart";
        var up_index = 0;
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
                $.post(uploadURL,{
                        uid:"3",
                        articleid:a_id,
                        index:index,
                        img:this.result
                    },
                    function(){
                        up_index++;
                        if (up_index == images.length){
                            $.hidePreloader();
                            $.toast("发布成功");
                            location.reload();
                        }
                    });
                // compressImg(this.result,1024,function (imgData){
                //
                // });
            };
        }
    }
}
function compressImg(imgData,maxHeight,onCompress){
    if(!imgData)return;
    onCompress = onCompress || function(){};
    // maxHeight = maxHeight || 1024;//默认最大高度200px
    var canvas = document.createElement('canvas');
    var img = new Image();
    img.onload = function(){
        if(img.height > maxHeight) {//按最大高度等比缩放
            img.width *= maxHeight / img.height;

            img.height = maxHeight;
        }
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
        //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
        console.log("wide",img.width,"height",img.height);
        onCompress(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
    }
    img.src = imgData;
};








