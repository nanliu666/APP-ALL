

<div class="myqr">

    <div id="wrapper">
        <div id="qrcode"></div>
    </div>

</div>
<div id="imgBox">

</div>
<script type="text/javascript">
        var width = $(".container").width();
        var Dwidth = document.body.clientWidth;
        var padding = '';
        if(width<=320){
            padding = 0;
        }else if(width>320 && width<=640){
            padding = 0;
        }else if(width>640 && width<=1200){
            padding = 400;
        }
        if(Dwidth>768 && Dwidth<=1280){
            $("#qrcode").css('margin-left','11.6%');
            $("#qrcode").css('margin-top','28%');
        } else if(Dwidth>1280 && Dwidth<=1366){
            $("#qrcode").css('margin-left','13.6%');
            $("#qrcode").css('margin-top','32%');
        } else if(Dwidth>1366 && Dwidth<=1680){
            $("#qrcode").css('margin-left','11.6%');
            $("#qrcode").css('margin-top','28%');
        } else if(Dwidth>1680 && Dwidth<=1920){
            $("#qrcode").css('margin-left','9.4%');
            $("#qrcode").css('margin-top','22.2%');
        }
        $("#wrapper").height($('html,body').height() + padding + 'px');
        var codeWidth =width/3.1,codeHeight = width/3.1;
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : codeWidth,
            height : codeHeight
        });

        function makeCode () {
            var elText = <?=$qrcodeString;?>;
            qrcode.makeCode(elText);
        }
        makeCode();


        var w = $("#wrapper").width();
        var h = $("#wrapper").height();

        // 要将 canvas 的宽高设置成容器宽高的 2 倍
        var canvas = document.createElement("canvas");
        canvas.width = w * 2;
        canvas.height = h * 2;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        var context = canvas.getContext("2d");
        //然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2,2);
        var str = $('#wrapper');
        html2canvas([str.get(0)], {
            onrendered: function (canvas) {
                var image = canvas.toDataURL("image/jpg");
                var pHtml = "<img src="+image+" />";
                $('#imgBox').html(pHtml);
                $('#wrapper').hide();
            }
        });


 
</script>
<?php 
//$this->registerJs($this->blocks['js_service'],\yii\web\View::POS_LOAD);
?>

<style>

    html,body,.myqr{
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    #wrapper{
        background-image: url('../image/qrbgmap.jpg');
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
        height: 100%;
        width: 100%;
    }
    #qrcode{
        position: fixed;
        z-index: 100;
        margin-left: 14.5%;
        margin-top: 34.5%;
    }
    #imgBox{
        /*position: absolute;*/
        /*z-index: 1;*/
        /*top: 0;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*overflow-x: hidden;*/
    }
</style>
