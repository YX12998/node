var fs = require("fs"); // 文件模块
// 异步
// node.js中所有的异步操作都要带有
var data = fs.readFileSync('tempfile.txt');

console.log(data.toString());
console.log("结束,在我之后还是之前");