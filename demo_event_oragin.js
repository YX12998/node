'use strict';

const events = require('events');
var eventEmitter = new events.EventEmitter();
// 声明事件
// eventEmitter.on('xx',function(){
// 	console.info(new Date().toLocaleString());
// });
// console.info("2秒后触发事件");
// setTimeout(function(){
// 	// 触发事件
// 	eventEmitter.emit('xx');
// }, 2000);

// 周期性的2s触发事件,打印五次时间后变成打印当前时间毫秒数,再五次后恢复时间; 不准用计数器
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

}, 2000);
