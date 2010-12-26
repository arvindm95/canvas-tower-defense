engine.Abstract = new engine.Class({
	del: 0,	
	
	remove: function() {
		this.del = 1;
	}
});