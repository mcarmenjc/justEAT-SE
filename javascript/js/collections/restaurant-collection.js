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
	/** 
     * @property {string} url Reference to its location on the server
     */
	url: '/restaurants',
	fetch: function(outcode){
		var me = this;
		$.ajax({
		    url: 'http://api-interview.just-eat.com/restaurants?q=' + outcode,
		    headers: {
		    	'Accept-Tenant': 'uk',
				'Accept-Language': 'en-GB',
				'Authorization': 'Basic VGVjaFRlc3RBUEk6dXNlcjI='
		    }})
			.done(function(data){
				me.reset(data.Restaurants);
			})
			.fail(function(jqXHR, textStatus, errorThrown){
				me.trigger('fetchError', me);
			});
	}
}); 