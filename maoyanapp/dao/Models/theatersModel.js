//放映厅
const mongoose = require("mongoose");
//下面是生产model的代码：（借助于schema）
const theatersSchema = mongoose.Schema({
    id : String, //
    name : String, //
    status : Boolean, //
    cinemasId : String, // 
}, { versionKey: false });
const theatersModel = mongoose.model('theaters', theatersSchema);
//"users"必须与数据库集合名称一致

module.exports = theatersModel;