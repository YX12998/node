var url = require("url");

var hello = require('./demo_module_hello');
hello.word();
hello.yuan();
hello.showParameters();

// var req = "我是req";
// var res = "我是res";
// hello.usingParmeter( req, res );

// 写死, 但实际上, urlString应该来自 request.url
var urlString = "http://www.yuanxin.com/xin/index.html?yuan=qingnian";

var urlObj = url.parse(urlString);
hello.usingParmeter( urlObj );