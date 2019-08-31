/* 
启动服务器
筛选url中的信息 如果是get且是/  就让他指向/web/text_post.HTML AllCollection
如果是post,并且请求地址为"",则返回其请求的参数
*/
var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	querystring = require('querystring'),
	util = require('util'),
	path = require('path'),
	mysql = require("mysql");

var root = path.resolve(process.argv[2] || '.'); //取根路径

http.createServer(function(request, response) {
	// 筛选url 区分get post
	var mthodRES = request.method; //请求方法
	// console.info(mthodRES);
	var urlRES = request.url;
	// console.info(urlRES)
	if (mthodRES == 'get' || mthodRES == 'GET') {
		if (urlRES == '/') {
			gotoPage('/web/test_post.html', request, response)
		} else {
			gotoPage(urlRES, request, response);
		}
	}
	if (mthodRES == 'post' || mthodRES == 'POST') {
		//收集post过来的参数列表
		var postData = '';
		request.on('data', function(chunk) {
			postData += chunk;
		});
		request.on('end', function() {
			postData = querystring.parse(postData);
			handlePost(urlRES, postData, response)
		})
	}

}).listen(7533);
console.info("服务器已启动");

const connection = mysql.createConnection({
			host: "localhost", //主机地址
			port: 3306, //端口3306 默认
			user: "root", //数据库用户名
			password: "", //数据库密码
			database: "yuan" //数据库名
		});
		connection.connect(); //数据库连接


//返回
function gotoPage(pagePath, request, response) {
	var currUrl = request.url;
	var queryObj = url.parse(currUrl, true).query;
	var filepath = path.join(root, pagePath);
	var S = parseInt(queryObj.id);

	if (pagePath == '/favicon.ico') {
		return;
	}

	fs.stat(filepath, function(err, stats) { //stat(表示路径的字符串,回调)
		if (!err && stats.isFile()) { //isFile 判断是否是文件
			response.writeHead(200);
			var fileStream001 = fs.createReadStream(filepath); /*fileStream001 => buffer(静态的水)*/
			fileStream001.pipe(response);
		} else if (pagePath == currUrl) {
			//数据库
			connection.query("select * from Person ", function(error, results, fields) {
				if (error) {
					throw error;
				} else {
					response.writeHead(200, {
						'Content-Type': 'text/plain;charset=utf-8'
					});
					for (var i = 0; i < results.length; i++) {
						if (results[i].id == S) {
							response.end(results[i].name);
						}
					}
					response.end("未找到");
				}
			});

		} else {
			response.writeHead(404);
			console.log('404' + request.url);
			response.end(pagePath + '......' + currUrl);
		}
	});
}

function handlePost(urlRES, postData, response) {


	if (urlRES == '/testPost') {
		var Sid = parseInt(postData.id);
		var Sname = util.inspect(postData.name);
		
		response.writeHead(200, {
			"Content-Type": "text/plain;charset=utf-8"
		});
		connection.query("update Person set name=" + Sname + " where id=" + Sid + "", function(error, results, fields) {
			if (error) {
				throw error;
			} else {
				response.end(Sname);
			}
		});

		response.end(util.inspect(postData));

	} else {
		response.writeHead(404);
		console.log('404' + postData.url);
		response.end("404");
	}

}
