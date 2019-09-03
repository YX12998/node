var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require("mysql");

var app = express()
app.use(cookieParser())


// 引入登录校验
var checeklogin = require('./demo_session_checke_login');

const hour = 1000 * 60 * 60;
const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	pott: 3306,
	user: "root", // 数据库用户密码
	password: "", // |数据库用户密码
	database: "wqy", // 数据库名
	multipleStatements: true,
});
connection.connect(); // 链接数据库
console.log('引入数据库成功');

app.use('/web', express.static('web')); // 静态资源
app.use(bodyParser.urlencoded({
	extended: false
}));

var sessionOpts = {
	secret: 'a cool secret', // 设置密钥
	resave: true,
	saveUninitialized: true,
	key: 'myapp_sid', // 设置会话cookie名, 默认是connect.sid

	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}

app.use(session(sessionOpts));

// filter 
// 前端校验  // 监听一个请求,将校验的结果返回给前端

app.get('/checkelogin', function(req, res) {
	console.info(checeklogin.checeklogin(req));
	if (!checeklogin.checeklogin(req)) {
		res.json({
			"ok": true
		});
	} else {
		res.json({
			"ok": false
		});
	}
})


// 修改成权限页面
app.get('/', function(req, res) {

	// 验证登录状态
	var sess = req.session;
	
	// if(!sess.userName){
	// 	res.sendFile(__dirname + "/web/login.html");
	// }else{
	// 	res.setHeader('Content-Type','text/html;charset=utf-8');
	// 	// res.watch("欢迎您");
	// 	res.write('<p>你:' +sess.userName +'</p>')
	// 	res.end();
	// }
	if (!checeklogin.checeklogin(req)) {
		res.sendFile(__dirname + "/web/login.html");
	} else {
		res.setHeader('Content-Type', 'text/html;charset=utf-8');
		res.write('<p>欢迎您:' + sess.userName + '已经登录' + '</p>')
		res.end();
	}

})


// 处理登录
app.post("/login", function(req, res) {
	console.info("进来了");

	// 查询数据库, 看看用户名和密码是否匹配	 
	var sqlString = 'select * from user where user_name = "' + req.body.userName + '"and user_password="' + req.body.userPassword +
		'" limit 1';
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			res.json({
				"ok": false
			});
		} else if (result.length <= 0) {

			res.json({
				"ok": false
			});
		} else {
			// 登录成功,要改session
			
			var sess = req.session;
			sess.userName = req.body.userName;
			// console.info( sess.userName)
			console.info("登录成功");
			res.json({
				"ok": true
			});
		};
	})
	// res.json({});
})
// 注销 
app.post('/logout', function(req, res) {
	console.info("进入注销");
	var sess = req.session;
	delete sess.userName;
	res.json({"logout":true})
})
// 过滤器
// app.use(function(req, res, next) {
// 	if (req.url === '/favicon.ico') {
// 		return
// 	}
// 	// console.info("我是filter");// 同一个浏览器而言,req是同一个
// 	var sess = req.session;
// 	if (sess.views) {
// 		sess.views++;
// 	} else {
// 		sess.views = 1;
// 	}
// 	// console.info(sess);
// 	// 用户姓名
// 	if (!sess.userName) {
// 		sess.userName = "wqy";
// 	} else {
// 		sess.userName = res.query;
// 		// console.info(res.query)
// 	}
// 	res.setHeader('Content-Type', 'text/html');
// 	// 返回到页面上
// 	res.write('<p>views: ' + sess.views +  '<br>' +sess.userName+'</p>');
// 	res.end();
// });
app.listen(4000);
