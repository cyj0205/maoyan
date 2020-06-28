const  studentsModel = require("./models/studentsModel");

const dao = {}

dao.findStudents = async ({page,limit})=>{
    //limit   5
    //page    跳过
    //1        0
    //2        5
    //3        10
    //4        15
    // (page-1)*limit
    const count = await studentsModel.countDocuments();
    const students =  await studentsModel.find().skip((page-1)*limit).limit(limit);
    return {
        count,
        rows:students
    }
}
dao.deleteOneStudent = async ({_id})=>{
    return await studentsModel.deleteOne({_id});
}
dao.updateOneStudent = async ({_id,name,age,gender,className,headPic})=>{
    return await studentsModel.updateOne({_id},{$set:{name,age,gender,className,headPic}});
}
dao.createStudent = async ({name,age,gender,className,headPic})=>{
    return await studentsModel.create({name,age,gender,className,headPic});
}
module.exports = dao;