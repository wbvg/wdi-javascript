var app = app || {};

// View for a single post.
app.PostView = Backbone.View.extend({
  el: '#main', // Where this is going to end up on the page.
  initialize: function () {

    this.model.on('change', this.render, this);
    this.model.on('comments', this.renderComments, this);

  },

  render: function () {
    var template = Handlebars.compile(app.templates.blogView);
    this.$el.html( template(this.model.toJSON()) );

    this.comments = this.$el.find('.comments');
    this.model.fetchComments();

    var id = this.model.get('id');
    // var newcomment = new app.Comment({post_id});

    return this;
  },

  renderComments: function () {
   this.model.comments.each(function(model) {
      var view = new app.CommentListView({model: model});
      this.comments.append(view.render().el);
    }, this);
  }
});