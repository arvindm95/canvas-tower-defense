/**
 * General class for rectangle objects.
 * 
 * @author Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */


/*
 * @see engine.Abstract
 */
engine.Rectangle = engine.Abstract.extend({
	x: 0,	
	y: 0,
	h: 0,
	w: 0,
	color: '#fff',
	
	clickable: false,
	dragable: false,
	hoverable: false,
	hovered: false,
	
	/*
	 * Sets initial variables
	 */
	init: function(x,y,h,w,c) {
		this.setX(x);
		this.setY(y);
		this.setHeight(h);
		this.setWidth(w);
		this.setColor(c);		
	},
	
	/* 
	 * Standard drag function, which moves the dragged object along with the mousepointer
	 */
	drag: function(x,y) {
		this.setX(x);
		this.setY(y);
	},
	
	drop: function() {
		return;
	},
	
	mouseDown: function() {
		return this;
	},
	
	update: function() {
		this.draw();
	},
	
	draw: function(canvas){
		engine.canvas.fillStyle = this.getColor();
		engine.canvas.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight()); 
	},

	mouseIn: function() {
		this.hovered = true;
	},
	
	mouseOut: function() {
		this.hovered = false;
	},
	
	
	
	/* 
	 * --------------------------------------------------
	 * Getter and setter methods
	 * --------------------------------------------------
	 */
	
	setHeight: function(value){
		this.height = value;
	},  
	
	getHeight: function(){
		return this.height;
	},   
	
	setWidth: function(value){
		this.width = value;
	},   
	
	getWidth: function(){
		return this.width;
	},    
	
	getX: function(){
		return this.x;
	},    
	
	getY: function(){
		return this.y;
	},  
	
	setX: function(value){
		this.x = value;
	},  
	
	setY: function(value){
		this.y = value;
	},
	
	setColor: function(value){
		if (value != null && value != ""){
			this.color = value;
		}
	},
	
	getColor: function(){ 
		return this.color;
	},
	
	enableClick: function(){ 
		this.clickable = true;
	},
	
	disableClick: function(){ 
		this.clickable = false;
	},
	
	isClickable: function(){ 
		return this.clickable;
	},
	
	enableDrag: function(){ 
		this.dragable = true;
	},
	
	disableDrag: function(){ 
		this.dragable = false;
	},
	
	isDragable: function(){ 
		return this.dragable;
	},
	
	enableHover: function(){ 
		this.hoverable = true;
	},
	
	disableHover: function(){ 
		this.hoverable = false;
	},
	
	isHoverable: function(){ 
		return this.hoverable;
	},
	
	isHovered: function(){ 
		return this.hovered;
	}	

});