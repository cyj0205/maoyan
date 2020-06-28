const  usersModel = require("./models/usersModel");

const dao = {}

dao.findUser = async (condition)=>{
    return await usersModel.find(condition);
}

dao.createUser = async ({username,password})=>{
    return await usersModel.create({username,password});
}


module.exports = dao;