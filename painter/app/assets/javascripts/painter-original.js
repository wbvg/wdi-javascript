// $(document).ready(function () {

//   var create_paint_boxes = function (boxes) {
//     for (var i = 0; i < boxes; i++) {
//       var $paint = $('<div/>').addClass('paint');
//       $('#canvas').append($paint);
//     }
//   };

//   create_paint_boxes(800);

//   var paint_box = function () {
//     var $box = $(this);
//     var color = $('#current').css('background-color');
//     $box.css('background-color', color);
//   };
//   $('.paint').click(paint_box);
//   $('.paint').mouseover(paint_box);


//   var clear_colors = function () {
//     // $('#colors').empty();
//     $('div#current').removeAttr('style');
//     $('#current').addClass('eraser');
//   }
//   $('#clear').click(clear_colors);

//  var clear_color_palette = function () {
//     $('#colors').empty();

//   }
//   $('#clear_color_palette').click(clear_color_palette);


//   var add_color = function () {
//     var color = $('#color').val();

//     var $box = $('<div/>');
//     $box.addClass('box');
//     $box.css('background-color', color);
//     $box.text(color);

//     $('#colors').prepend($box);
//     $('#color').val('').focus();

//     //$box.click(set_color);
//   };
//   $('#add_color').click(add_color);


//   var set_color = function () {
//     var $box = $(this);
//     var color = $box.css('background-color');

//     $('#current').css('background-color', color);
//   };
//   $('#colors').on('click', '.box', set_color);

//   // Upload Images
//  var add_image = function () {
//     var img = $('#image').val();
//     var $box = $('<div/>');
//     $box.addClass('box');
//     $box.css('background', 'url(' + img + ')' );
//     $('#images').prepend($box);
//   };

// // Set Image

//   var set_image = function () {
//     var $box = $(this);
//     var image = $box.css('background-image');
//     $('#canvas').css('background-image', image);

//   }

//   $('#add_image').click(add_image);
//   $('#images').on('click', '.box', set_image);

// // Clear Image

// var clear_image = function () {
//     $('#images').empty();
//     $('#canvas').css('background-image', 'none');
//   }
//   $('#clear_image').click(clear_image);


// });