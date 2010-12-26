/**
 * Manages clicks and other mouse events on the canvas element.
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

MouseManager = new pba.Class({
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
		for(var i = 0; i < pba.MouseManager.objects.length; i++) {
				e = pba.MouseManager.objects[i];
				if(!e || e.del) {
					pba.MouseManager.objects.splice(i,1);
				}
			}
	},
	
	/**
	 * Runs backwards through all visible objects and triggers
	 * the click function of the first clickable object
	 */
	handleClick: function() { 
		pba.canvasElement.bind("click", function(el) {
			if(!pba.MouseManager.gotDragged) {
				pba.MouseManager.updateMouse(el);
				
				for(var i = pba.MouseManager.objects.length - 1; i >= 0; i--) {
					e = pba.MouseManager.objects[i];
					if(e.isClickable() && pba.MouseManager.inRange(e)) {
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
		pba.canvasElement.bind("mousedown", function(el) {
			pba.MouseManager.updateMouse(el);
			pba.MouseManager.gotDragged = false;
			
			for(var i = pba.MouseManager.objects.length - 1; i >= 0; i--) {
				var e = pba.MouseManager.objects[i];
				if(e.isDragable() && pba.MouseManager.inRange(e)) {
					pba.MouseManager.dragElement = pba.objects[i];
					pba.MouseManager.offsetX = pba.MouseManager.mouseX - e.x;
					pba.MouseManager.offsetY = pba.MouseManager.mouseY - e.y;
					break;
				}
			}
		});
		
		pba.canvasElement.bind("mousemove", function(el) {
			pba.MouseManager.updateMouse(el);
			
			if(pba.MouseManager.dragElement != null) {
				pba.MouseManager.gotDragged = true;
				pba.MouseManager.dragElement.drag(pba.MouseManager.mouseX - pba.MouseManager.offsetX, pba.MouseManager.mouseY - pba.MouseManager.offsetY);
			} else {
				if(pba.MouseManager.hoverElement != null && !pba.MouseManager.inRange(pba.MouseManager.hoverElement)) {
					try {
						pba.MouseManager.hoverElement.mouseOut();
					} catch(err) {}
					pba.MouseManager.hoverElement = null;
				}
				
				if(pba.MouseManager.hoverElement == null) {
					for(var i = pba.MouseManager.objects.length - 1; i >= 0; i--) {
						var e = pba.MouseManager.objects[i];
						if(e.isHoverable() && pba.MouseManager.inRange(e)) {
							pba.MouseManager.hoverElement = pba.MouseManager.objects[i];
							try {
								pba.MouseManager.hoverElement.mouseIn();
							} catch(err) {}
							break;
						}
					}
				}
			}
		});
		
		pba.canvasElement.bind("mouseup", function(el) {
			if(pba.MouseManager.dragElement != null) {
				pba.MouseManager.updateMouse(el);
				try {
					pba.MouseManager.dragElement.drop(pba.MouseManager.mouseX - pba.MouseManager.offsetX, pba.MouseManager.mouseY - pba.MouseManager.offsetY);
				} catch(err) {}
				pba.MouseManager.dragElement = null;
			}
		});
		
	},
	
	updateMouse: function(el) {
		this.mouseX = parseInt(el.pageX - pba.canvasElement.offset().left);
		this.mouseY = parseInt(el.pageY - pba.canvasElement.offset().top);
	},
	
	inRange: function(e) {
		return (this.mouseX > e.getX() && this.mouseX < (e.getX() + e.getWidth()) && this.mouseY > e.getY() && this.mouseY < (e.getY() + e.getHeight()));
	}
});