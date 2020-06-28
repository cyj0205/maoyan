import Base from "../base.js";
// import pager from "../../util/pager.js"
import { getStudents, deleteStudent } from "../../service/students.js"
let isExcute = false;
export default class extends Base {
    render() {
        const template = `
        <table class="layui-hide" id="students-list" lay-filter="students-list"></table>
           `;
        this.$el.html(template);
    }
    afterMount() {
        const tableIns = layui.table.render({
            elem: '#students-list',
            limit: 5,
            limits: [5, 10, 15, 20, 50]
            , url: '/api/students/'
            , toolbar: '#toolbarHeader' //开启头部工具栏，并为其绑定左侧模板
            , headers: { "Authorization": `Bearer ${localStorage.user_token}` }
            , parseData: function (res) {
                return {
                    "code": res.status,//解析接口状态
                    "msg": res.message,//解析提示文本
                    "count": res.count,//解析数据长度
                    "data": res.rows//解析数据列表
                };
            }
            , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '提示'
                , layEvent: 'LAYTABLE_TIPS'
                , icon: 'layui-icon-tips'
            }]
            , title: '学生数据表'
            , cols: [[
                { field: '_id', title: 'ID', width: 60, fixed: 'left', unresize: true, sort: true }
                , {
                    field: 'headPic', title: '头像', width: 60, templet: function (d) {
                        return `<img src='${d.headPic ? d.headPic : ""}' width=30 height=50 alt="无">`
                    }
                }
                , { field: 'name', title: '姓名', width: 90 }
                , { field: 'age', title: '年龄', width: 80, sort: true }
                , { field: 'gender', title: '性别', width: 60 }
                , { field: 'className', title: '班级', width: 80, sort: true }
                , { fixed: 'right', title: '操作', toolbar: '#barCol', width: 120 }
            ]]
            , page: true
        });
    }
    handler() {
        if (isExcute) {
            return;
        }
        isExcute = true;
        const that = this;
        layui.table.on('tool(students-list)', function (obj) {
            const data = obj.data;
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', async function (index) {
                    const _id = data._id;
                    const { isDelete } = await deleteStudent({ _id });
                    if (isDelete) {
                        layer.alert("删除成功！");
                        obj.del();
                    } else {
                        layer.alert("删除失败！");
                    }
                });
            } else if (obj.event === 'edit') {
                location.hash = "/students/update";
                //取对应事件的回掉直接调用，非异步。
                setTimeout(() => {
                    layui.form.val('update-form', data);
                    if (data.headPic) {
                        $("#upload-pic").css({
                            background: `url('${data.headPic}')`,
                            backgroundSize: "100% 100%"
                        })
                    }
                })
            }
        });
    }
    reloadList(){
        this.tableIns.reload();
    }
}