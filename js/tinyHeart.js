
var can1 = document.getElementById("canvas1");
var can2 = document.getElementById("canvas2");

var ctx1 = can1.getContext("2d");
var ctx2 = can2.getContext("2d");

can1.addEventListener('mousemove', onMouseMove, false);

var canWidth = can1.width;
var canHeight = can1.height;

var lastTime;
var deltaTime;

var bgPic = new Image();
bgPic.src = "images/fish/background.jpg";

var ane;//海葵
var fruit;//果实
var mom;//鱼妈妈
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;
var halo;

var dust;//漂浮物
var dustPic = [];

document.body.onload = game;
function game(){
	ane = new aneObj();
	fruit = new fruitObj();
	mom = new momObj;
	baby = new babyObj;
	data = new dataObj;
	wave = new waveObj;
	halo = new haloObj;
	dust = new dustObj;
	ane.init();
	fruit.init();
	mom.init();
	baby.init();

	mx = canWidth / 2;
	my = canHeight / 2;

	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "images/fish/babyTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "images/fish/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "images/fish/babyFade" + i + ".png";
	}

	for(var i = 0; i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "images/fish/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "images/fish/bigEye" + i + ".png";
	}
	for(var i = 0; i < 8; i++){
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "images/fish/bigSwim" + i + ".png";
		momBodyBlue[i].src = "images/fish/bigSwimBlue" + i + ".png";
	}
	for(var i = 0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "images/fish/dust" + i + ".png";
	}

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave.init();
	halo.init();
	dust.init();

	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
	
};

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;

	background();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();
	momFruitCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();

}

function onMouseMove(e){
	if(data.gameOver) return;
	if(e.offSetX || e.layerX){
		mx = e.offSetX == undefined ? e.layerX : e.offSetX;
		my = e.offSetY == undefined ? e.layerY : e.offSetY;
	}
}

function background(){
	ctx2.drawImage(bgPic, 0, 0, canWidth , canHeight);
}

//海葵
var aneObj = function(){
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = [];
	this.alpha = 0;
	this.num = 50;
}
aneObj.prototype.init = function(){
	for(var i = 0; i<this.num; i++){
		this.rootx[i] = i * 16 +Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 240 + Math.random() * 50;
		this.amp[i] = Math.random() * 80;
	}
	
};
aneObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	for(var i = 0; i<this.num; i++){
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight-150, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
};

