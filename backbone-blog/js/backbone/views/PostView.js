//view for a single post
  var app = app || {};

  app.PostView = Backbone.View.extend({
    el: '#main', //where this is going to end up on the page.
    initialize: function () {
      //
      var template = Handlebars.compile(app.templates.blogView);
      this.$el.html( template(this.model.toJSON()) );
    }
  });