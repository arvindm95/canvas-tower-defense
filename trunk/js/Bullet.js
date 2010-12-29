Bullet = engine.Rectangle.extend({
	enemy: null,
	speed: 8,
	damage: 3,
		
	init: function(x,y,h,w,enemy) {
		this.parent(x,y,h,w,'#fff');
		this.enemy = enemy;
		
		this.enemy.willHit(this.damage);
	},

	update: function() {
		this.parent();
		
		if(!this.enemy || this.enemy.del) {
			this.remove();
		} else {		
			if(this.enemy.hitRange(this)) {
				this.enemy.getHit(this.damage);
				this.remove();
			} else {
				var newCoords = engine.Utility.runToPoint(this.x, this.y, (this.enemy.x + this.enemy.width/2), (this.enemy.y + this.enemy.height/2), this.speed);
				this.x = newCoords[0];
				this.y = newCoords[1];
			}
		}
		
	}
});