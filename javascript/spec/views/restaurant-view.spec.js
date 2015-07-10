describe ('app.RestaurantView', function(){
	var view;
	beforeEach(function(){
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
        try{
            loadFixtures('index-fixture.html'); 
        }
        catch(ex){
            jasmine.getFixtures().fixturesPath = 'fixtures';
            loadFixtures('index-fixture.html');
        } 
        var model = new app.RestaurantModel({
        	'Id': 12237,
            'Name': 'Spicy Indian',
            'Address': '226 Bensham Manor Road',
            'Postcode': 'CR7 7AW',
            'City': 'London',
            'CuisineTypes': [
                {
                    'Id': 31,
                    'Name': 'Indian',
                    'SeoName': null
                }
            ],
            'Url': 'http://spicyindian.just-eat.co.uk',
            'IsOpenNow': true,
            'IsSponsored': true,
            'IsNew': false,
            'IsTemporarilyOffline': false,
            'ReasonWhyTemporarilyOffline': 'Proactive Temp Offline - Onlined',
            'UniqueName': 'spicyindian',
            'IsCloseBy': false,
            'IsHalal': false,
            'DefaultDisplayRank': 4,
            'IsOpenNowForDelivery': true,
            'IsOpenNowForCollection': true,
            'RatingStars': 5.16,
            'Logo': [
                {
                    'StandardResolutionURL': 'http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/12237.gif'
                }
            ],
            'Deals': [
                {
                    'Description': '20% off when you spend £22',
                    'DiscountPercent': '20',
                    'QualifyingPrice': '22.00'
                }
            ],
            'NumberOfRatings': 265
        });
		view = new app.RestaurantView({model: model});
	});

	it('should be defined', function(){
		expect(view).toBeDefined();
	});

	it('should not be null', function(){
		expect(view).not.toBeNull();
	});

    it('should have className defined', function(){
        expect(view.className).toBeDefined();
        expect(view.className).toEqual('mdl-cell mdl-cell--4-col');
    });

	describe('when initializing', function(){
		it('should associate template with the element in the DOM', function(){
			expect(view.template).toBeDefined();
		});
	});

	describe('when rendering', function(){
		beforeEach(function(){
			view.render();
		});
		it ('should display the Name of the restaurant', function(){
			expect(view.$el).toContainText(view.model.get('Name'));
		});
		it ('should display the RatingStars', function(){
			expect(view.$el).toContainText(view.model.get('RatingStars'));
		});
		it ('should display the NumberOfRatings', function(){
			expect(view.$el).toContainText(view.model.get('NumberOfRatings'));
		});
		it ('should display all the CuisineTypes', function(){
			expect(view.$el).toContainText(view.model.get('CuisineTypes')[0].Name);
		});
	}); 
});