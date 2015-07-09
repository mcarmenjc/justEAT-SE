/* global Backbone */

var app = app || {};

/**
 * @class RestaurantModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.RestaurantModel = Backbone.Model.extend(/** @lends RestaurantModel.prototype */ {
	/** 
     * Get default value for a restaurant
     * @returns {Object} An object with the defaults values to set
     */
	defaults: function(){
		return {
			name: '',
			rating: 0,
			foodType: undefined
		};
	}
}); 