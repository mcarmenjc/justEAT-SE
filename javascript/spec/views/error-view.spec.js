describe ('app.ErrorView', function(){
	var error;
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		try{
			loadFixtures('index-fixture.html');	
		}
        catch(ex){
        	jasmine.getFixtures().fixturesPath = 'fixtures';
        	loadFixtures('index-fixture.html');
        }
		var errorModel = new app.ErrorModel({message: 'Yeah!'});
		error = new app.ErrorView({model: errorModel});
	});

	it('should be defined', function(){
		expect(error).toBeDefined();
	});

	it('should not be null', function(){
		expect(error).not.toBeNull();
	});

	it('should have className defined', function(){
		expect(error.className).toBeDefined();
		expect(error.className).toEqual('mdl-cell mdl-cell--12-col mdl-cell--middle mdl-typography--text-center');
	});

	describe('when initializing', function(){
		it('should associate template with the element in the DOM', function(){
			expect(error.template).toBeDefined();
		});
	});

	describe('when rendering', function(){
		it('should create a error element with the proper message', function(){
			error.render();
			expect(error.$el).toContainText('Yeah!');
		});
	});
});