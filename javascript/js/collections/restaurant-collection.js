/* global Backbone */

var app = app || {};

/**
 * @class RestaurantCollection
 * @augments Backbone.Collection
 * @requires Backbone.js
 */
app.RestaurantCollection = Backbone.Collection.extend(/** @lends RestaurantCollection.prototype */ {
	/** 
     * @property {Object} model Associates RestaurantCollection with a specific model (RestaurantModel)
     */
	model: app.RestaurantModel,
	url: '/restaurants',
	getRestaurants: function(outcode){
		var me = this;
		$.ajax({
		    url: 'http://api-interview.just-eat.com/restaurants?q=' + outcode,
		    headers: {
		    	'Accept-Tenant': 'uk',
				'Accept-Language': 'en-GB',
				'Authorization': 'Basic VGVjaFRlc3RBUEk6dXNlcjI=',
				'Host': 'api-interview.just-eat.com'
		    }})
			.done(function(data){
				me.reset(data.Restaurants);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				
			});
	}
}); 