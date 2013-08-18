
// Create the app/home view

  var app = app || {};

  // View for entire app/home/view
  app.AppView = Backbone.View.extend({
    el: '#main', //where this is going to end up on the page.

    initialize: function () {
      this.$el.html ( app.templates.appView );
      this.list = $('#posts'); //caching the #posts for later use

      this.collection.on('add', this.renderItem, this );

      // this.listenTo( this.collection, 'add', this.renderItem );

      if (this.collection.length === 0) {
        this.collection.fetch();
      }

    },

    renderItem: function(model) {
      var view = new app.PostListView({model: model})
      view.render();
      this.list.append( view.el );
    },

    render: function () {
      this.collection.each(function (post) {
        // var view = new app.PostListView({ model: post}); //new view for each post, handled above
          this.renderItem(post);
    }, this); // pass in this as the scope of our each().

    return this;
  }


  });
