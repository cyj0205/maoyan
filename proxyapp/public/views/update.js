import Base from "./base.js";
export default class extends Base{
    render() {
        const templele = `
        <form action="" name="changestudents">
        <div class="amend">
            <h3>修改</h3>
            <div>
                id：
                <input type="text" placeholder="请输入ID" name="id" readonly id="changeid">
            </div>
            <div>
                姓名：
                <input type="text" placeholder="请输入姓名" name="name" value="" id="changename">
            </div>
            <div>
                年龄：
                <input type="text" placeholder="请输入年龄" name="age" value="" id="changeage">
            </div>
            <div>
                性别：
                <input type="text" placeholder="请确认性别" name="gender" value="" id="changegender">
            </div>
            <div>
                班级：
                <input type="text" placeholder="请输入班级" name="className" value="" id="chengeclass">
            </div>
            <input type="button" value="确认修改" id="sure">
        </div>
    </form>
        `;
        this.$el.html(templele);
    }
    handler() {
        const that = this;
        document.onclick = function (e) {
            if (e.target.value === "确认修改") {
                const value = $(document.changestudents).serialize();
                $.ajax({
                    url: "/api/students/changestudents" ,
                    type: "put",
                    data: value,
                    success({ data, page, limit }) {
                        alert("修改成功");
                        location.hash = "#/info";
                    }
                })
            }
        }
    }
}