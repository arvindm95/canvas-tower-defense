/**
 * 
 * 
 * @author 	Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

DrawableTower = engine.Rectangle.extend({
	img: null,
	dragable: true,
	width:13,
	height: 31,
	color: '#f00',
	
	init: function(x,y) {
		this.parent(x, y, this.height, this.width, this.color);
		
		this.img = new Image();
		this.img.src = 'images/tower.png';
	},
	
	mouseDown: function(x,y,offsetX,offsetY) {
		tower = new DrawableTower(x - offsetX, y - offsetY);
		engine.tempObjects.push(tower);
		return tower;
	},
	
	drop: function() {
		tower = new Tower(this.x, this.y);
		engine.MouseManager.objects.push(tower);
		engine.LevelManager.currentLevel.tower.push(tower);
		
		this.remove();
	},
	
	update: function(x,y) {
		this.draw(x,y);
	},
	
	draw: function(x,y) {
		engine.canvas.drawImage(this.img, (x == null) ? this.x : x, (y == null) ? this.y : y);
	}
});