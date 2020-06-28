let Tool = (function () {
    const myStudents = ["陈锴","曹亮","陈阳吉","张胜江","李寅峰","钟鑫茂","罗雷","杨烨","张芝荣","贺华","郭建军","林忠","汪印星","王炜邦","潘俊桦","钟顺","徐阳","张益兴","夏琪琦","杨文龙","王毅家长","肖巍","杨恩","赵新宇"];
    const PI = Math.PI;
    const ZERO = 0;
    ;

    function random(start, end) {
        if (arguments.length === ZERO) {
            return ZERO;
        } else if (arguments.length === 1) {
            end = start;
            start = ZERO;
        } else {
            if (end < start) {
                [start, end] = [end, start]
            }
        }
        return parseInt(Math.random() * (end - start)) + start;
    }

    function f67(){
        return myStudents[random(0,myStudents.length-1)];
    }
    function color(opcity = 1) {
        return `rgba(${random(ZERO, 255)},${random(ZERO, 255)},${random(ZERO, 255)},${opcity})`
    }

    function curry(func, ...args) {
        return function (...inArgs) {
            const allArgs = args.concat(inArgs);
            if (allArgs.length >= func.length) {
                return func(...allArgs);
            }
            else {
                return curry(func, ...allArgs);
            }
        }
    }

    function debounce(func, wait) {//func需要防抖的函数，wait防抖时间
        let timerId = null;
        return function (...arg) {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                func(...arg);
            }, wait);
        }
    }

    function launchFullscreen(element) {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.oRequestFullscreen) {
            element.oRequestFullscreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        } else {
            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videobox');
            var cssText = 'width:100%;height:100%;overflow:hidden;';
            docHtml.style.cssText = cssText;
            docBody.style.cssText = cssText;
            videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
            document.IsFullScreen = true;
        }
    }
    //退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.oRequestFullscreen) {
            document.oCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else {
            var docHtml = document.documentElement;
            var docBody = document.body;
            var videobox = document.getElementById('videobox');
            docHtml.style.cssText = "";
            docBody.style.cssText = "";
            videobox.style.cssText = "";
            document.IsFullScreen = false;
        }
    }
    function getLocal(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    function setLocal(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    function err(num) {
        if (typeof num != "number") {
            throw new ReferenceError("你乱整");
        } else {
            console.log("代码顺利执行");

        }
    }

    /**
 * 封装一个自己的ajax函数有1个参数options，该参数由下面属性组成
 * @param {Object} options 是一个配置对象，其包含如下属性：
 *         url：发送ajax的目标url, 
 *         success：服务器成功响应时的处理回掉函数，它有一个参数就是服务器返回的数据（json格式）
 *         data = {}：要发送给服务器的数据，我们要求传入一个对象类型，这里默认为空对象（即没有数据）, 
 *         type = "get"：请求的类型，默认get, 
 *         async = true：是否异步，默认异步（true） 
 */
    function ajax({ url, success, data = {}, type = "get", async = true }) {
        let xhr;
        //1、:创建 XMLHttpRequest 对象。
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //2、3、：打开连接。发送 HTTP 请求。（根据类型是 get 或者 post 来决定数据 data 不同的发送方式）
        if ((type = type.toLowerCase()) == 'get') {
            xhr.open('get', url + '?' + jsonToString(data), true);
            xhr.send();
        } else if (type == 'post') {
            xhr.open('post', url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//一般数据都以该方式传输
            xhr.send(jsonToString(data));
        }
        //4、：处理服务器返回的消息，实现局部刷新。
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    success(xhr.responseText);
                }
                else {
                    // error && error();
                    throw new Error("不好意思，总之你错了！");
                }
            };
        };
        //用来将数据由json对象转换成符合url查询部分格式的字符串，方便数据的传输
        function jsonToString(json) {
            var arr = [];
            for (var i in json) {
                arr.push(i + '=' + json[i]);
            };
            return arr.join('&');
        }
    }
    function toObj(str){
        let obj = {};
        str.split("&").forEach(s => {
            let resArr = s.split("=");
            obj[resArr[0]] = resArr[1];
        });
        return obj;
    }
    return { f67,toObj,ajax,err, setLocal, getLocal, exitFullscreen, launchFullscreen, random, color, curry, debounce }
}());


