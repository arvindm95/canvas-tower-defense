var engine = {
	canvasElement: null, 
	canvas: null,
	
	//temp
	tempObjects: new Array(),
	
	//manager
	MouseManager: null,
	LevelManager: null,
	Player: null,
	ActionBar: null,
	
	//utility
	Utility: null,
	
	main: function(container) {
		//variables
		this.canvasElement = $(container);
		this.canvas = this.canvasElement.get(0).getContext('2d');
		
		//mouse-events
		this.MouseManager = new MouseManager();
		
		//levelmanager
		this.LevelManager = new LevelManager();
		this.LevelManager.load("World1");
		
		//Player
		this.Player = new Player();
		
		//ActionBar
		this.ActionBar = new ActionBar();

		
		//helper
		this.Utility = new Utility();
		
		//mainLoop
		setInterval(function(obj) { obj.mainLoop(); }, 33, this);
	},
	
	mainLoop: function() {
		//manager
		this.MouseManager.update();
		this.LevelManager.update();
		this.Player.update();
		this.ActionBar.update();
		
		//temp objects
		this.handleTempObjects();
	},
	
	handleTempObjects: function() {
		for(var i = 0; i < this.tempObjects.length; i++) {
			e = this.tempObjects[i];
			if(!e || e.del) {
				this.tempObjects.splice(i,1);
				continue;
			}
			e.update();
		}
	},
	
	update: function(l1, l2) {
        for(var i in l2)
            l1[i] = l2[i];
        return l1;
    }
}


engine.Class = function(members) {
	var fn = function() {
		if(arguments[0] != 'no_init') {
			return this.init.apply(this, arguments);
		}
	}
	fn.prototype = members;
	engine.update(fn, engine.Class.prototype);
	return fn;
}

engine.Class.prototype = {
	extend: function(members) {
		var parent = new this('no_init');
		for(k in members) {
			var prev = parent[k];
			var cur = members[k];
			if (prev && prev != cur && typeof cur == 'function') {
				cur = this._parentize(cur, prev);
			}
			parent[k] = cur;
		}
		return new engine.Class(parent);
	},

	implement: function(members) {
		engine.update(this.prototype, members);
	},

	_parentize: function(cur, prev) {
		return function(){
			this.parent = prev;
			return cur.apply(this, arguments);
		}
	}
};
