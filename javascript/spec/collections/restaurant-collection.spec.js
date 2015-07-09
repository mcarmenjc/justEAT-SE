describe('app.RestaurantCollection', function() {
	beforeEach(function(){
		this.restaurants = new app.RestaurantCollection();
	});
  	it('should be defined', function() {
    	expect(app.RestaurantCollection).toBeDefined();
  	});
  	it('can be instantiated', function() {
    	expect(this.restaurants).not.toBeNull();
  	});
  	describe('#getRestaurants', function() {
	    beforeEach(function () {
	      	this.server = sinon.fakeServer.create();
	    });

	    afterEach(function() {
	      	this.server.restore();
	    });
	});
});