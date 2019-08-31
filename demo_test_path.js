"use strict"
var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require("http");


var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

var server = http.createServer(function(request, response) {

	// 获取url的path
	var pathname = url.parse(request.url).pathname;

	// 获取本地文件路径
	// var filepath = path.join(root, pathname, 'index.html');
	// console.info("输出目录---" + filepath);
	if(pathname == "/"){
		var filepath = path.join(root, pathname, 'index.html');
	}else{
		var filepath = path.join(root, pathname);
	}

	fs.stat(filepath, function(err, stats) {
		if (!err && stats.isFile()) {
			console.log('200' + request.url);
			response.writeHead(200);
			// fileStream1 是buffer
			var fileStream1 = fs.createReadStream(filepath);
			fileStream1.pipe(response);
		} else {
			console.log('404' + request.url);
			response.writeHead(404);
			response.end('404 not found');
			
		}
	});
});


server.listen(8808);
console.log("Server running at http://127.0.0.1:8888/");
