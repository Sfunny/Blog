layui.use(['table', 'layer', 'form', "laytpl"], function () {
    init();

    //所有方法初始化
    function init() {
        initBlog();

    }

    //查询博客
    function initBlog() {
        $.post("backstage/getAllBlog", {}, function (json) {
            if (json.msg != "error" && json.data != undefined && json.data.length > 0) {
                for (var i in json.data) {
                    var item = json.data[i];
                    var labels = json.data[i].labels;
                    var category = json.data[i].category;
                    var str = "";
                    for (var i in category) {
                        str += '<span style="margin: 2px;"><a style="color: #ff4777;padding: 3px;text-decoration:underline;">' + JSON.parse(category[i]).name + '</a></span>'
                    }
                    var innerHtml = '<div style="width: 100%;max-height:196px;border: 1px solid transparent;margin-top: 10px;background-color: #ebf6f7;"><div  class="layui-card blogs" id="' + item._id + '" style="max-height:185px;width: 90%;margin: 5px;float: left;border-radius: 5px">' +
                        '<div class="layui-card-header"><img style="width: 24px;height: 24px;border-radius: 50%" src="' + item.img + '" />&nbsp;&nbsp;&nbsp;&nbsp;' + item.title + '</div>' +
                        '<div class="layui-card-body" style="overflow: hidden;max-height: 100px;">' +
                        item.content +
                        '</div>' +
                        '</div><div style="width: 8%;float: left;margin: 5px;">' +
                        '<div style="margin: 3px">' + str + '</div><div style="margin: 3px;color: #e4c6d0;">' + Utils.formatTime(parseInt(item.time)) + '</div><div style="margin: 3px">预览|</div><div style="margin: 3px">评论</div></div>' +
                        '<div style="clear: both"></div>' +
                        '</div> '
                    $("#s_right_body_main").append(innerHtml);
                }
                blogOnClick();
            }
        })
    }

    function blogOnClick() {
        $(".blogs").each(function (i, el) {
            $(el).on("click", function () {
                var id = $(el).attr("id");
                window.location.href = "/loadBlodById/"+id;
            });
        });
    }
});
