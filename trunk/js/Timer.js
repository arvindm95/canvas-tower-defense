/**
 * Timer class
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

Timer = new engine.Class({
	time: 0,
	finished: false,
	id: 0,
	obj: null,
	
	init: function(t) {
		obj = this;
		obj.id = setTimeout(function(){
			obj.finished = true; 
		}, t*1000);
	}
});