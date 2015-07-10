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
			Name: '',
			RatingStars: 0,
			NumberOfRatings: 0,
			CuisineTypes: undefined
		};
	}
}); 
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
/*global Backbone */

var app = app || {};

/** 
 * @class AppView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.AppView = Backbone.View.extend(/** @lends AppView.prototype */{
    /** 
     * @property {Object} el Object that associates the view with the element in the DOM
     */
    el: '#main',
    /** 
     * @property {Object} events Object that associates different events in the DOM with the functions that handle them 
     */
    events: {
        'click #search': 'getRestaurants'
    },
    /** 
     * @contructs AppView object 
     * Set DOM properties values and add listener to changes in the collections
     * @param {Object} data
     */
    initialize: function (data) {
        var me = this;
        me.$restaurantList = me.$('#restaurant-list');
        me.$error = me.$('#error');
        me.$outcode = me.$('#outcode');
        me.Restaurants = new app.RestaurantCollection();
        me.listenTo(me.Restaurants, 'reset', me.addRestaurants);
        me.listenTo(me.Restaurants, 'fetchError', me.showServerError);
    },
    /** 
     * Fetch all restaurants depending on the outcode typed in the input text
     */
    getRestaurants: function() {
        var me = this,
            outcode = me.$outcode.val();
        me.$error.html('');
        if (outcode !== undefined && outcode !== ''){
            me.Restaurants.fetch(outcode);
            me.$outcode.val('');
        }
        else {
            me.showNoOutcodeError();
        }
    },
    /** 
     * When app.Restaurants collection is reset, this method is called. For each restaurant in the collection
     * it will call the function addRestaurant
     */
    addRestaurants: function(){
        var me = this;
        me.$restaurantList.html('');
        me.Restaurants.each(me.addRestaurant, this);
    },
    /** 
     * Create a new app.RestaurantView for a restaurant and add it to the list.
     * @param {Object} restaurant Model object to display
     */
    addRestaurant: function(restaurant) {
        var view = new app.RestaurantView ({model: restaurant});
        this.$restaurantList.append(view.render().el);
    },
    /** 
     * Show no outcode error. Creates a new error and view for it, and append it to error div
     */
    showNoOutcodeError: function(){
        var error = new app.ErrorModel({message: 'Outcode can not be empty'}),
            view = new app.ErrorView ({model: error});
        this.$error.append(view.render().el);  
    },
    /** 
     * Show server error. Creates a new error and view for it, and append it to error div
     */
    showServerError: function(){
        var error = new app.ErrorModel({message: 'We are having problems, please try again later'}),
            view = new app.ErrorView ({model: error}),
            me = this;
        me.$restaurantList.html('');
        me.$error.append(view.render().el);  
    }
});
/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class ErrorView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.ErrorView = Backbone.View.extend(/** @lends ErrorView.prototype */{
    /** 
     * @property {Object} className Class associated to the div element when rendered
     */
    className: 'mdl-cell mdl-cell--12-col mdl-cell--middle mdl-typography--text-center',
    /** 
     * @contructs ErrorView object.
     * Initialize the related template in the DOM
     */
    initialize: function(){
      this.template = _.template($('#error-template').html());
    },
    /** 
     * Render the error. Create the html code for rendering the error based on the template.
     * @returns {Object} It returns itself
     */
    render: function(){
        var me = this;
        me.$el.html(me.template(me.model.toJSON()));   
        return me;
    }
});
/*global Backbone */
/*global _ */
var app = app || {};

/** 
 * @class RestaurantView
 * @augments Backbone.View
 * @requires Backbone.js
 * @requires underscore.js
 */
app.RestaurantView = Backbone.View.extend(/** @lends RestaurantView.prototype */{
    /** 
     * @property {Object} className Class associated to the div element when rendered
     */
    className: 'mdl-cell mdl-cell--4-col',
    /** 
     * @contructs RestaurantView object.
     * Initialize the related template in the DOM
     */
    initialize: function(){
      this.template = _.template($('#restaurant-template').html());
    },
    /** 
     * Render the error. Create the html code for rendering the restaurant based on the template.
     * @returns {Object} It returns itself
     */
    render: function(){
        var me = this;
        me.$el.html(me.template(me.model.toJSON()));   
        return me;
    }
});
/*global Backbone */

var app = app || {};

$(function () {
    new app.AppView();
});