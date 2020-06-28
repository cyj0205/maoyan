
import Base from "./base.js"
// import { login } from "../service/users.js";
let isExcute = false;
export default class extends Base {
    render() {
        const template =
            `<div class="layui-layout layui-layout-admin" id="students-main">
            <div class="layui-header">
                <div class="layui-logo">学生管理系统</div>
                <!-- 头部区域（可配合layui已有的水平导航） -->
                <ul class="layui-nav layui-layout-right">
                    <li class="layui-nav-item">
                        <a href="javascript:;">
                            <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                        </a>
                        <dl class="layui-nav-child">
                            <dd><a href="">基本资料</a></dd>
                            <dd><a href="">安全设置</a></dd>
                        </dl>
                    </li>
                    <li class="layui-nav-item"><a href="">退出</a></li>
                </ul>
            </div>
    
            <div class="layui-side layui-bg-black">
                <div class="layui-side-scroll">
                    <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
                    <ul class="layui-nav layui-nav-tree" lay-filter="aside">
                        <li class="layui-nav-item layui-nav-itemed">
                            <a class="" href="javascript:;">学生管理</a>
                            <dl class="layui-nav-child">
                                <dd><a data-name="学生信息" data-id="info" href="javascript:;"><i
                                            class="layui-icon layui-icon-table"
                                            style="font-size: 16px; color: #1E9FFF;margin-right: 5px;"></i> 学生信息</a></dd>
                                <dd><a data-name="添加学生" data-id="add" href="javascript:;">
                                        <i class="layui-icon layui-icon-addition"
                                            style="font-size: 16px; color: #1E9FFF;margin-right: 5px;"></i>
                                        添加学生</a></dd>
                                <dd><a data-name="修改学生" data-id="update" href="javascript:;"><i
                                            class="layui-icon layui-icon-edit"
                                            style="font-size: 16px; color: #1E9FFF;margin-right: 5px;"></i>
                                        修改学生</a></dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="layui-body">
                <!-- 内容主体区域 -->
                <div class="layui-tab" lay-allowClose="true" style="margin-top:0px;" lay-filter="content">
                    <ul class="layui-tab-title">
                        <li class="layui-this">网站设置</li>
                    </ul>
                    <div class="layui-tab-content">
                        <div class="layui-tab-item layui-show">内容1</div>
                    </div>
                </div>
                <!-- <div style="padding: 15px;">内容主体区域</div> -->
            </div>
    
            <div class="layui-footer">
                <!-- 底部固定区域 -->
                <marquee behavior="" direction="" style="color:red">你说儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁儿豁</marquee>
            </div>
        </div>`;
        this.$el.html(template);
    }
    afterMount() {
        layui.element.init();
    }
    handler() {
        if (isExcute) {
            return;
        }
        isExcute = true;
        const that = this;
        layui.element.on('nav(aside)', function ($elem) {
            const { id, name } = $elem[0].dataset;
            if (!id) {
                return;
            };
            const exsitTab = $(`.layui-tab>.layui-tab-title>li[lay-id='${id}']`);
            if (!exsitTab.length) {
                layui.element.tabAdd('content', {
                    title: name
                    , content: `<div id="${id}"></div>`//支持传入html
                    , id
                });
            }
            location.hash = "#/students/"+id;
        });
        layui.element.on('tabDelete(content)',function(data){
            location.hash = "/students"
        })
    }

}