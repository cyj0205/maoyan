//座位
const mongoose  = require("mongoose");
//下面是生产model的代码：（借助于schema）
const seatsSchema = mongoose.Schema({
    id : String, // 
    row : Number, // 
    col : Number, // 
    theaterId : String // 
  }, { versionKey: false });
const seatsModel = mongoose.model('seats', seatsSchema);
  //"users"必须与数据库集合名称一致

module.exports = seatsModel;