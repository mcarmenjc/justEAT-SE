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
	    it('should have default value for Name', function(){
	    	expect(this.restaurant.get('Name')).toEqual('');
	    });
	    it('should have default value for RatingStars', function(){
	    	expect(this.restaurant.get('RatingStars')).toEqual(0);
	    });
	    it('should have default value for NumberOfRatings', function(){
	    	expect(this.restaurant.get('NumberOfRatings')).toEqual(0);
	    });
	    it('should have default value for CuisineTypes', function(){
	    	expect(this.restaurant.get('CuisineTypes')).toBeUndefined();
	    });
	}); 
});