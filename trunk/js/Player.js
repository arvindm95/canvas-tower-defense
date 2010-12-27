/**
 * Player class
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

Player = new engine.Class({
	points: 0,
	
	init: function() {
	},
	
	update: function() {
		this.draw();
	},
	
	addPoints: function(p) {
		this.points = this.points + p;
	},
	
	getPoints: function() {
		return this.points;
	},
	
	draw: function() {
		engine.canvas.fillStyle = "#fff";
		engine.canvas.fillText(this.points + " Points", 300, 10);		
	}
});