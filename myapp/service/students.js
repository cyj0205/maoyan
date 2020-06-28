const studentsDao = require("../dao/students");

const service = {}

service.getStudents = async ({page,limit}) => {
    const data = await studentsDao.findStudents({page,limit});
    // return{
    //     "code":res.status,//解析接口状态
    //     "msg":res.massage,//解析提示文本
    //     "count":res.total,//解析数据长度
    //     "data":res.students//解析数据列表
    // };
    data.total = Math.ceil(data.count/limit);
    data.message = "数据请求失败";
    data.status = 0;
    return data;
}
service.deleteStudent = async ({_id}) => {
    const {deletedCount} = await studentsDao.deleteOneStudent({_id});
    let isDelete = deletedCount>=1?true:false;
    return { isDelete };
}
service.updateStudent = async ({_id,name,age,gender,className,headPic}) => {
    const {nModified} = await studentsDao.updateOneStudent({_id,name,age,gender,className,headPic});
    let isUpdate = nModified>=1?true:false;
    return { isUpdate };
}
service.addStudent = async ({name,age,gender,className,headPic}) => {
    const data = await studentsDao.createStudent({name,age,gender,className,headPic});
    let isAdd = data?true:false;
    return { isAdd };
}





module.exports = service;