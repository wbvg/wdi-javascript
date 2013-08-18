 var app = app || {};

//Our only post model.
  app.Post = Backbone.Model.extend ({
    urlRoot: '/posts',

    idAttribute: 'slug',

    defaults: {

      title: 'New post',
      slug: 'new-post',
      content: 'content',
      comments: []
    },


    fetchComments: function () {
      var post = this;
      post.comments = new app.Comments();
      post.comments.post_id = post.get('id');
      post.comments.fetch({
        success: function() {
          post.trigger('comments');
        }
      });
    }


  });
