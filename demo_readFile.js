var fs = require("fs");
fs.readFile("tempFile.txt", function(err, data){
	if(err){
		return console.error(err);
	}else{
		console.log(data.toString());
	}
});
console.log("结束");