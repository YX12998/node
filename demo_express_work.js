var express = require('express');
var app = express();
var fs = require('fs');
var mysql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// 创建application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});


const connection = mysql.createConnection({
	host: "localhost", //主机地址
	port: 3306, //端口3306 默认
	user: "root", //数据库用户名
	password: "", //数据库密码
	database: "yuan" //数据库名
});
connection.connect(); //数据库连接

// 静态文件 将/web文件下的资源当做静态资源, 不需要额外的get去获取
app.use('/web', express.static('web'));

// 增加request对body的支持
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/index2.html"); // 返回静态资源(文件)
});

app.get("/getUserInfo", function(request, response) {
	console.info(request.query);
	connection.query('select * from Person where id="' + request.query.userId + '"limit 1;', function(err, result, file) {
		if (err) {
			console.info(err);
			response.json({
				"name": "查无此人"
			});
		} else {
			console.info(result);
			if (result.length > 0) {
				response.json(result[0].name);
			} else {
				response.json({
					"name": "查无此人"
				});
			}
		}
	});

});

app.post('/updataUser', function(request, response) {
	// console.info(request.body);
	// rep.json({"a":"xxxx"});
	// res.end('hello world');
	var sqlString = "update Person set name='"+request.body.userName +"'where id="+request.body.userId;
	connection.query(sqlString, function(err, result, file){
		if(err){
			console.info(err);
		}else{
			console.info(result);
			if(result.changrRows){
				response.json({"ok":true, "info":"修改成功"});
			}else{
				response.json({"ok":false, "info":"无可更新向"});
			}
		}
	});
});


// 启动服务器
var server = app.listen(1314, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.info(server);
	console.log("应用实例, 访问地址为 http://" + host + ":%s", port);
})
