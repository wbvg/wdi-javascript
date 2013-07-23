$(document).ready(function () {
  var index;
  var photos;
  var timer;
  var page = 1;


  var search_flickr = function () {
    var search = $('#search').val();


      // "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
      // http://farm4.static.flickr.com/3729/9303278039_e0a7479796_m.jpg;

    var results = function (data) {
      console.log('results()');
      // _.each(data.photos.photo, display_photo);
      var delay = parseInt($('#delay').val());
      delay = delay * 1000; //Convert seconds to milliseconds for set Interval ()
      index = 0;
      photos = data.photos.photo;

      if (photos.length > 0 ) {
        timer = setInterval(display_photo, delay);
      } else {
        console.log('ALL DONE');
      }
    };

      // timer = setInterval(display_photo, delay);
    };

//     // chrome
//     data
//     function (data) { //

// // _.each(data.photos.photo, display_photo);
// // var delay = parseInt($('#delay').val()); delay = delay * 1000;
// // //Convert seconds to milliseconds for set Interval () index = 0;
// // photos = data.photos.photo;
// // timer = setInterval(display_photo, delay); }


// if (photos.length === 0)
//   clear Interval

    var display_photo = function (photo) {
      //check here and clear the timer.... first 500 //OR
      // end of 500 use JSON call....page list //OR SLIDESHOW
      var photo = photos[index++];

      if (! photo ) {
          clearInterval(timer);
          search_flickr();
          return;

      }

      var photo = photos[index++];
      var width = $('#width').val();
      var height = $('#height').val ();
      var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
      var $image = $('<div>').addClass('image');
      $image.css('background-image', url);
      $image.css({
        'background-image': url,
        'width': width,
        'height': height
      });

      $('#images').prepend($image);
      $image.hide().fadeIn();
      };
// debugger;
      $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c44644427a8ffaf1bcc5886de938af3&text=' + search + '&per_page=100&page=' + page + '&format=json&jsoncallback=?', results);
    };

  $('#flickr').click(search_flickr);

  var clear_photos = function () {
    $('#images').empty();
  };

  $('#clear').click(clear_photos);
});