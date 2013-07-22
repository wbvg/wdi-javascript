// $(document).ready(function () {

//   var create_boxes = function () {
//     $('.color_box').each(function () {
//       var color = $(this).text();
//       $(this).css('background-color', color);
//       $(this).text('').removeClass('invisible');
//     });
//   };

//   var display_priority = function (priority) {
//     $('#priority_' + priority.id).remove();

//     var $li = $('<li/>').attr('id', 'priority_' + priority.id);
//     var $span1 = $('<span/>').addClass('color_box');
//     var $span2 = $('<span/>').addClass('name');
//     var $span3 = $('<span/>').addClass('value invisible');
//     var $span4 = $('<span/>').addClass('id invisible');

//     $span1.css('background-color', priority.color);
//     $span2.text(priority.name);
//     $span3.text(priority.value);
//     $span4.text(priority.id);

//     $li.append([$span1, $span2, $span3, $span4]);
//     $('#priorities').append($li);

//     toggle_form();

//   };

//   var create_priority = function () {
//     var color = $('input.minicolors').minicolors('value');
//     var name = $('#name').val();
//     var value = $('#value').val();
//     var priority_id = $('#priority_id').val();
//     var token = $('input[name="authenticity_token"]').val();

//     $.ajax({
//       dataType: 'json',
//       type: 'POST',
//       url: '/priorities',
//       data: {'authenticity_token': token, 'id': priority_id, 'color': color, 'name': name, 'value': value}
//     }).done(display_priority).error(function (message) {
//     });

//     return false;


//   };

//   var edit_priority = function () {
//     if ($('.form').is(':hidden'))
//       toggle_form();

//     var color = $(this).css('background-color');
//     color = rgb2hex(color);
//     var name = $(this).siblings('.name').text();
//     var value = $(this).siblings('.value').text();
//     var id = $(this).siblings('.id').text();

//     $('input.minicolors').minicolors('value', color);
//     $('#name').val(name);
//     $('#value').val(value);
//     $('#priority_id').val(id);
//   };

//   var edit_priority = function () {
//     if ($('.form').is(':hidden'))
//       toggle_form();

//     $('#create_priority').show();
//     $('#update_priority').hide();

//   }

//   var rgb2hex = function (rgb) {
//     var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     var r = match[1];
//     var g = match[2];
//     var b = match[3];

//     var hex = '#' + ('0' + parseInt(r, 10).toString(16)).slice(-2) +
//                     ('0' + parseInt(g, 10).toString(16)).slice(-2) +
//                     ('0' + parseInt(b, 10).toString(16)).slice(-2);
//     return hex;
//   };

//   var toggle_form = function () {
//     $('#new_priority').toggle();
//     $('.form').toggleClass('invisible');

//     clear_form();

//     return false;
//   }

//   var clear_form = function () {
//     // Clear out the form values.
//     $('input.minicolors').minicolors('value', '#ffffff');
//     $('#name').val('');
//     $('#value').val('');
//     $('#priority_id').val('');
//   }

//   $('input.minicolors').minicolors({
//     animationSpeed: 100,
//     animationEasing: 'swing',
//     change: null,
//     changeDelay: 0,
//     control: 'hue',
//     defaultValue: '#ffffff',
//     hide: null,
//     hideSpeed: 100,
//     inline: false,
//     letterCase: 'lowercase',
//     opacity: false,
//     position: 'default',
//     show: null,
//     showSpeed: 100,
//     swatchPosition: 'left',
//     textfield: false,
//     theme: 'default'
//   });

//   create_boxes();
//   $('#priorities').on('click', '.color_box', edit_priority);
//   $('#new_priority').click(new_priority);
//   $('#cancel_priority').click(toggle_form);
//   $('#create_priority, #update_priority').click(create_priority);

// });
