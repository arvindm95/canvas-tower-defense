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
	clickHandler: function(el) {
		if(!this.gotDragged) {
			this.updateMouse(el);
			
			for(var i = this.objects.length - 1; i >= 0; i--) {
				e = this.objects[i];
				if(e.isClickable() && this.inRange(e)) {
					try {
						e.click();
					} catch(err) {}
					break;
				}
			}
		}
	},
	
	mouseDownHandler: function(el) {
		this.updateMouse(el);
		this.gotDragged = false;
		
		for(var i = this.objects.length - 1; i >= 0; i--) {
			var e = this.objects[i];
			
			if(e.isDragable() && this.inRange(e)) {
				this.offsetX = this.mouseX - e.x;
				this.offsetY = this.mouseY - e.y;
				
				this.dragElement = e.mouseDown(this.mouseX, this.mouseY, this.offsetX, this.offsetY);
				
				if (!this.dragElement || this.dragElement == null) 
					this.dragElement = e;
				
				break;
			}
		}
	},
	
	mouseMoveHandler: function(el) {
		this.updateMouse(el);
		
		if(this.dragElement != null) {
			this.gotDragged = true;
			this.dragElement.drag(this.mouseX, this.mouseY, this.offsetX, this.offsetY);
		} else {
			if(this.hoverElement != null && !this.inRange(this.hoverElement)) {
				try {
					this.hoverElement.mouseOut();
				} catch(err) {}
				this.hoverElement = null;
			}
			
			if(this.hoverElement == null) {
				for(var i = this.objects.length - 1; i >= 0; i--) {
					var e = this.objects[i];
					if(e.isHoverable() && this.inRange(e)) {
						this.hoverElement = this.objects[i];
						try {
							this.hoverElement.mouseIn();
						} catch(err) {}
						break;
					}
				}
			}
		}
	},
	
	mouseUpHandler: function(el) {
		if(this.dragElement != null) {
			this.updateMouse(el);
			try {
				this.dragElement.drop(this.mouseX, this.mouseY, this.offsetX, this.offsetY);
			} catch(err) {}
			this.dragElement = null;
		}
	},
	
	updateMouse: function(el) {
		this.mouseX = parseInt(el.pageX - engine.canvasElement.offset().left);
		this.mouseY = parseInt(el.pageY - engine.canvasElement.offset().top);
	},
	
	inRange: function(e) {
		return (this.mouseX > e.getX() && this.mouseX < (e.getX() + e.getWidth()) && this.mouseY > e.getY() && this.mouseY < (e.getY() + e.getHeight()));
	},
	
	handleClick: function() { 
		engine.canvasElement.bind("click", function(el) {
			engine.MouseManager.clickHandler(el);
		});
	},
	
	handleDrag: function() {
		engine.canvasElement.bind("mousedown", function(el) {
			engine.MouseManager.mouseDownHandler(el);
		});
		
		engine.canvasElement.bind("mousemove", function(el) {
			engine.MouseManager.mouseMoveHandler(el);
		});
		
		engine.canvasElement.bind("mouseup", function(el) {
			engine.MouseManager.mouseUpHandler(el);
		});
		
	}
});