WayPoint = pba.Abstract.extend({
	
	name: null,
	nextWayPoint: null,
	x: 0,
	y: 0,
	
	init: function(name, nextWayPoint, x, y) {
		this.name = name;
		this.nextWayPoint = nextWayPoint;
		
		this.x = x;
		this.y = y;
	},
	
	getNextWayPoint: function() {
		return pba.LevelManager.currentLevel.wayPoints[this.nextWayPoint - 1];	
	}
		
});