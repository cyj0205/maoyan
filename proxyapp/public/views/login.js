import Base from "./base.js";
export default class extends Base{ 
    render() {
        const templele = ` 
        <form action="" name="loginForm">
        <div>
            账号：
            <input type="text" placeholder="请输入账号" name="name">
        </div>
        <div>
            密码：
            <input type="text" placeholder="请输入密码" name="password">
        </div>
        <input type="button" value="确认登录">
        <a href = "#/reg">没账号？去注册</a>
    </form>`;
        this.$el.html(templele);
    }
   
    handler() {
        const that = this;
        $("input[value = '确认登录']").on("click", function () {
            const value = $(document.loginForm).serialize();
            $.ajax({
                url: "/users/login",
                type: "post",
                data: value,
                success({ islogin, token }) {
                    console.log(islogin);
                    if (islogin) {
                        alert("登录成功")
                        window.localStorage.setItem('user_token', token);
                        location.hash="#/info"
                    } else {
                        alert("登录失败")
                    }
                }
            })
        })

    }
}