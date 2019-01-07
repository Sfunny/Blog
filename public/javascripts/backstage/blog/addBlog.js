layui.config({}).extend({
    formSelects: '{/}../../layui/dist/formSelects-v4',
    layeditNew: '{/}../../layui/dist/layeditNew',
});
layui.use(['table', 'layer', 'form', "laytpl", 'formSelects', 'layeditNew', 'upload'], function () {
    var layer = layui.layer;
    var formSelects = layui.formSelects;
    var upload = layui.upload;
    var layeditNew = layui.layeditNew;
    layeditNew.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: '../image/uploadImg',
            accept: 'image',
            acceptMime: 'image/*'
            , done: function (res, index, upload) {
                console.log(res);
            }
        }
        , uploadVideo: {
            url: '/Attachment/LayUploadFile',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: '20480'
        }
        //右键删除图片/视频时的回调参数，post到后台删除服务器文件等操作，
        //传递参数：
        //图片： imgpath --图片路径
        //视频： filepath --视频路径 imgpath --封面路径
        , calldel: {
            url: '/Attachment/DeleteFile'
        }
        //开发者模式 --默认为false
        , devmode: true
        //插入代码设置
        , codeConfig: {
            hide: true,  //是否显示编码语言选择框
            default: 'javascript' //hide为true时的默认语言格式
        }
        , tool: [
            'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|', 'fontFomatt', 'colorpicker', 'face'
            , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt', 'video', 'anchors'
            , '|', 'table', 'fullScreen'
        ]
    })
    var contents = layeditNew.build('layeditDemo'); //建立编辑器
    init();

    function init() {
        $.get("../label/load", function (json) {
            var data = json.data;
            var arr = [];
            for (var i in data) {
                arr.push({
                    name: data[i].name,
                    value: data[i]._id
                })
            }
            formSelects.data('xmLabel', 'local', {
                arr: arr
            });
        });
        $.get("../category/load", function (json) {
            var data = json.data;
            var arr = [];
            for (var i in data) {
                arr.push({
                    name: data[i].name,
                    value: data[i]._id
                })
            }
            formSelects.data('xmCategory', 'local', {
                arr: arr
            });
        });
    }

    upload.render({
        elem: '#uploadImg'
        , url: '../image/uploadImg'
        , done: function (res) {
            $("#uploadImg").remove();
            var img = $("<img src='../.." + res.data.src + "' id='uploadImg' />")
            $("#imgs").append(img);
        }
    });
    $("#yes").on("click", function () {
        var name = $("#Name").val();

        var content = layeditNew.getContent(contents);
        var imgSrc = $("#uploadImg").attr("src");
        var temp = formSelects.value('xmCategory');
        var categorys = [];
        for (var i in temp) {
            categorys.push(JSON.stringify({
                name: temp[i].name,
                value: temp[i].value,
            }))
        }
        temp = formSelects.value('xmLabel');
        var labels = [];
        for (var i in temp) {
            labels.push(JSON.stringify({
                name: temp[i].name,
                value: temp[i].value,
            }))
        }
        var data = {
            "name": name, "labels": labels, "category": categorys, "content": content, "imgSrc": imgSrc
        }
        $.post("save", data, function (json) {

        })
    });
});
