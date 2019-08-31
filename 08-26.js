'use strict';
var fs = require("fs");

// 作业一
const mysql = require("mysql");

const connection = mysql.createConnection({
	host:"localhost", //主机地址
	user:"root", // 数据库用户名
	password:"", // 用户密码
	database:"yuan" // 数据库名
});

connection.connect(); //数据库连接

// 编写一段插入一条记录的代码
connection.query("delete from Person where id=3",function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
	}
}); // 检验连接成功

// 查看
connection.query("select * from Person",function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
	}
}); // 检验连接成功




// 作业二: 周期性的2s触发事件,打印五次时间后变成打印当前时间毫秒数,再五次后恢复时间;
const events = require('events');
var eventEmitter = new events.EventEmitter();
// 声明事件
eventEmitter.on('sj', function() {
	console.info(new Date().getTime());
});
eventEmitter.on('hm', function() {
	console.info(new Date().toLocaleString());
});
// console.info("2秒后触发事件");
var count = 0;
var timer = setInterval(function() {
	// 触发事件
	count++;
	if (count <= 5 || count > 10) {
		eventEmitter.emit('hm');
	}
	if (count > 5 && count <= 10) {
		eventEmitter.emit('sj');
	}
	if (count >= 15) {
		clearInterval(timer);
		console.log("中了!");
	}

}, 200);

// 作业三: 把tempFile.txt内容复制到temp.txt中
var writerStream = fs.createWriteStream('temp.txt', 'utf-8');
var data = fs.readFileSync("tempFile.txt");
writerStream.write(data.toString());
writerStream.end();