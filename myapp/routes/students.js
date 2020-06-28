var express = require('express');
var router = express.Router();
const studentsService = require("../service/students");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let {page,limit} = req.query;
  page = ~~page;
  limit = ~~limit;
  const data = await studentsService.getStudents({page,limit});
  // res.header({
  //   "Access-Control-Allow-Origin":"*"
  // });
  res.send(data);
  // res.send(`${callback}(${JSON.stringify(data)})`);
});
router.delete('/:_id', async function(req, res, next) {
  const {_id} = req.params;
  const data = await studentsService.deleteStudent({_id});
  res.send(data);
});
router.put('/:_id', async function(req, res, next) {
  const {_id,name,age,gender,className,headPic} = req.body;
  const data = await studentsService.updateStudent({_id,name,age,gender,className,headPic});
  res.send(data);
});
router.post('/', async function(req, res, next) {
  const {name,age,gender,className,headPic} = req.body;
  const data = await studentsService.addStudent({name,age,gender,className,headPic});
  res.send(data);
});


module.exports = router;