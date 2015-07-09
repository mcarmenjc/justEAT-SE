/*global Backbone */

var app = app || {};

app.Rows = new app.RowCollection();
app.Columns = new app.ColumnCollection();
$(function () {
    new app.FileView();
});