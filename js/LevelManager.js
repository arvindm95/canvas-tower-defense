/**
 * Manages clicks and other mouse events on the canvas element.
 * 
 * @author Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

LevelManager = new engine.Class({
	currentLevel: null,
	
	init: function() {},
	
	load: function(level) {
		eval("this.currentLevel = new " + level + "();");
		this.currentLevel.start();
	},
	
	update: function() {
		this.currentLevel.update();
	}
});