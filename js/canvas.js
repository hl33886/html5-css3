window.onload = function(){
	var canvas = document.getElementById("canvas");
	canvas.width = 1024;
	canvas.height = 768;

	var context = canvas.getContext("2d");

	context.beginPath();//路径定义的首尾
	context.moveTo(100,100);
	context.lineTo(300,300);
	context.lineTo(100,300);
	context.lineTo(100,100);
	context.closePath();

	// context.fillStyle = "rgb(2,100,30)";//填充色
	// context.fill();
	context.lineWidth = 5;
	context.strokeStyle = "red";
	context.stroke();

	context.beginPath();
	context.moveTo(200,100);
	context.lineTo(300,200);
	context.closePath();

	context.strokeStyle = "black";
	context.stroke();

}