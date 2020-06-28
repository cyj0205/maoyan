import Base from "./base.js";
export default class extends Base{
   
    render() {
        const templele = `
        <form action="">
        <div class=stu-info>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>姓名</td>
                        <td>年龄</td>
                        <td>性别</td>
                        <td>班级</td>
                        <td>删除</td>
                        <td>修改</td>
                        <td>添加</td>

                    </tr>
                </thead>
                <tbody class="stu-list">

                </tbody>
            </table>
            <div class="input">
                <input type="button" value="首页" class="first-page">
                <input type="button" value="上一页" class="prve-page">
                <span class="nowpage">1</span>/<span class="total">5</span>
                <input type="button" value="下一页" class="next-page">
                <input type="button" value="尾页" class="last-page">
                <select class="page-limit" name="" id="">
                    <option value="3">3</option>
                    <option value="5" selected>5</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    </form>
        `
        this.$el.html(templele);
    }
   
    handler() {
        const that = this;
         $.ajaxSettings.beforeSend = function (xhr, request) {
            const user_token = window.localStorage.getItem('user_token');
            xhr.setRequestHeader('Authorization', `Bearer ${user_token}`);
        }
        let page = 1, limit = 5;
        function render() {
            $.ajax({
                url: "/api/students",
                type: "get",
                data: { page, limit },
                success({ data, count, total }) {
                    $("tbody").html(data.map(students => `<tr>
                        <td>${students.id}</td>
                        <td>${students.name}</td>
                        <td>${students.age}</td>
                        <td>${students.gender}</td>
                        <td>${students.className}</td>
                        <td><input data-id="${students.id}" type="button" value="del" class = "delete"></td>
                        <td><input data-id="${students.id}" type="button" value="change" class = "change"></td>
                        <td><input                            type="button" value="add" class = "add"></td>
                    </tr>`).join(""));

                    $(".total").html(total);
                }
            })
        }
        render();
        document.onclick = function (e) {
            const id = e.target.dataset.id;
            //删除
            if (e.target.value === "del") {
                console.log("del");
                $.ajax({
                    url: "/api/students/" + id,
                    type: "delete",
                    data: { id, page, limit },
                    success({ data, count, total }) {
                        render(data, count, total);
                    }
                })
            }
            //新增
            else if (e.target.value === "add" && $(".upname").val() != "") {
                location.hash = "#/add";
            }
            //修改
            else if (e.target.value === "change") {
                location.hash = "#/update";
                $.ajax({
                    url: "/api/students/changestudents",
                    type: "post",
                    data: { id },
                    success({ data, page, limit }) {
                        $('#changeid').val(data[0].id);
                        $('#changename').val(data[0].name);
                        $('#changeage').val(data[0].age);
                        $('#changegender').val(data[0].gender);
                        $('#chengeclass').val(data[0].className);
                    }
                })
            }
        };


        //分页
        // let firstpage = $(".nowpage").val();  // 1/5的1的值
        let time;
        document.querySelector(".input").onclick = function (e) {
            //首页
            limit = $(".page-limit").val();  //下拉列表的值为页面学生条数
            if (e.target.value == "首页") {
                limit = $(".page-limit").val();  //下拉列表的值为页面学生条数
                page = 1;
                $(".nowpage").html(page);  //当前页数为1
            }
            //下一页
            if (e.target.value === "下一页") {
                if (page < $(".total").html()) {  //跳转页面数小于总的页面数
                    page++;
                    $(".nowpage").html(page);  //页面增加
                }
            }
            //上一页
            if (e.target.value === "上一页") {
                if (page > 1) {
                    page--;
                    $(".nowpage").html(page);  //页面减少
                }
            }
            // 尾页
            if (e.target.value === "尾页") {
                page = $(".total").html();
                $(".nowpage").html(page);
            }

            if (e.target.className === "page-limit") {
                page = 1;
                $(".nowpage").html(page);
            }

            render()
        
        }
    }
}