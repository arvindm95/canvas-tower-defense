World1 = new engine.Class({
	tickCounter:30,
	monsterCounter:0,
	monster: null,
	tower: null,
	wayPoints: null,
	
    init: function() {
		this.tower = new Array();
		this.monster = new Array();
		this.wayPoints = new Array();
	},
	
	start: function() {
		this.initWayPoints();
		this.initTower();
	},
	
	initWayPoints: function() {
		this.wayPoints.push(new WayPoint(1, 2, 70, 70));
		this.wayPoints.push(new WayPoint(2, 3, 80, 400));
		this.wayPoints.push(new WayPoint(3, 1, 400, 150));
	},
	
	initTower: function() {
		tower1 = new SlowTower(50, 50, 25, 32, '#f00');
		tower2 = new SlowTower(50, 400, 25, 32, '#f00');
		tower3 = new SlowTower(650, 50, 25, 32, '#f00');
		tower4 = new SlowTower(650, 400, 25, 32, '#f00');
		
		this.tower.push(tower1, tower2, tower3, tower4);
		engine.MouseManager.objects.push(tower1, tower2, tower3, tower4);
	},
	
	update: function() {
		this.garbageCollector();		
		this.draw();
		this.checkWave();
		this.updateMonster();
		this.updateTower();
		this.spawnMonster();
	},
	
	checkWave: function() {
		if(this.monster.length <= 0) {
			this.monsterCounter = 0;
		}
	},
	
	updateMonster: function() {
		for(var i = 0; i < this.monster.length; i++) {
			this.monster[i].update();
		}
	},
	
	updateTower: function() {
		for(var i = 0; i < this.tower.length; i++) {
			this.tower[i].update();
		}
	},
	
	spawnMonster: function() {
		if(this.tickCounter >= 20 && this.monsterCounter < 1) {
			this.monster.push(new Monster(10, 10, "#00f"));
			this.tickCounter = 0;
			this.monsterCounter++;
		}		
		this.tickCounter++;
	},
	
	garbageCollector: function() {
		for(var i = 0; i < this.monster.length; i++) {
			e = this.monster[i];
			if(!e || e.del) {
				this.monster.splice(i,1);
			}
		}
	},
	
    draw: function() {
		engine.canvas.fillStyle = '#000';
		engine.canvas.fillRect(0,0,1000,1000);
	}
});