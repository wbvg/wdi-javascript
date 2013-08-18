 var app = app || {};

//Our only post model.
  app.Post = Backbone.Model.extend ({

    idAttribute: 'slug',

    defaults: {
      title: 'New post',
      slug: 'new-post',
      content: 'content'
    }
  });
