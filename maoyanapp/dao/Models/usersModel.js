//用户
const mongoose  = require("mongoose");
//下面是生产model的代码：（借助于schema）
const usersSchema = mongoose.Schema({
    id:String,
    userName: String,
    userPassword: String
  }, { versionKey: false });
const usersModel = mongoose.model('users', usersSchema);
  //"users"必须与数据库集合名称一致

module.exports = usersModel;