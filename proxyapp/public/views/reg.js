import Base from "./base.js";
export default class extends Base{
    render() {
        const templele = ` 
        <form action="" name="registerForm">
        <div>
            账号：
            <input type="text" placeholder="请输入账号" name="username" id="reusername">
        </div>
        <div>
            密码：
            <input type="text" placeholder="请输入密码" name="password" id="repassword">
        </div>
        <div>
            确认密码：
            <input type="text" placeholder="请确认密码" name="surepassword" id="surepassword">
        </div>
        <input type="button" value="确认注册">
        <a href = "#/login">已注册？去登陆</a>
    </form>`;
    this.$el.html(templele);
    }
    handler() {
        const that = this;
        $("input[value = '确认注册']").on("click", function () {
            if ($("#repassword").val() == $("#surepassword").val() && $("#surepassword").val() != "") {
                const value = $(document.registerForm).serialize();
                $.ajax({
                    url: "/users/reg",
                    type: "post",
                    data: value,
                    success({ isReg }) {
                        if (isReg) {
                            alert("注册成功");
                            location.hash = "#/login";
                        }
                    }
                })
            } else {
                alert("输入有误，请重新输入")
            }
        })
    }
}