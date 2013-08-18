var app = app || {};

app.Comment = Backbone.Model.extend({
  url: function () {
    return '/posts/' + this.get('post_id') + '/comments';
  },

  parse: function (data) {
    return data;
  }
});