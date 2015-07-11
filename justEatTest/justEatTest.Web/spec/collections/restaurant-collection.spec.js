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
});