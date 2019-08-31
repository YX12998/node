var express = require('express');
var app = express();
var mysql = require("mysql");
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
	host: "localhost", //主机地址
	port: 3306, //端口3306 默认
	user: "root", //数据库用户名
	password: "", //数据库密码
	database: "yuan" //数据库名
});
connection.connect(); //数据库连接

app.use('/web', express.static('web'));

const hour = 1000 * 60 * 60;
var sessionOpts = {
	secret: 'a coll secret', // 设置密钥
	resave: true,
	saveUninitialized: true,
	key: 'myapp_sid',
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}
app.use(session(sessionOpts));

// 修改成权限页面
app.get('/', function(req, res) {
	// console.info("我没有被过滤器拦截");
	// res.sendFile(__dirname + "/web/index2.html");
	
	// 验证登录状态
	var sess = req.session;
	
	// 姓名
	if (!sess.userName) {
		res.sendFile(__dirname + "/web/login.html");
	}else{
		res.setHeader('Content-Type', 'text/html');
		res.write('<p>欢迎您:'+sess.userName +'</p>');
		res.end();
	}
});

app.get('/logout',function(req,res){
	var sess = req.session;
	delete sess.userName;
	console.info("注销");
	res.location(301,'/');
});

// 处理登录
app.post("/login", function(req, res){
	// console.info(req.body);
	// 查询数据库, 匹配
	var sqlString = 'select * from user where user_name = "'+ req.body.userName+'" and user_password="'+req.body.userPassword+'"limit 1';
	connection.query(sqlString, function(err, result, file){
		if(err){
			res.json({"ok":false});
		}else if(result.length<=0){
			res.json({"ok":false});
		}else{
			// 登录成功, 要改session
			var sess = req.session;
			sess.userName = req.body.userName;
			res.json({"ok":true});
		}
	});
})

// 过滤器
app.use(function(req, res, next) {
	if (req.url === '/favicon.ico') {
		return;
	}
	console.info("我是filter");
	// 同一个浏览器而言, req是同一个
	var sess = req.session;
	console.log(sess);
	if (sess.views) {
		sess.views++;
	} else {
		sess.view = 1;
	}

	// 用户姓名
	if (!sess.userName) {
		sess.userName = "yuanxin";
	}

	res.setHeader('Content-Type', 'text/html');
	res.write('<p>views: ' + sess.views + '<br>' + sess.userName + '</p>');
	res.end();
});
app.listen(7533);
