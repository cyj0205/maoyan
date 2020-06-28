import Base from "../base.js";
import { addStudent } from "../../service/students.js"
import getFileURL from "../../util/getFileURL.js"
export default class extends Base {
    render() {
        const template = `<form class="layui-form" action="" lay-filter="add-form" style="width: 400px;">
        <div class="layui-form-item">
            <label class="layui-form-label">姓名</label>
            <div class="layui-input-block">
                <input type="text" name="name" required lay-verify="required" placeholder="请输入姓名" autocomplete="off"
                    class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">头像</label>
            <div class="layui-input-block">
                <input type="hidden" name="headPic">
                <p id="upload-pic" style="width:100px;height:160px;border:1px dashed;display:flex;justify-content:center;align-items:center;cursor:pointer">
                <i class="layui-icon">&#xe67c;</i>上传图片
                </p>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">年龄</label>
            <div class="layui-input-block">
                <input type="text" name="age" required lay-verify="required" placeholder="请输入年龄" autocomplete="off"
                    class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">班级</label>
            <div class="layui-input-block">
                <input type="text" name="className" required lay-verify="required" placeholder="请输入成绩" autocomplete="off"
                    class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">性别</label>
            <div class="layui-input-block">
                <input type="radio" name="gender" value="男" title="男">
                <input type="radio" name="gender" value="女" title="女" checked>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="add-btn">即刻添加</button>
            </div>
        </div>
    </form>`;
        this.$el.html(template);
    }
    afterMount() {
        // layui.form.render()
        const that = this;
        layui.form.render();
        this.uploadInst = layui.upload.render({
            elem: '#upload-pic' //绑定元素
            , url: '/students/upload/' //上传接口
            , auto: false//自动上传，选择完图片立即上传
            , field: "file"//文件上传的key,默认：“file”
            // ,bindAction:"#update-btn"//非自动上传时，图片上传触发的按钮
            , headers: { "Authorization": `Bearer ${localStorage.user_token}` }//jwt验证需要的请求头
            , done: async function (res) {
                that.uploadResolve(res.data.responsename);
                //上传完毕回调
            }
            , choose(obj) {
                //   var files = obj.pushFile();
                //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function (index, file, result) {
                    const picLocalPath = getFileURL(file);
                    $("#upload-pic").css({
                        background: `url('${picLocalPath}')`,
                        backgroundSize: "100% 100%"
                    })
                });
            }
        });
    }
    handler() {
        const that = this;
        layui.form.on('submit(add-btn)', function (data) {
            (async function () {
                const student = data.field;

                if ($("#upload-pic-add").next()[0].files.length === 1) {
                    const headPic = await new Promise(resolve => {
                        that.uploadResolve = resolve;
                        that.uploadInst.upload();
                    })
                    if (student.headPic) {
                        deletePic(student.headPic);
                    }

                    student.headPic = headPic;//上传完成后把图片在服务器的位置得到

                }
                const { isAdd } = await addStudent(student);
                if (isAdd) {
                    layui.layer.msg("添加成功！");
                    location.hash = "/students/info";
                }
            })();
            return false;
        });
    }
}