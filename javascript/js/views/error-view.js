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