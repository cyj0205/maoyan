const express = require('express');
const router = express.Router();
const rp = require("request-promise");
const jwt = require("jsonwebtoken");
const { secretKey, md5 } = require('../util/salt');
const { targeturl } = require('../util/baseConfig');


/* GET users listing. */
// router.post('/login', async function(req, res, next) {
//   const data = await rp({ // 通过 request-promise 向⽬标服务器发送请求
//     method: 'POST',
//     uri: 'http://localhost:3000/users/login',
//     body: req.body,
//     json: true
//     })
//     res.send(data); 
//   // res.send('respond with a resource');
// });
router.post('/login', async function (req, res, next) {
  let { name, password } = req.body;
  password = md5(password);
  //主动转发
  const data = await rp({ // 通过 request-promise 向⽬标服务器发送请求
    method: 'POST',
    uri: targeturl + '/users/login',
    body: { name, password },
    json: true
  })
  let { islogin } = data;
  let srcText = { islogin };

  if (islogin) {
    let token = jwt.sign(
      { name },    //对象，用于保存用户数据
      secretKey,
      {
        expiresIn: 60*60*2 // 秒
      }
    );
    srcText.token = token;
  }
  res.send(srcText);
});




router.post('/reg', async function (req, res, next) {
  let { username, password } = req.body;
  password = md5(password);
  const data = await rp({ // 通过 request-promise 向⽬标服务器发送请求
    method: 'POST',
    uri: 'http://localhost:3000/users/reg',
    body: { username, password },
    json: true
  })
  res.send(data);
  // res.send('respond with a resource');
});

module.exports = router;
