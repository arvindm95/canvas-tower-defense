SlowBullet = Bullet.extend({
	slow: 1,
		
	update: function() {
		engine.Rectangle.prototype.update.call(this);
		
		if(!this.enemy || this.enemy.del) {
			this.remove();
		} else {		
			if(this.enemy.hitRange(this)) {
				this.enemy.getHit(3);
				this.enemy.getSlowed();
				this.remove();
			} else {
				var newCoords = engine.Utility.runToPoint(this.x, this.y, (this.enemy.x + this.enemy.width/2), (this.enemy.y + this.enemy.height/2), this.speed);
				this.x = newCoords[0];
				this.y = newCoords[1];
			}
		}
		
	}
});