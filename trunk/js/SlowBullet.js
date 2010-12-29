SlowBullet = Bullet.extend({
	damage: 1,
		
	hitEnemy: function() {
		this.enemy.getHit(this.damage);
		this.enemy.getSlowed();		
	}
});