var express = require('express');
var router = express.Router();

console.time('users')  //用来测试数据库连接时间
var User = require("../bin/DAO/userDAO.js");
console.timeEnd('users')
var Animal = require("../bin/DAO/animalDAO.js");

//注册接口
router.post("/register", (req, res) => {
	var nameError = !req.body.username.trim();
	var telError = !/^\d{6}$/.test(req.body.password);
	if (nameError || telError) {
		res.json({ err: 1, msg: "数据格式错误" });
		return;
	}
	console.log(req.body)
	var s = new User(req.body);
	s.save()
		.then(() => {
			res.json({ err: 0, msg: "添加成功" });
		})
		.catch(err => {
			console.log(err)
			res.json({ err: 2, msg: "未知错误" });
		});
});

//登录接口
router.post("/login", (req, res) => {
	var nameError = !req.body.username.trim();
	var telError = !/^\d{6}$/.test(req.body.password);
	if (nameError || telError) {
		res.json({ err: 1, msg: "数据格式错误" });
		return;
	}
	console.log(req.body)

	var s = new User(req.body);
	s.save()
		.then(() => {
			res.json({ err: 0, msg: "添加成功" });
		})
		.catch(err => {
			res.json({ err: 2, msg: "未知错误" });
		});


});

//查询每条数据的全部值
router.get("/getUserList", (req, res) => {
	User.find()
		.then((data, err) => {
			res.json(data);
		})
		.catch(err => {
			res.json({ err: 2, msg: "未知错误" });
		});

});

//查询每条数据的全部值
router.get("/getUserNameList", (req, res) => {
	User.find({}, { "username": 1, "password": 1, "_id": 0 })
		.then((data, err) => {
			res.json(data);
		})
		.catch(err => {
			res.json({ err: 2, msg: "未知错误" });
		});

});

module.exports = router;
