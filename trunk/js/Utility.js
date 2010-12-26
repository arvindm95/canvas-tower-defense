/**
 * 
 * 
 * @author Patrick Bauer, Marc Wustrack, Adrian Cieluch
 * @copyright	2010 Firmenname
 * 
 */

Utility = new engine.Class({
	
	init: function() {},
	
	runToPoint: function (x, y, destX, destY, distance) {
	    var x1, x2, y1, y2, dist, scal, xn, yn;
		 		 
		if(x > destX){
			x1 = x;
			x2 = destX;
		} else {
			x1 = destX;
			x2 = x;
		}
			
		if(y > destY) {
			y1 = y;
			y2 = destY;
		} else {
			y1 = destY;
			y2 = y;
		}

		dist = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
		scal = dist / distance;
		xn = parseInt(Math.abs(destX - x) / scal);
		yn = parseInt(Math.abs(destY - y)/ scal);
		
		if (destX <= x && destY <= y ){
			xn = x - xn;
			yn = y - yn;
		} else if (destX <= x && destY >= y ) {
			xn = x - xn;
			yn = y + yn;
		} else if(destX >= x && destY >= y ){
			xn = x + xn;
			yn = y + yn;
		} else if(destX >= x && destY <= y ){
			xn = x + xn;
			yn = y - yn;
		}
		
		newCoords = new Array(xn, yn);
		return newCoords;
	},
	
	getDistance: function(x, y, destX, destY){
		var x1, x2, y1, y2, dist, scal, xn, yn;
					 
		if(x > destX){
			x1 = x;
			x2 = destX;
		} else {
			x1 = destX;
			x2 = x;
		}
			
		if(y > destY) {
			y1 = y;
			y2 = destY;
		} else {
			y1 = destY;
			y2 = y;
		}
	
		dist = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
		return dist;
		
	}
	
});
	