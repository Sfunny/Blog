layui.use(['table', 'layer', 'form', "laytpl"], function () {
    init();
    //所有方法初始化
    function init() {
        initMenu();
        initBlog();
    }

    //控制菜单显示
    $("#showDD").on("click", function () {
        var dt = $("#showDD");
        var i = $(dt).children('i');
        if ($(i).attr("class").indexOf("fa-toggle-off") != -1) {
            $(i).removeClass("fa-toggle-off");
            $(i).addClass("fa-toggle-on");
            $(dt).nextAll().css("display", "inline-block");
            urlJump();
        } else {
            $(i).removeClass("fa-toggle-on");
            $(i).addClass("fa-toggle-off");
            $(dt).nextAll().css("display", "none");
        }
    });
    //查询博客
    function initBlog() {
        $.post("backstage/getAllBlog", {}, function (json) {
            if (json.msg != "error" && json.data != undefined && json.data.length > 0) {
                for (var i in json.data) {
                }
            }
        })
    }

    //展现菜单
    function initMenu() {
        $.post("backstage/getAllMenu", {}, function (json) {
            if (json.msg != "error" && json.data != undefined && json.data.length > 0) {
                for (var i in json.data) {
                    var item = json.data[i];
                    var dd = $("<dd></dd>");
                    dd.attr("url", item.url);
                    dd.attr("class", 'Jump')
                    dd.text(item.name);
                    $("#menu").append(dd);
                }
            }
        })
    }

    //菜单点击对应时间
    function urlJump() {
        $(".Jump").each(function (i, el) {
            $(el).on("click", function () {
                var url = $(el).attr("url");
                $("#content").attr("src", url);

            })
        });
    }
});
