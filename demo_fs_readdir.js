'use strict';

var fs = require('fs');
console.info("查看目录");
// fs.rmdir(path, callback); // 删除目录
// var pathName = './'; // 当前目录
// var pathName = '/'; // 磁盘目录
var pathName = '../'; // 上层目录
fs.readdir(pathName, function(err, files){
	if(err){
		return console.error(err);
	}
	
	files.forEach(function(file){
		console.log(file);
	});
});