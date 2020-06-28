const express = require('express');
const router = express.Router();

const usersService = require("../service/users");


/* GET users listing. */
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;
  const data = await usersService.login({ username, password });
  res.send(data);
});
router.post('/reg', async function (req, res, next) {
  const { username, password } = req.body;
  const data = await usersService.reg({ username, password });
  res.send(data);
});

module.exports = router;


