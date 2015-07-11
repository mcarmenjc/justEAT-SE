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
    },
    /** 
     * Fetch all restaurants depending on the outcode typed in the input text
     */
    getRestaurants: function() {
        var me = this,
            outcode = me.$outcode.val();
        me.$error.html('');
        if (outcode !== undefined && outcode !== ''){
            me.Restaurants.fetch({ data: $.param({ outcode: outcode}), reset: true });
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
    }
});