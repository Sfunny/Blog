layui.config({}).extend({
    formSelects: '{/}../layui/dist/formSelects-v4',
});
layui.use(['table', 'layer', 'form', "laytpl", 'formSelects', 'layedit', 'upload'], function () {
    var table = layui.table;
    var layer = layui.layer;
    $("#showDD").on("click", function () {
        var dt = $("#showDD");
        var i = $(dt).children('i');
        if ($(i).attr("class").indexOf("fa-toggle-off") != -1) {
            $(i).removeClass("fa-toggle-off");
            $(i).addClass("fa-toggle-on");
            $(dt).nextAll().css("display", "inline-block");
        } else {
            $(i).removeClass("fa-toggle-on");
            $(i).addClass("fa-toggle-off");
            $(dt).nextAll().css("display", "none");
        }
    });
    table.render({
        elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
        , height: 315 //容器高度
        , toolbar: "#toolbar"
        , defaultToolbar: []
        , id: "tableList"
        , url: "blog/load"
        , height: 'full'
        , cols: [
            [
                {type: 'checkbox', title: '序号'},
                {type: 'numbers', title: '序号'},
                {field: 'name', title: 'Blog'},
                {field: '', title: '创建人'},
                {field: '', title: '创建时间'},
                {field: '', title: '修改时间'},
                {field: '', title: '操作', toolbar: "#titleTpl"}
            ]
        ] //设置表头
        , done: function (res, curr, count) {
            var data = res.data;
            if (res.msg == "error") {
                layer.alert('查询失败', {
                    icon: 2,
                    title: "Blog"
                })
            }
        }
    });
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        var data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'add':
              var index= layer.open({
                    type: 2,
                    title: "添加",
                    id: 'addOpen',
                    content: "/backstage/blog/addBlog",
                    maxmin: true,
                    // btn: ["确定", "取消"],
                    btn1: function () {
                        // var name = $("#addOpen #Name").val();
                        // var lables = formSelects.value('xmLable');
                        // var categorys = formSelects.value('xmCategory');
                        // var content = layedit.getContent(contents);
                        // $.post("", {
                        //     name, lables, categorys, content
                        // })
                    },
                    btn2: function () {
                        layer.closeAll();
                    }
                });
                layer.full(index);
                break;
            case 'del':
                if (data.length <= 0) {
                    layer.alert("至少选择一条数据");
                    return;
                }
                layer.confirm('确定删除这' + data.length + "条数据吗？", function (index) {
                    var params = [];
                    data.forEach(function (v, i) {
                        if (v._id) {
                            params.push(v._id)
                        }
                    });
                    $.post("category/delete", {params}, function (Json) {
                        if (Json != "error") {
                            layer.closeAll();
                            layer.alert('删除成功', {
                                icon: 1,
                                title: "Blog"
                            })
                            table.reload('tableList', {});
                        } else {
                            layer.alert('删除失败', {
                                icon: 2,
                                title: "Blog"
                            })
                        }
                    })
                });
                break;
            case 'find':
                var name = $(".layui-table-tool #labelName").val();
                table.reload('tableList', {
                    where: { //设定异步数据接口的额外参数，任意设
                        need: {
                            name: name
                        }
                    }
                });
                $(".layui-table-tool #labelName").val(name);
                break;
        }
    });
    //监听工具条
    table.on('tool(test)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if (layEvent === 'del') { //删除
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') { //编辑
            layer.open({
                type: 1,
                title: "编辑",
                id: 'editOpen',
                area: ['300px', '164px'],
                content: $("#addLabel").html(),
                btn: ["确定", "取消"],
                btn1: function () {
                    var name = $("#editOpen #Name").val();
                    $.post("category/edit", {_id: data._id, name}, function (Json) {
                        if (Json != "error") {
                            layer.closeAll();
                            layer.alert('编辑成功', {
                                icon: 1,
                                title: "Blog"
                            })
                            table.reload('tableList', {});
                        } else {
                            layer.alert('编辑失败', {
                                icon: 2,
                                title: "Blog"
                            })
                        }
                    })
                },
                btn2: function () {
                    layer.closeAll();
                }
            })
        }
    });
});
