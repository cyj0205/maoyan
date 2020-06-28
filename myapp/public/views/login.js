import Base from "./base.js"
import { login } from "../service/users.js";
export default class extends Base {
    render() {
        const template =
            `
            <div class="login-form">
            <div class="layui-card">
                <div class="layui-card-header" style="text-align: center;">
                    <h2>学生管理系统登陆</h2>
                </div>
                <div class="layui-card-body">
                    <form class="layui-form" action="" lay-filter="login-form">
                        <div class="layui-form-item">
                            <label class="layui-form-label">用户名</label>
                            <div style="width: 180px;position: relative;" class="layui-input-block">
                                <input type="text" name="username" required lay-verify="username" placeholder="请输入用户名"
                                    autocomplete="off" class="layui-input" value="zs">
                                <i data-status="hide" class="layui-icon layui-icon-username"
                                    style="font-size: 20px; color: #000;position: absolute;right: 7px;top: 8px;"></i>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <label class="layui-form-label">密码</label>
                            <div style="width: 180px;position: relative;" class="layui-input-inline">
                                <input type="password" name="password" required lay-verify="pass" placeholder="请输入密码"
                                    autocomplete="off" class="layui-input" value="123">
                                <i data-status="hide" class="layui-icon layui-icon-password"
                                    style="font-size: 20px; color: #000;position: absolute;right: 7px;top: 8px;cursor: pointer;"></i>
                            </div>
                        </div>
                        <div class="layui-form-item" style="position: relative;">
                            <label class="layui-form-label"></label>
                            <div style="width: 180px;position: relative;" class="layui-input-inline">
                                <input style="width: 90px;font-size: 12px;" type="text" name="validCode" required
                                    lay-verify="required|validCode" placeholder="请输入验证码" autocomplete="off"
                                    class="layui-input">
                                <svg style="width: 90px;height:38px;position:absolute;right: -8px;top: 0px;cursor: pointer;border:dashed 1px gray"
                                    class="valid-code"></svg>
    
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <div style="width: 180px;margin-left: 70px;" class="layui-input-inline">
                                <input type="checkbox" name="protocol" lay-verify="confirmPro" lay-skin="primary" title="协议"
                                    checked>
                                <button class="layui-btn" lay-submit lay-filter="login-btn">立即登陆</button>
                            </div>
                        </div>
                        <div class="layui-form-item">
                            <a style="float: right;font-size: 14px;" href="#/reg">还没有账号？赶快去注册</a>
                        </div>
                    </form>
                </div>
            </div>
    
        </div>`;
        this.$el.html(template);
    }
    afterMount() {
        layui.form.verify({
            username: [
                /^[a-zA-Z]{2,10}$/,
                "用户名必须是3-10位的字母！"
            ],
            confirmPro(value, item) {
                if (!item.checked) {
                    return "必须同意协议！"
                }
            }
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            , pass: [
                /^[\S]{3,12}$/
                , '密码必须6到12位，且不能出现空格'
            ],
            validCode: function (value) {
                if (!new RegExp(validCode.join("").toLowerCase()).test(value.toLowerCase())) {
                    return "你的验证码不正确！"
                }
            }
        });
        layui.form.render();
        //=============================================
        var validCode = [];
        $("svg").click(function () {
            genValidCode();
        });
        function genValidCode() {
            validCode.length = 0;
            const color = () => Mock.Random.color();
            const random = (s, e) => {
                if (e) {
                    return Mock.Random.integer(s, e);
                } else {
                    return Mock.Random.integer(0, s);
                }
            }
            const words = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
            const len = words.length;
            let validText = "";
            //产生背景线条
            let lineNum = 7;
            for (let i = 0; i < lineNum; i++) {
                validText += `<line x1="${random(150)}" y1="${random(60)}" x2="${random(150)}" y2="${random(60)}" stroke="${color(.5)}"
                                            fill="transparent" stroke-width="${random(1, 3)}" />`
            }
            //产生字母数字
            for (let i = 0; i < 4; i++) {
                validCode.push(words[random(len - 1)]);
                validText += `<text x="${15 + i * 15}" y="20" style="font-size:20;fill:${color()}"
                                            rotate="${random(-30, 30)}">${validCode[i]}</text>`;
            }
            document.querySelector("svg").innerHTML = validText;
            $("input[name='validCode']").val(validCode.join(""));
        }
        genValidCode();

    }
    handler() {
        const that = this;
        layui.form.on('submit(login-btn)', function (data) {
            // console.log("520");
            const { username, password } = data.field;
            (async function () {
                const { isLogin, token } = await login({ username, password });
                if (isLogin) {
                    layui.layer.msg('登录成功！');
                    localStorage.setItem("user_token", token);
                    location.hash = "/students/info";
                } else {
                    layui.layer.msg('再登录一次！');
                }

            })();
            return false;
        });
        $(document).on("click",".layui-icon-password" ,function () {
            //#1E9FFF
            if (this.dataset.status === "hide") {
                this.dataset.status = "show";
                this.style.color = "#000";
                $("input[name='password']").attr("type", "password");
            } else if (this.dataset.status === "show") {
                this.dataset.status = "hide";
                this.style.color = "#1E9FFF";
                $("input[name='password']").attr("type", "text");
            }
        })
    }

}