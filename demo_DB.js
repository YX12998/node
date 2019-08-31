// connect.js
const mysql = require("mysql");

const connection = mysql.createConnection({
	host:"localhost", // 主机地址
	port: 3306, // 端口
	user:"root", // 数据库用户名
	password:"", // 用户密码
	database:"yuan" // 数据库名
});

connection.connect(); //数据库连接

// 作业1 - 编写一段插入一条记录的代码
connection.query("insert into Person(name) values('xiner')",function(error,results,fields){
	if(error){
		throw error;
	}else{
		console.info(results);
	}
}); // 检验连接成功

// connection.query("delete * from Person where id=3",function(error,results,fields){
// 	if(error){
// 		throw error;
// 	}else{
// 		console.info(results);
// 	}
// }); // 检验连接成功
