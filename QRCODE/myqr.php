<?php

/* @var $this yii\web\View */
/* @var $model \agency\models\AppAgencyInfo */

$this->title = '我的二维码';
$this->registerJsFile('../js/qrcode.min.js');
$this->registerJsFile('../js/html2canvas.js');
$redirect_uri=\Yii::$app->urlManager->createUrl(['site/scan']);
$qrcodeString = '"'.Yii::$app->request->hostInfo.$redirect_uri.'?invitationCode='.$model->code.'"';
?>
<div id="wrapper">
    <img class="IMG" src="../image/qrbgmap.jpg">
    <div id="qrcode"></div>
</div>
<div id="imgBox"></div>
<script type="text/javascript">
    <?php $this->beginBlock('js_service') ?>
    var makecode = function () {
        var width = $(".container").width();
        var codeWidth = width / 3,
            codeHeight = width / 3;
        $("#qrcode").empty()
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: <?=$qrcodeString;?>,
            width: codeWidth,
            height: codeHeight
        });
    }
    makecode()

    //防抖
    var resizeTimer = null;
    $(window).bind('resize', function () {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            makecode()
        }, 100);
    })

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
    context.scale(2, 2);
    var str = $('#wrapper')
    html2canvas([str.get(0)], {
        onrendered: function (canvas) {
            var image = canvas.toDataURL("image/jpg");
            var pHtml = "<img src=" + image + " />";
            $('#imgBox').html(pHtml);
            $('#wrapper').hide();
        }
    });

    <?php $this->endBlock(); ?>
</script>
<?php $this->registerJs($this->blocks['js_service'],\yii\web\View::POS_LOAD);?>

<style>
   #wrapper {
        position: relative;
        padding: 100% 0 0;
    }

    #wrapper>.IMG {
        z-index: -1;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    #qrcode {
        position: absolute;
        left: 15%;
        top: 37%;
        z-index: 1;
    }

</style>
