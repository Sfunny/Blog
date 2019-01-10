layui.use(['table', 'layer', 'laypage', 'form', "laytpl"], function () {
    var laypage = layui.laypage;
    init();

    //所有方法初始化
    function init() {
        initBlog();
        //执行一个laypage实例
        var localTest = layui.data('Blog');
        var data = localTest.BlogAll;
        var limit = 0
        var clientHeight = document.body.clientHeight;
        if (clientHeight == 768) {
            limit = 3
        } else if (clientHeight == 864) {
            limit = 4
        }else if(clientHeight => 960){
             limit = 5
        }
        laypage.render({
            elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
            , count: data.length //数据总数，从服务端得到
            , limit: limit //每页显示几条
            , data: data //数据
            , jump: function (obj) {
                $("#blog").empty();
                var curr = obj.curr;//当前页
                var limit = obj.limit;//每页显示几条
                var data_index = (curr - 1) * limit;//起始条下标
                var data_end = parseInt(data_index) + parseInt(limit);
                var data_list = [];
                for (var i = data_index; i < data_end; i++) {
                    if (data.length > i) {
                        data_list.push(data[i]);
                    }

                }
                for (var i in data_list) {
                    var item = data_list[i];
                    var labels = data_list[i].labels;
                    var category = data_list[i].category;
                    var str = "";
                    for (var i in category) {
                        str += '<span style="margin: 2px;"><a style="color: #ff4777;padding: 3px;text-decoration:underline;">' + JSON.parse(category[i]).name + '</a></span>'
                    }
                    var innerHtml = '<div id="blog_cent" class="blog_cent">' +
                        '<div  class="layui-card blogs" id="' + item._id + '" style="">' +
                        '<div class="layui-card-header">' +
                        '<img style="width: 24px;height: 24px;border-radius: 50%" src="' + item.img + '" />&nbsp;&nbsp;&nbsp;&nbsp;' + item.title + '</div>' +
                        '<div class="layui-card-body" style="overflow: hidden;max-height: 80px;">' + item.content +
                        '</div>' +
                        '</div><div class="tips" style="">' +
                        '<div style="margin: 3px">' + str + '</div><div style="margin: 3px;color: #e4c6d0;">' + Utils.formatTime(parseInt(item.time)) + '</div><div style="margin: 3px">预览|</div><div style="margin: 3px">评论</div></div>' +
                        '<div style="clear: both"></div>' +
                        '</div> '
                    $("#blog").append(innerHtml);
                }
                blogOnClick();
            }
        });
    }

    //查询博客
    function initBlog() {
        $.post("backstage/getAllBlog", {}, function (json) {
            layui.data('Blog', {
                key: 'BlogAll',
                value: json.data
            })
        })
    }

    function blogOnClick() {
        $(".blogs").each(function (i, el) {
            $(el).on("click", function () {
                var id = $(el).attr("id");
                window.location.href = "/loadBlodById/" + id;
            });
        });
    }
});
