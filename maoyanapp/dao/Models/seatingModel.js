//选座
const mongoose  = require("mongoose");
//下面是生产model的代码：（借助于schema）
const seatingSchema = mongoose.Schema({
    id : String, // 8888
    scheduleId : String, // 
    seatId : String, // 
  }, { versionKey: false });
const seatingModel = mongoose.model('seating', seatingSchema);
  //"users"必须与数据库集合名称一致

module.exports = seatingModel;