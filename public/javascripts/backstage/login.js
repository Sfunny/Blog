layui.use(['table', 'layer', 'form', "laytpl"], function () {
    var table = layui.table;
    var layer = layui.layer;
    var form = layui.form;
    var laytpl = layui.laytpl;
    $("#s_login").on("click", function () {
        var userName = $("#userName").val();
        var passWord = $("#passWord").val();
        $.post("admin/doLogin", {"userName": userName, "passWord": passWord}, function (Json) {
            location.replace("/backstage");
        })
    })
});
