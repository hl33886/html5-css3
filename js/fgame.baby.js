var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
babyObj.prototype.init = function(){
	this.x = canWidth / 2 - 50;
	this.y = canHeight / 2 + 50;
	this.angle = 0;
}
babyObj.prototype.draw = function(){

	//lerp
	this.x = lerpDistance(mom.x, this.x, 0.98);
	this.y = lerpDistance(mom.y, this.y, 0.98);

	//delta angle
	//Math.atan2(y, x)
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){//大于50 切换尾巴图片
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	//baby eye count
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){//大于interval 切换eye
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}
		if(this.babyEyeCount == 1){
			this.babyEyeInterval = 200;
		}
	}
	//baby body count
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300){//大于interval 切换eye
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			data.gameOver = true;// game over
		}
		
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	var babyEyeCount = this.babyEyeCount;
	var babyBodyCount = this.babyBodyCount;

	ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width / 2 + 23, -babyTail[babyTailCount].height / 2);
	ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width / 2, -babyBody[babyBodyCount].height / 2);
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width / 2, -babyEye[babyEyeCount].height / 2);

	ctx1.restore();
	
}
