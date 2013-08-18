var app = app || {};

app.PostListView = Backbone.View.extend({
    tagName: 'li',

    events: {
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