SlowTower = Tower.extend({
	shootSpeed: 30,
	
	init: function(x,y,h,w,color) {
		this.parent(x,y,h,w,color);
		this.shootDelay = this.shootSpeed;
		this.shots = new Array();		
		this.img = new Image();
		this.img.src = 'images/tower.png';
	},
	
	update: function() {
		this.parent();
		this.garbageCollector();
		this.updateShots();
		this.handleShooting();
	},
	
	updateShots: function(){
		for(var i = 0; i < this.shots.length; i++) {
			this.shots[i].update();
		}
	},
	
	handleShooting: function() {
		if(this.shootDelay <= 0) {
			enemy = this.getEnemieInRange();
			if(enemy) {			
				this.shots.push(new SlowBullet(this.x, this.y, 2, 2, enemy));
				this.shootDelay = this.shootSpeed;
			}		
		}
		this.shootDelay--;
	},
	
	garbageCollector: function() {
		for(var i = 0; i < this.shots.length; i++) {
			if(!this.shots[i] || this.shots[i].del) {
				this.shots.splice(i,1);
			}
		}
	},
	
	getEnemieInRange: function() {
		for(var i = 0; i < engine.LevelManager.currentLevel.monster.length; i++) {
			e = engine.LevelManager.currentLevel.monster[i];
			if(!e.disabled && (engine.Utility.getDistance(this.x, this.y, e.x, e.y) <= this.range)) {
				return e;
			}
		}
		return null;
	},
	
	draw: function() {
		if(this.isHovered()){
			engine.canvas.beginPath();
			engine.canvas.fillStyle = "rgba(255, 255, 255, 0.2)";
			engine.canvas.arc(this.x+(this.width/2),this.y+(this.width/2),this.range,0,Math.PI*2,true);
			engine.canvas.fill();
			engine.canvas.lineWidth = 1;
			engine.canvas.strokeStyle = "white"; 
			engine.canvas.stroke();
			engine.canvas.closePath();
		}
		engine.canvas.drawImage(this.img, this.x, this.y);
	}
	
});