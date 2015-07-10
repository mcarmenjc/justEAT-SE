describe ('app.ErrorModel', function(){
	var error;
	beforeEach(function(){
		error = new app.ErrorModel();
	});

	it('should be defined', function(){
		expect(app.ErrorModel).toBeDefined();
	});

	it('should not be null', function(){
		expect(error).not.toBeNull();
	});

	describe('at the beginning', function(){
		it('should have default value for message', function(){
			expect(error.get('message')).toEqual('');
		});
	});
});