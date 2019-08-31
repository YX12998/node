'use strict'

var url = require('url');
var path = require('path');
var http = require("http");

console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

// 解析当前目录:
var workDir = path.resolve('.'); // '/Users/michael'
var filePath = path.join(workDir,'pub','index.html');
console.info("输出目录 - " + filePath);

// 启动服务器
http.createServer(function(request, response){
	// 查看请求信息
	console.log('--请求方法--'+request.method +'--请求地址--' +request.url);
	// 发送HTTP头部
	response.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
	// response.setCharacterEncoding('utf-8');
	response.end("你在看孤独的风景\n");
}).listen(8808);
console.log("Server running at http://127.0.0.1:8808/");