'use strict'; // 启用严格模式
var http = require("http");
http.createServer(function(request, response){
	// 查看请求的信息
	console.log(request.method + ': ' + request.url);
	// 发送HTTP头部
	response.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
	// response.setCharacterEncoding('utf-8');
	response.end("袁鑫\n");
}).listen(8808);
console.log("Server running at http://127.0.0.1:8888/");