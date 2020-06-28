import Base from "./base.js";
export default class extends Base{
    render() {
        const templele = `
        <form action="" name="create">
        <div class="amend">
            <h3>新增</h3>
            <div>
                姓名：
                <input type="text" placeholder="请输入姓名" name="amendname" value="" class="upname">
            </div>
            <div>
                年龄：
                <input type="text" placeholder="请输入年龄" name="amendage" value="" class="upage">
            </div>
            <div class="person">

                性别：
                <input type="text" placeholder="请填写性别" name="amendgender" value="" class="upgender">
            </div>
            <div>
                班级：
                <input type="text" placeholder="请确认性别" name="amendclass" value="F61" class="upclass">
            </div>
            <input type="button" value="确认新增" id="add">
        </div>
    </form>
        `;
        this.$el.html(templele);
    }
    handler() {
        const that = this;
        document.onclick = function (e) {
            if (e.target.value === "确认新增" && $(".upname").val() != "") {
                const value = $(document.create).serialize();
                $.ajax({
                    url: "/api/students/",
                    type: "post",
                    data: value,
                    success() {
                        $(".upname").val("");
                        $(".upage").val("");
                        $(".upgender").val("");
                        location.hash = "#/info";
                    }
                })
            }
        }
    }
}