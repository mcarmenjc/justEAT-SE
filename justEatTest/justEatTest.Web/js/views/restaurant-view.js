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