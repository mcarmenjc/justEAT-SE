/* global Backbone */

var app = app || {};

/**
 * @class ErrorModel
 * @augments Backbone.Model
 * @requires Backbone.js
 */
app.ErrorModel = Backbone.Model.extend(/** @lends ErrorModel.prototype */ {
	/** 
     * Get default value for an error
     * @returns {Object} An object with the defaults values to set
     */
	defaults: function(){
		return {
			message: ''
		};
	}
}); 