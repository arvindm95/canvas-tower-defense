Bullet = pba.Rectangle.extend({
	enemy: null,
	speed: 8,
		
	init: function(x,y,h,w,enemy) {
		this.parent(x,y,h,w,'#fff');
		this.enemy = enemy;
		
		this.enemy.willHit(3);
	},

	update: function() {
		this.parent();
		
		if(!this.enemy || this.enemy.del) {
			this.remove();
		} else {		
			if(this.enemy.hitRange(this)) {
				this.enemy.getHit(3);
				this.remove();
			} else {
				var newCoords = pba.Utility.runToPoint(this.x, this.y, (this.enemy.x + this.enemy.width/2), (this.enemy.y + this.enemy.height/2), this.speed);
				this.x = newCoords[0];
				this.y = newCoords[1];
			}
		}
		
	}
});