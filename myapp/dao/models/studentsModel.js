const mongoose  = require("mongoose");
//下面是生产model的代码：（借助于schema）
const studentsSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  className: String,
  headPic:String
},{versionKey:false});
const studentsModel = mongoose.model('students', studentsSchema);


module.exports = studentsModel;