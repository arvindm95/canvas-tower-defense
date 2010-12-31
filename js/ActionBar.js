/**
 * Displays and handels the ActionBar
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

ActionBar = new engine.Class({
	objects: null,
	
	init: function() {
		this.objects = new Array();
		
		tower = new DrawableTower(20, 460);
		tower2 = new DrawableSlowTower(80, 460);
		this.objects.push(tower,tower2);
		engine.MouseManager.objects.push(tower,tower2);
	},
	
	update: function() {
		this.draw();
	
		for(var i = 0; i < this.objects.length; i++) {
			e = this.objects[i];
			if(!e || e.del) {
				this.objects.splice(i,1);
				continue;
			}
			e.update();
		}
	},
	
	
	draw: function() {
		engine.canvas.fillStyle = "#ccc";
		engine.canvas.fillRect(0, 450, 1000, 1000);
	}
});