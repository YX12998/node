// 将一个get请求参数列表转为对象
'use strict'

var url = require('url');
var path = require('path');
var http = require("http");
var util = require('util');
var querystring = require('querystring');

// var urlString = 'http://127.0.0.1:8808/web/200.png?name=yuan&age=22&title=青年';
// var urlParse = url.parse(urlString, true); // 第二个参数表示是否解析其属性值
// console.log(urlParse);
// var params = urlParse.query;
// console.log(params);

// 1. 启动一个服务器,将页面请求参数在页面显示
http.createServer(function(request, response){
	// 拿到了url并进行了对下那个parse(urlString, true), 并取出请求参数
	var currUrl = request.url;
	var queryObj = url.parse(currUrl);
	console.log(currUrl);
	console.log(queryObj);
	// 将请求参数对象转成字符串返回
	var queryObjString = util.inspect(queryObj);
	
	// var root = path.resolve('.');
	// var pathname = url.parse(request.url).pathname;
	// console.log(request.url);
	response.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
	// response.end(root+''+pathname);
	response.end(queryObjString);
	// Url {
	//   protocol: null,
	//   slashes: null,
	//   auth: null,
	//   host: null,
	//   port: null,
	//   hostname: null,
	//   hash: null,
	//   search: null,
	//   query: null,
	//   pathname: '/',
	//   path: '/',
	//   href: '/' }
}).listen(8808);