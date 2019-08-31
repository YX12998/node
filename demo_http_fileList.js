'use strict';

var http = require('http'),
	fs = require('fs'),
	path = require('path');

var fileString = '';
var pathname = './web';
fs.readdir(pathname, function(err, files) {
	if (err) {
		return console.error(err);
	}

	files.forEach(function(file) {
		// console.log(fileString += file + '\n');
		fileString += file + '\n';
	});
});

var server = http.createServer(function(request, response) {

	response.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.end(fileString);
});
server.listen(8808);

// 启动服务器
// readdir()
// 拼接返回值
// respon.end

