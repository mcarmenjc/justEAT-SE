/* global Backbone */

var app = app || {};

/**
 * @class RestaurantCollection
 * @augments Backbone.Collection
 * @requires Backbone.js
 */
app.RestaurantCollection = Backbone.Collection.extend(/** @lends RestaurantCollection.prototype */ {
	/** 
     * @property {Object} url Server route to get collection
     */
	url: '/api/restaurant',
	/** 
     * @property {Object} model Associates RestaurantCollection with a specific model (RestaurantModel)
     */
	model: app.RestaurantModel
}); 