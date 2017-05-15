var dom = document.getElementById("clock");
var context = dom.getContext("2d");
var width = context.canvas.width;
var height = context.canvas.height;
var r = width/2;
var rem = width / 200;
function drawbackground(){
	context.save();
	context.translate(r,r);
	context.beginPath();
	context.lineWidth = 10 * rem;
	context.arc(0, 0, r - context.lineWidth / 2, 0, 2*Math.PI, false);
	context.stroke();

	var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	context.font = 18 * rem +  "px Arial";
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	hourNumbers.forEach(function(number, i){
		var rad = 2* Math.PI/12 * i;
		var x = Math.cos(rad)*(r-30 * rem);
		var y = Math.sin(rad)*(r-30 * rem);
		context.fillText(number, x, y);	
	});

	for(var i = 0; i<60; i++){
		var rad = 2* Math.PI/60 * i;
		var x = Math.cos(rad)*(r-18 * rem);
		var y = Math.sin(rad)*(r-18 * rem);
		context.beginPath();
		if(i % 5 ==0){
			context.fillStyle = 'black';
		}else{
			context.fillStyle = '#ccc';
		}
		context.arc(x, y, 2 * rem, 0, 2*Math.PI, false);
		context.fill();
	}
}

function drawHour(hour, minute){
	context.save();
	context.beginPath();
	var rad = 2 * Math.PI/12 * hour;
	var mrad = 2 * Math.PI/12/60 * minute;
	context.rotate(rad + mrad);
	context.moveTo(0, 10 * rem);
	context.lineTo(0,-r/2);
	context.lineWidth = 6 * rem;
	context.lineCap = 'round';
	context.stroke();
	context.restore();
}
function drawMinute(minute){
	context.save();
	context.beginPath();
	var rad = 2 * Math.PI/60 * minute;
	context.rotate(rad);
	context.moveTo(0, 10 * rem);
	context.lineTo(0,-r+30 * rem);
	context.lineWidth = 3 * rem;
	context.lineCap = 'round';
	context.stroke();
	context.restore();
}
function drawSecond(second){
	context.save();
	context.beginPath();
	context.fillStyle = "#c14543";
	var rad = 2 * Math.PI/60 * second;
	context.rotate(rad);
	context.moveTo(-2 * rem, 20 * rem);
	context.lineTo(2 * rem,20 * rem);
	context.lineTo(1,-r+18 * rem);
	context.lineTo(-1,-r+18 * rem);
	context.fill();
	context.restore();
}

function drawDot(){
	context.beginPath();
	context.fillStyle = "#fff";
	context.arc(0, 0, 3 * rem, 0, 2*Math.PI, false);
	context.fill();

}

function draw(){
	context.clearRect(0, 0, width, height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawbackground();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	context.restore();
}
draw();
setInterval(draw, 1000);