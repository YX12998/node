'use strict';

var fs = require('fs');

// {recursive:true} 递归
// 创建目录 /yu -- 在磁盘根目录 ./yu -- 当前目录 ../yu -- 上层目录
fs.mkdir('./yu/an', { recursive:true }, function(err){
	if(err){
		console.info(err);
	}else{
		console.info("创建成功");
	}
});
