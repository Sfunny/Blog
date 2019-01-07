var Utils = {
    formatTime: function (time) {
        var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '/';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
}
var MyAjax = {
    ajax: function (Method, url, data, fun, asyn) {
        var xhr = new XMLHttpRequest();
        if (Method == 'get') {
            url += MyAjax.HandleData(data);
            xhr.open(Method, url, asyn);
        } else {
            xhr.open(Method, url, asyn);
        }
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fun.call(this, xhr.responseText);
            }
        };
        if (Method == 'get') {
            xhr.send();
        } else {
            console.log(data);
            xhr.send(JSON.stringify(data));
        }
    }, HandleData: function (data) {
        var str = "?";
        for (var i in data) {
            str += i + "=" + data[i] + "&";
        }
        var lastIndex = str.lastIndexOf("&");
        if (lastIndex == str.length - 1) {
            str = str.substring(0, lastIndex);
        }
        return str;
    }
}
