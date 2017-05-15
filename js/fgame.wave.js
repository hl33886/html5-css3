var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
	for(var i =0; i < this.num; i++){
		this.x[i] = 0;
		this.y[i] = 0;
		this.alive[i] = false;
		this.r[i] = 0;
	}
};
waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white"
	for(var i =0; i < this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.04; 
			if(this.r[i] > 50){
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.strokeStyle = "rgba(255, 255, 255, " + alpha +")";

			ctx1.closePath();
			ctx1.stroke();
		}		
	}
	ctx1.restore();

};
waveObj.prototype.born = function(x, y){
	for(var i =0; i < this.num; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}		
	}

};

var haloObj = function(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
	this.num = 5;

}
haloObj.prototype.init = function(){
	for(var i =0; i < this.num; i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
haloObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "rgba(203, 91, 0, 1)";
	for(var i =0; i < this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.005; 
			if(this.r[i] > 80){
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 80;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.strokeStyle = "rgba(203, 91, 0, " + alpha +")";
			ctx1.closePath();
			ctx1.stroke();
		}		
	}
	ctx1.restore();

};
haloObj.prototype.born = function(x, y){
	for(var i =0; i < this.num; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}	
	}

};