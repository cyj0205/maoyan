//管理员
const mongoose = require("mongoose");
//下面是生产model的代码：（借助于schema）
const adminsSchema = mongoose.Schema({
    id: String,
    adminName: String, //管理员账号
    adminPassword: String, //管理员密码
}, { versionKey: false });
const adminsModel = mongoose.model('admins', adminsSchema);
//"users"必须与数据库集合名称一致

module.exports = adminsModel;