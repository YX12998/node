// exports是一个标准的对外接口, 使得require它的模块(实例化)可以直接使用他

// 模块只做声明不做执行!! -- 模块开发原则!!
exports.word = function(){
	console.info("hello world");
}

// 附加 exports的属性不限制个数
exports.yuan = function(){
	console.log("中!!!!!");
}

// 附加 内部变量不会暴露
var foo = "xxxxxx";

function showParameters(){
	var bar = foo + "yyyyyy";
	console.log(bar);
}

exports.showParameters = showParameters;

// 附加 参数的使用
function usingParmeter( url ){
	console.log(url);
	Url {
	  // protocol: 'http:',
	  // slashes: true,
	  // auth: null,
	  // host: 'www.yuanxin.com',
	  // port: null,
	  // hostname: 'www.yuanxin.com',
	  // hash: null,
	  // search: '?yuan=qingnian',
	  // query: 'yuan=qingnian',
	  // pathname: '/xin/index.html',
	  // path: '/xin/index.html?yuan=qingnian',
	  // href: 'http://www.yuanxin.com/xin/index.html?yuan=qingnian' }
	console.log( url.pathname );
}
exports.usingParmeter = usingParmeter;