/**
 * Sets its state to finished after a given amount of time
 * 
 * @author 		Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

Timer = new engine.Class({
	finished: false,
	time: 0,
	
	init: function(t) {
		this.time = t;
		this.startTimer();
	},
	
	startTimer: function() {
		setTimeout(function(obj){
			obj.finished = true; 
		}, this.time, this);
	}
});