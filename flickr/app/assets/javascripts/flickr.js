$(document).ready(function () {
  var search_flickr = function () {
    var search = $('#search').val();
    var page = 1;

      // feed =
      // "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
      // http://farm4.static.flickr.com/3729/9303278039_e0a7479796_m.jpg;

    var results = function (data) {
      console.log('results'());
      // _.each(data.photos.photo, display_photo);
      var delay = parseInt($('#delay').val());
      delay = delay * 1000;
      index = 0;
      photos = data.photos.photo;


      timer = setInterval(display_photo, delay);
    };

    var display_photo = function (photo) {
      //check timer....
      // end of 500
      var photo = photos[index++];

      if (photos != undefined); {

      var width = $('#width').val();
      var height = $('#height').val ();
      var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
      var $image = $('<div>').addClass('image');
      $image.css('background-image', url);
      $image.css({
        'background-image': url,
        'width': width,
        'height': height

      $('#images').prepend($image);
      $image.hide().fadeIn();

      } else {

      page = page+1;
          $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c44644427a8ffaf1bcc5886de938af3&text=' + search + '&per_page=500&page=' + page + '&format=json&jsoncallback=?', results);
      };

    {
      $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c44644427a8ffaf1bcc5886de938af3&text=' + search + '&per_page=500&page=' + page + '&format=json&jsoncallback=?', results);
    };
};


  $('#flickr').click(search_flickr);

  var clear_photos = function () {
    $('#images').empty();
  };
  $('#clear').click(clear_photos);

});