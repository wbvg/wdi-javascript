  var app = app || {};

  app.AppRouter = Backbone.Router.extend({
    routes: {
      '' : 'index',
      'posts/:slug' : 'getPost'
    },

    initialize: function (options) {
      this.options = options;
      //lorem ipsum . make these more interesting
      this.posts = new app.Posts ([
          new app.Post({title: 't1', slug: 't1', content: 'test 1'}),
          new app.Post({title: 't2', slug: 't2', content: 'test 2'}),
          new app.Post({title: 't3', slug: 't3', content: 'test 3'}),
          new app.Post({title: 't4', slug: 't4', content: 'test 4'})
        ]);
    },

    index: function () {
      var appView = new app.AppView({collection: this.posts});
      appView.render();
    },

    getPost: function (slug) {
      var post = this.posts.get(slug);
      new app.PostView({model: post});
    }
  });