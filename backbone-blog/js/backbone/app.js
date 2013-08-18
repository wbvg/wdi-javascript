var app = app || {};

app.templates = {
appView: ' <h1>Recent Posts</h1><ul id="posts"></ul>',
blogList: '<a href="#posts/{{slug}}">{{title}}</a>',
blogView: '<div class="post"><h1 class="title">{{title}}</h1><h3 class="slug">{{slug}}</h3><div class="content">{{{content}}}</div></div>'
};


$(document).ready(function () {
  app.router = new app.AppRouter();
  Backbone.history.start({pushState: true});

  Backbone.history.on('route', function () {
    var fragment = Backbone.history.getFragment();
    console.log('The user navigated to', fragment);
  });

});
