
//果实
var fruitObj = function(){
	 this.alive = [];
	 this.x = [];
	 this.y = [];
	 this.aneNO = [];
	 this.l = [];//图片的尺寸
	 this.spd = [];//果实的飘的速度，成长速度
	 this.fruitType = [];
	 this.num = 15;
	 this.orange = new Image();
	 this.blue = new Image();
}
fruitObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.l[i] = 0;
		this.fruitType[i] = "";
		this.spd[i] = Math.random() * 0.006 + 0.004;
	}
	this.orange.src = "images/fish/fruit.png";
	this.blue.src = "images/fish/blue.png";
};
fruitObj.prototype.draw = function(){
	for(var i = 0; i < this.num; i++){
		if(this.alive[i]){
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
			if(this.l[i]<=14){//最大尺寸
				this.x[i] = ane.headx[this.aneNO[i]];
				this.y[i] = ane.heady[this.aneNO[i]];
				this.l[i] += this.spd[i] * deltaTime;
				
			}else{//长大之后，开始向上飘，Y坐标值减少
				this.y[i] -= this.spd[i] * 5 * deltaTime;
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i]/2, this.y[i] - this.l[i]/2, this.l[i], this.l[i]);
			if(this.y[i]< 10){
				this.alive[i] = false;
			}
		}
	}
}

fruitObj.prototype.born = function(i){
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
	
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;	
}
function fruitMonitor(){
	var num = 0;
	for(var i = 0; i<fruit.num; i++){
		if(fruit.alive[i]) num++;
	}
	if(num < 15){
		sendFruit();
		return;
	}
}
function sendFruit(){
	for(var i = 0; i<fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			fruit.alive[i] = true;
			return;
		}
	}
}

//鱼妈妈
var momObj = function(){
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	//this.momBodyTimer = 0;
	this.momBodyCount = 0;	
}
momObj.prototype.init = function(){
	this.x = canWidth / 2;
	this.y = canHeight / 2;
	this.angle = 0;
}
momObj.prototype.draw = function(){

	//lerp
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle
	//Math.atan2(y, x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//baby tail count
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50){//大于50 切换尾巴图片
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//baby eye count
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval){//大于interval 切换eye
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;

		if(this.momEyeCount == 0){
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}
		if(this.momEyeCount == 1){
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	var momEyeCount = this.momEyeCount;
	var momBodyCount = this.momBodyCount;

	if(data.double == 1){
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width / 2, -momBodyOra[momBodyCount].height / 2);	
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyOra[momBodyCount].width / 2, -momBodyOra[momBodyCount].height / 2);	
	}
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width / 2, -momEye[momEyeCount].height / 2);
	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width / 2 + 28, -momTail[momTailCount].height / 2);

	ctx1.restore();
	
}
//判断大鱼和果实的距离
function momFruitCollision(){
	if(data.gameOver){return;}
	for(var i = 0; i < fruit.num; i++){
		if(fruit.alive[i]){
			//calculate length
			var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if(l<990){
				fruit.dead(i);
				data.fruitNum++;
				mom.momBodyCount++;
				mom.momBodyCount > 7 ? mom.momBodyCount = 7 : mom.momBodyCount = mom.momBodyCount;
				if(fruit.fruitType[i] == "blue"){
					data.double = 2;
				}
				wave.born(fruit.x[i], fruit.y[i]);
			}
		}
	}
}
//判断大鱼和小鱼的距离
function momBabyCollision(){
	//calculate length
	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if(l < 990){
			//baby recover
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			data.addScore();
			halo.born(baby.x, baby.y);
		}		
	}

}