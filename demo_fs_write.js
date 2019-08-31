'use strict';
var fs = require("fs");

var newLine = '很快就很快就会看好哪款\n';
// 追加
// fs.appendFile('output.txt', newLine, function(err){
// 	if(err){
// 		throw err;
// 	}
// 	console.info("ok");
// });
	
var data = 'hello';
fs.writeFile('output.txt', data, function(err){
	if(err){
		throw err;
	}
	console.info("ok");
});