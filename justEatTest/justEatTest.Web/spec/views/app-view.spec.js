describe ('app.AppView', function(){
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
		view = new app.AppView();
	});

	it('should be defined', function(){
		expect(view).toBeDefined();
	});

	it('should not be null', function(){
		expect(view).not.toBeNull();
	});

	describe('when searching for restaurants', function(){
		describe('and outcode is set', function(){
			var fakeData = [
			        {
			            "Id": 12237,
			            "Name": "Spicy Indian",
			            "Address": "226 Bensham Manor Road",
			            "Postcode": "CR7 7AW",
			            "City": "London",
			            "CuisineTypes": [
			                {
			                    "Id": 31,
			                    "Name": "Indian",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://spicyindian.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "Proactive Temp Offline - Onlined",
			            "UniqueName": "spicyindian",
			            "IsCloseBy": false,
			            "IsHalal": false,
			            "DefaultDisplayRank": 4,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 5.16,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/12237.gif"
			                }
			            ],
			            "Deals": [
			                {
			                    "Description": "20% off when you spend £22",
			                    "DiscountPercent": "20",
			                    "QualifyingPrice": "22.00"
			                }
			            ],
			            "NumberOfRatings": 265
			        },
			        {
			            "Id": 31940,
			            "Name": "Monkeys",
			            "Address": "4 Crown Point Parade",
			            "Postcode": "SE19 3NG",
			            "City": "London",
			            "CuisineTypes": [
			                {
			                    "Id": 31,
			                    "Name": "Indian",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://monkeys-se19.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "Proactive Temp Offline - Onlined",
			            "UniqueName": "monkeys-se19",
			            "IsCloseBy": true,
			            "IsHalal": false,
			            "DefaultDisplayRank": 1,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 5.35,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/31940.gif"
			                }
			            ],
			            "Deals": [],
			            "NumberOfRatings": 954
			        },
			        {
			            "Id": 1038,
			            "Name": "Napoli Pizza",
			            "Address": "96 Anerley Road",
			            "Postcode": "SE19 2AN",
			            "City": "Crystal Palace",
			            "CuisineTypes": [
			                {
			                    "Id": 27,
			                    "Name": "Italian",
			                    "SeoName": null
			                },
			                {
			                    "Id": 82,
			                    "Name": "Pizza",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://napolipizzase19.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "TOL:None",
			            "UniqueName": "napolipizzase19",
			            "IsCloseBy": true,
			            "IsHalal": false,
			            "DefaultDisplayRank": 2,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 4.99,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/1038.gif"
			                }
			            ],
			            "Deals": [
			                {
			                    "Description": "20% off when you spend £25",
			                    "DiscountPercent": "20",
			                    "QualifyingPrice": "25.00"
			                }
			            ],
			            "NumberOfRatings": 366
			        }
	        	];
			beforeEach(function(){
				this.server = sinon.fakeServer.create();
				this.server.respondWith("GET", new RegExp("restaurant", "i"),
		            [200, { "Content-Type": "application/json" },
		             JSON.stringify(fakeData)]);
				spyOn(view.Restaurants, 'fetch').and.callThrough();
			});
	  		afterEach(function(){
	  			this.server.restore();
	  		});
			it ('should fetch collection', function(){
				view.$outcode.val('se19');
				view.$('#search').click();
				expect(view.Restaurants.fetch).toHaveBeenCalled();
			});
			it ('should remove any existing error from view', function(){
				view.$outcode.val('');
				view.$('#search').click();
				expect(view.$error).toContainText('Outcode can not be empty');
				view.$outcode.val('se19');
				view.$('#search').click();
				expect(view.$error).toBeEmpty();
			});
		});
		describe('and outcode is blank', function(){
			beforeEach(function(){
				spyOn(view, 'showNoOutcodeError').and.callThrough();
				view.$outcode.val('');
				view.$('#search').click();
			});
			it ('should call showNoOutcodeError', function(){
				expect(view.showNoOutcodeError).toHaveBeenCalled();
			});
			it ('should add an error to the view', function(){
				expect(view.$error).toContainText('Outcode can not be empty');
			});
		});
	}); 

	describe('# addRestaurants', function(){
		var data = [
			        {
			            "Id": 12237,
			            "Name": "Spicy Indian",
			            "Address": "226 Bensham Manor Road",
			            "Postcode": "CR7 7AW",
			            "City": "London",
			            "CuisineTypes": [
			                {
			                    "Id": 31,
			                    "Name": "Indian",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://spicyindian.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "Proactive Temp Offline - Onlined",
			            "UniqueName": "spicyindian",
			            "IsCloseBy": false,
			            "IsHalal": false,
			            "DefaultDisplayRank": 4,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 5.16,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/12237.gif"
			                }
			            ],
			            "Deals": [
			                {
			                    "Description": "20% off when you spend £22",
			                    "DiscountPercent": "20",
			                    "QualifyingPrice": "22.00"
			                }
			            ],
			            "NumberOfRatings": 265
			        },
			        {
			            "Id": 31940,
			            "Name": "Monkeys",
			            "Address": "4 Crown Point Parade",
			            "Postcode": "SE19 3NG",
			            "City": "London",
			            "CuisineTypes": [
			                {
			                    "Id": 31,
			                    "Name": "Indian",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://monkeys-se19.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "Proactive Temp Offline - Onlined",
			            "UniqueName": "monkeys-se19",
			            "IsCloseBy": true,
			            "IsHalal": false,
			            "DefaultDisplayRank": 1,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 5.35,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/31940.gif"
			                }
			            ],
			            "Deals": [],
			            "NumberOfRatings": 954
			        },
			        {
			            "Id": 1038,
			            "Name": "Napoli Pizza",
			            "Address": "96 Anerley Road",
			            "Postcode": "SE19 2AN",
			            "City": "Crystal Palace",
			            "CuisineTypes": [
			                {
			                    "Id": 27,
			                    "Name": "Italian",
			                    "SeoName": null
			                },
			                {
			                    "Id": 82,
			                    "Name": "Pizza",
			                    "SeoName": null
			                }
			            ],
			            "Url": "http://napolipizzase19.just-eat.co.uk",
			            "IsOpenNow": true,
			            "IsSponsored": true,
			            "IsNew": false,
			            "IsTemporarilyOffline": false,
			            "ReasonWhyTemporarilyOffline": "TOL:None",
			            "UniqueName": "napolipizzase19",
			            "IsCloseBy": true,
			            "IsHalal": false,
			            "DefaultDisplayRank": 2,
			            "IsOpenNowForDelivery": true,
			            "IsOpenNowForCollection": true,
			            "RatingStars": 4.99,
			            "Logo": [
			                {
			                    "StandardResolutionURL": "http://d30v2pzvrfyzpo.cloudfront.net/uk/images/restaurants/1038.gif"
			                }
			            ],
			            "Deals": [
			                {
			                    "Description": "20% off when you spend £25",
			                    "DiscountPercent": "20",
			                    "QualifyingPrice": "25.00"
			                }
			            ],
			            "NumberOfRatings": 366
			        }
	        	];
	    function assertRestaurant(expectedData){
	    	expect(view.$restaurantList).toContainText(expectedData.Name);
	    	expect(view.$restaurantList).toContainText(expectedData.RatingStars);
	    	expect(view.$restaurantList).toContainText(expectedData.NumberOfRatings);
	    	_.each(expectedData.CuisineTypes, function(type){
	    		expect(view.$restaurantList).toContainText(type.Name);
	    	});
		}

		beforeEach(function(){
			spyOn(view, 'addRestaurant').and.callThrough();
			spyOn(view.$restaurantList, 'html').and.callThrough();
			view.Restaurants.reset(data);
		});
		it('should be defined', function(){
			expect(view.addRestaurants).toBeDefined();
		});
		it('should empty the restaurant-list element', function(){
			expect(view.$restaurantList.html).toHaveBeenCalled();
			expect(view.$restaurantList.html).toHaveBeenCalledWith('');
		});
		it('should call addRestaurant foreach model in the collection', function(){
			expect(view.addRestaurant).toHaveBeenCalled();
			expect(view.addRestaurant.calls.count()).toEqual(3);
		});
		it('should display restaurant info to the view', function(){
			assertRestaurant(data[0]);
			assertRestaurant(data[1]);
			assertRestaurant(data[2]);
		});
	});
});