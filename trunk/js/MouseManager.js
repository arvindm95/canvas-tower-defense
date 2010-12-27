/**
 * Manages clicks and other mouse events on the canvas element.
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

MouseManager = new engine.Class({
	objects: null,
	dragElement: null,
	gotDragged: false,
	hoverElement: null,
	offsetX: 0,
	offsetY: 0,
	mouseX: 0,
	mouseY: 0,
	
	init: function() {
		this.objects = new Array();
	
		this.handleClick();
		this.handleDrag();
	},
	
	update: function() {
		this.garbageCollector();
	},
	
	garbageCollector: function() {
		for(var i = 0; i < engine.MouseManager.objects.length; i++) {
				e = engine.MouseManager.objects[i];
				if(!e || e.del) {
					engine.MouseManager.objects.splice(i,1);
				}
			}
	},
	
	/**
	 * Runs backwards through all visible objects and triggers
	 * the click function of the first clickable object
	 */
	handleClick: function() { 
		engine.canvasElement.bind("click", function(el) {
			if(!engine.MouseManager.gotDragged) {
				engine.MouseManager.updateMouse(el);
				
				for(var i = engine.MouseManager.objects.length - 1; i >= 0; i--) {
					e = engine.MouseManager.objects[i];
					if(e.isClickable() && engine.MouseManager.inRange(e)) {
						try {
							e.click();
						} catch(err) {}
						break;
					}
				}
			}
		});
	},
	
	handleDrag: function() {
		engine.canvasElement.bind("mousedown", function(el) {
			engine.MouseManager.updateMouse(el);
			engine.MouseManager.gotDragged = false;
			
			for(var i = engine.MouseManager.objects.length - 1; i >= 0; i--) {
				var e = engine.MouseManager.objects[i];
				if(e.isDragable() && engine.MouseManager.inRange(e)) {
					engine.MouseManager.dragElement = e.mouseDown();
					engine.MouseManager.offsetX = engine.MouseManager.mouseX - e.x;
					engine.MouseManager.offsetY = engine.MouseManager.mouseY - e.y;
					
					if (!engine.MouseManager.dragElement || engine.MouseManager.dragElement == null) 
						engine.MouseManager.dragElement = e;
					
					break;
				}
			}
		});
		
		engine.canvasElement.bind("mousemove", function(el) {
			engine.MouseManager.updateMouse(el);
			
			if(engine.MouseManager.dragElement != null) {
				engine.MouseManager.gotDragged = true;
				engine.MouseManager.dragElement.drag(engine.MouseManager.mouseX - engine.MouseManager.offsetX, engine.MouseManager.mouseY - engine.MouseManager.offsetY);
			} else {
				if(engine.MouseManager.hoverElement != null && !engine.MouseManager.inRange(engine.MouseManager.hoverElement)) {
					try {
						engine.MouseManager.hoverElement.mouseOut();
					} catch(err) {}
					engine.MouseManager.hoverElement = null;
				}
				
				if(engine.MouseManager.hoverElement == null) {
					for(var i = engine.MouseManager.objects.length - 1; i >= 0; i--) {
						var e = engine.MouseManager.objects[i];
						if(e.isHoverable() && engine.MouseManager.inRange(e)) {
							engine.MouseManager.hoverElement = engine.MouseManager.objects[i];
							try {
								engine.MouseManager.hoverElement.mouseIn();
							} catch(err) {}
							break;
						}
					}
				}
			}
		});
		
		engine.canvasElement.bind("mouseup", function(el) {
			if(engine.MouseManager.dragElement != null) {
				engine.MouseManager.updateMouse(el);
				try {
					engine.MouseManager.dragElement.drop(engine.MouseManager.mouseX - engine.MouseManager.offsetX, engine.MouseManager.mouseY - engine.MouseManager.offsetY);
				} catch(err) {}
				engine.MouseManager.dragElement = null;
			}
		});
		
	},
	
	updateMouse: function(el) {
		this.mouseX = parseInt(el.pageX - engine.canvasElement.offset().left);
		this.mouseY = parseInt(el.pageY - engine.canvasElement.offset().top);
	},
	
	inRange: function(e) {
		return (this.mouseX > e.getX() && this.mouseX < (e.getX() + e.getWidth()) && this.mouseY > e.getY() && this.mouseY < (e.getY() + e.getHeight()));
	}
});