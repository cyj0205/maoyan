import Login from "./views/login.js";
import Reg from "./views/reg.js";
import Info from "./views/students/info.js";
import Update from "./views/students/update.js";
import Add from "./views/students/add.js";
import Main from "./views/main.js";

var routes = {
    '/login': () => {
        new Login("#root");
    },
    '/reg': () => {
        new Reg("#root");
    },
    '/students': {
        on() {
            if ($("#students-main").length === 0) {
                new Main("#root");
            }
        },
        "/info": () => {
            if ($("#info").length === 1) {
                new Info("#info");
            } else {
                $("a[data-id='info']")[0].click();
                new Info("#info");
            }
            layui.element.tabChange('content', "info");
        },
        "/add": () => {
            if ($("#add").length === 1) {
                new Add("#add");
            } else {
                $("a[data-id='add']")[0].click();
                new Add("#add");
            }
            layui.element.tabChange('content', "add");
        },
        "/update": () => {
            if ($("#update").length === 1) {
                new Update("#update")
            } else {
                $("a[data-id='update']")[0].click();
                new Update("#update")
            }
            layui.element.tabChange('content', "update");
        },
    }
};

var router = Router(routes).configure({ recurse: 'forward' });

export default {
    init() {
        layui.use(["form", "layer", "element", "table","upload"], function () {
            router.init();
            location.hash = "/login"
        })
        // location.hash = "/students/info";
    }
}

