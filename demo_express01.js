var express = require('express');
var fs = require('fs');
var app = express();

// 创建application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/', function(req, res) {
	console.info(req.path); // 获取请求路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径
	// console.info(req.hostname); // 主机信息(域名)
	
	// req.send('hello world');
	// 返回特定页面
	// fs.createReadStream('./web/index.html').pipe(res);
	console.info(__dirname); // 这就是root, 被存到全局变量里了
	res.sendFile(__dirname + "/web/index.html"); // 返回静态资源(文件)
});

app.post('/', urlencodedParser, function(req, res) {
	console.info(req.path); // 获取请求路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径
	console.info(req.body);
	
	
	res.end('hello world');
});

// 静态文件 将/web文件下的资源当做静态资源, 不需要额外的get去获取
app.use('/web', express.static('web'));


// 启动服务器
var server = app.listen(1314, function() {
	var host = server.address().address;
	var port = server.address().port;
	// console.info(server);
	console.log("应用实例, 访问地址为 http://" + host + ":%s", port);
})

// get把请求参数放在url上(可通过query获取), post把参数放在请求的内部(通过body获取);