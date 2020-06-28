const usersDao = require("../dao/users");

const service = {}

service.login = async ({ username, password }) => {
    const data = await usersDao.findUser({ username, password });
    let isLogin = false;
    if (data.length >= 1) {
        isLogin = true;
    }
    return { isLogin };
}

service.reg = async ({ username, password }) => {
    const resArr = await usersDao.findUser({ username });
    let isReg = false;
    if (resArr.length < 1) {
        const data = await usersDao.createUser({ username, password });
        isReg = true;/*  */
    }
    return {isReg};
}




module.exports = service;