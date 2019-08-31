// 'use strict';
var fs = require("fs");

// 读的要自己建文件
var readerStream = fs.createReadStream('wamp.png','utf-8');

var writeStream = fs.createWriteStream('wampaat.png','utf-8');

readerStream.pipe(writeStream);
// 把读的文件的内容放入写的里面