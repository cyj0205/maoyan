//影院
const mongoose = require("mongoose");
//下面是生产model的代码：（借助于schema）
const cinemasSchema = mongoose.Schema({
    id : String, // 
    name : String, // 
    address : String, // 
    phone : String, // 
    status : Boolean // 
}, { versionKey: false });
const cinemasModel = mongoose.model('cinemas', cinemasSchema);
//"users"必须与数据库集合名称一致

module.exports = cinemasModel;