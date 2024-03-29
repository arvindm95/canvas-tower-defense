engine.RunnableObject = engine.Rectangle.extend({
	nextWayPoint: null,
	speed: 4,
		
	init: function(h,w,color) {
		this.parent(0,0,h,w,color);
		
		//start at first wayPoint
		this.x = engine.LevelManager.currentLevel.wayPoints[0].x;
		this.y = engine.LevelManager.currentLevel.wayPoints[0].y;
		
		//get next waypoint
		this.nextWayPoint = engine.LevelManager.currentLevel.wayPoints[0].getNextWayPoint();
	},

	update: function() {
		
		if(this.x == this.nextWayPoint.x && this.y == this.nextWayPoint.y) {
			this.nextWayPoint = this.nextWayPoint.getNextWayPoint();
		} else {
			var newCoords = engine.Utility.runToPoint(this.x, this.y, this.nextWayPoint.x, this.nextWayPoint.y, this.speed);
			this.x = newCoords[0];
			this.y = newCoords[1];
		}
		
		this.parent();
	}
});