Monster = engine.RunnableObject.extend({
	maxHP: 150,
	hp: 0,
	temphp: 0,
	disabled: false,
	
	init: function(x,y,h,w,color) {
		this.parent(x,y,h,w,color);
		this.temphp = this.maxHP;
		this.hp = this.maxHP;
	},
	
	update: function() {
		this.parent();
	},
	
	getHit: function(damage) {
		this.hp = this.hp - damage;
		if (this.hp <= 0) {
			this.die();
		}
	},
	
	willHit: function(damage) {
		this.temphp = this.temphp - damage;
		if (this.temphp <= 0) {
			this.disabled = true;
		}
	},
	
	hitRange: function(el) {
		return (el.getX() > this.getX() && el.getX() < (this.getX() + this.getWidth()) && el.getY() > this.getY() && el.getY() < (this.getY() + this.getHeight()));
	},
 	
	draw: function() {
		this.parent();
		
		engine.canvas.fillStyle = "#0f0";
		engine.canvas.fillRect(this.x - 7, this.y - 10, Math.round(this.hp/(this.maxHP/24)) + 1, 3);
		engine.canvas.fillText(Math.round(this.hp), this.x - 30, this.y - 10); 		
	},
	
	die: function(){
		this.remove();
	}
});