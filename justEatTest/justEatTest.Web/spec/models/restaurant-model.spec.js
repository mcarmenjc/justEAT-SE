describe('app.RestaurantModel', function() {
	beforeEach(function(){
		this.restaurant = new app.RestaurantModel();
	});
  	it('should be defined', function() {
    	expect(app.RestaurantModel).toBeDefined();
  	});
  	it('can be instantiated', function() {
    	expect(this.restaurant).not.toBeNull();
  	});
  	describe('at the beginning', function() {
	    it('should have default value for name', function(){
	    	expect(this.restaurant.get('name')).toEqual('');
	    });
	    it('should have default value for ratingStars', function(){
	    	expect(this.restaurant.get('ratingStars')).toEqual(0);
	    });
	    it('should have default value for numberOfRatings', function(){
	    	expect(this.restaurant.get('numberOfRatings')).toEqual(0);
	    });
	    it('should have default value for cuisineTypes', function(){
	    	expect(this.restaurant.get('cuisineTypes')).toBeUndefined();
	    });
	}); 
});