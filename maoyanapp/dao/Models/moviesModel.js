//电影
const mongoose = require("mongoose");
//下面是生产model的代码：（借助于schema）
const moviesSchema = mongoose.Schema({
    id: String,
    cname: String, // 
    ename: String, // 
    type: String, // 
    area: String, // 
    poster: String, //
    time: Number, //
    upDate: String, // 
    score: Number, //
    count: String, // 
    intro: String, // 
    isClassic: Boolean, //
    director: String, //
    actor: String, //
    images: [String] // 
}, { versionKey: false });
const moviesModel = mongoose.model('movies', moviesSchema);
//"users"必须与数据库集合名称一致

module.exports = moviesModel;