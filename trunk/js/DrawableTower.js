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
	src: 'images/tower.png',
	spawn: 'Tower',
	range: 150,
	drawRange: false,
	
		
	init: function(x,y,drawRange) {
		this.parent(x, y, this.height, this.width, this.color);
		
		if (drawRange == true) {
			this.drawRange = true;
		}
		
		this.img = new Image();
		this.img.src = this.src;
	},
	
	mouseDown: function(x,y,offsetX,offsetY) {
		tower = new window['Drawable' + this.spawn](x - offsetX, y - offsetY, true);
		engine.tempObjects.push(tower);		
		return tower;
	
	},
	
	drop: function() {
		tower = new window[this.spawn](this.x, this.y);
		engine.MouseManager.objects.push(tower);
		engine.LevelManager.currentLevel.tower.push(tower);
		
		this.remove();
	},
	
	update: function() {
		this.draw();
	},
	
	draw: function() {
		if(this.drawRange){
			this.drawRangeCircle();
		}	
		engine.canvas.drawImage(this.img, this.x, this.y);
	},
	
	drawRangeCircle: function() {
		engine.canvas.beginPath();
		engine.canvas.fillStyle = "rgba(255, 255, 255, 0.2)";
		engine.canvas.arc(this.x+(this.width/2),this.y+(this.width/2),this.range,0,Math.PI*2,true);
		engine.canvas.fill();
		engine.canvas.lineWidth = 1;
		engine.canvas.strokeStyle = "white"; 
		engine.canvas.stroke();
		engine.canvas.closePath();		
	}
});