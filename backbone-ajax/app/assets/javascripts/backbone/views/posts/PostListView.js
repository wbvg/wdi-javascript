// Create a template for the home page blog post subview

var app = app || {};

app.PostListView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'change': this.render,
      'click': 'view'
    },

    render: function () {
      var template = Handlebars.compile(app.templates.blogList);
      this.$el.html( template(this.model.toJSON()) );
       return this;
    },

    view: function () {
      app.router.navigate('posts/' + this.model.get('slug'), true);
    }
  });