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
  	describe('#fetch', function() {
  		beforeEach(function(){
  			this.server = sinon.fakeServer.create();
  		});
  		afterEach(function(){
  			this.server.restore();
  		});
	    it('should be defined', function(){
	    	expect(this.restaurants.fetch).toBeDefined();
	    });

	    describe('when data is obtained from server', function(){
	    	var fakeData = {
	  			"ShortResultText": "SE19",
			    "Restaurants": [
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
	        	]
	  		};
	    	beforeEach(function(){
	    		this.server.respondWith("GET", new RegExp("restaurants", "i"),
		            [200, { "Content-Type": "application/json" },
		             JSON.stringify(fakeData)]);
			});

			it('should reset the collection when data is got correctly', function(){
		    	var me = this;
		    	spyOn(me.restaurants, 'reset').and.callThrough();
		    	me.restaurants.fetch('se19');
		    	me.server.respond();
		    	expect(me.restaurants.reset).toHaveBeenCalled();
		    });

		    it('should add new models to the collection', function(){
		    	var me = this;
		    	expect(me.restaurants.models.length).toEqual(0);
		    	me.restaurants.fetch('se19');
		    	me.server.respond();
		    	expect(me.restaurants.models.length).toEqual(3);
		    });
	    });

	    describe('when an error occurs', function(){
	    	beforeEach(function(){
	    		this.server.respondWith("GET", new RegExp("restaurants", "i"),
		            [404, { "Content-Type": "application/json" },
		             JSON.stringify({error: 'Error'})]);
			});
			it('should trigger fetchError when there was an error getting the restaurant list', function(){
		    	var me = this,
		    		spy = jasmine.createSpy('event');
    			me.restaurants.on('fetchError', spy);
		    	me.restaurants.fetch();
		    	me.server.respond();
		    	expect(spy).toHaveBeenCalled();
		    });
	    });
	});
});