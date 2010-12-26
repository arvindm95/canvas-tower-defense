Tower = pba.Rectangle.extend({
	range: 50,
	shootSpeed: 30,
	shootDelay: null,
	shots: null,
	img: null,
	hoverable: true,
	
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
				this.shots.push(new Bullet(this.x, this.y, 2, 2, enemy));
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
		for(var i = 0; i < pba.LevelManager.currentLevel.monster.length; i++) {
			e = pba.LevelManager.currentLevel.monster[i];
			if(!e.disabled) {
				return e;
			}
		}
		return null;
	},
	
	draw: function() {
		if(this.isHovered()) {
				
		}
		pba.canvas.drawImage(this.img, this.x, this.y);
	}
	
});