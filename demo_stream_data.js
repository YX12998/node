'use strict';
var fs = require("fs");

// 创建可读流
var rs = fs.createReadStream('tempFile.txt');

// 设置编码为 utf8。
rs.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
rs.on('data', function(chunk) {
	console.log('DATA:');
	console.log(chunk);
});

rs.on('end',function(){
   console.log('END');
});

rs.on('error', function(err){
   console.log('ERROR: '+err);
});

console.log("程序执行完毕");