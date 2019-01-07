layui.use(['table', 'layer', 'form', "laytpl"], function () {
    init();

    //所有方法初始化
    function init() {
        initBlog();
    }

    //查询博客
    function initBlog() {
        var index = location.href.lastIndexOf("/");
        var str = location.href.substring(index + 1, location.href.length);
        $.post("../backstage/blog/load", {"_id": str}, function (json) {
            if (json.msg != "error" && json.data != undefined && json.data.length > 0) {
                var data = json.data[0];
                var categoryStr = "";
                for (var i in data.category) {
                    categoryStr += '<span style="margin: 2px;"><a style="color: #ff4777;padding: 3px;text-decoration:underline;">' + JSON.parse(data.category[i]).name + '</a></span>'
                }
                var labelStr = "";
                for (var i in data.labels) {
                    labelStr += '<span style="margin: 2px;"><a style="color: #ff4777;padding: 3px;text-decoration:underline;">' + JSON.parse(data.labels[i]).name + '</a></span>'
                }
                var innerHtml = "<div style='margin-left: 10px;' class='contentDiv'>" +
                    "<h1 style='text-align: center'>" + data.title + "</h1>" +
                    "<p></p>" +
                    data.content +
                    "<p>" +
                    "分类:" + categoryStr +
                    "标签:" + labelStr +
                    "时间:" + Utils.formatTime(parseInt(data.time)) +
                    "</p>" +
                    "</div>";
                $("#s_right_Blog_main").append(innerHtml);
            }
        })
    }
});
