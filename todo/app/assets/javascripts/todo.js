$(document).ready(function () {

  var create_boxes = function () {
    $('.color_box').each(function () {
      var color = $(this).text();
      $(this).css('background-color', color);
      $(this).text('').removeClass('invisible');
    });
  };

  create_boxes();

  var display_priority = function (priority) {
    var $li = $('<li/>');
    var $span1 = $('<span/>').addClass('color_box');
    var $span2 = $('<span/>').addClass('name')
    var $span3 = $('<span/>').addClass('value invisible');
    var $span4 = $('<span/>').addClass('id invisible');

    $span1.css('background-color', priority.color);
    $span2.text(priority.name);
    $span3.text(priority.value);
    $span4.text(priority.id);

    $li.append( [$span1, $span2]);
    $('#priorities').append($li);

  };

  var create_priority = function () {
    var color = $('input.minicolors').minicolors('value');
    var name = $('#name').val();
    var value = $('#value').val();
    var priority_id =$('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/priorities',
      data: {'authenticity_token': token, 'id': priority_id, 'color': color, 'name': name, 'value': value}
    }).done(display_priority).error(function (message) {
      alert('SOMETHING BAD HAPPENED -- check the console');
    });

    $('input[name, color, priority_id]').empty();

    console.log('continuing');
    return false;
  };

  var edit_priority = function () {
    var color = $(this).css('background-color');
    color = rgb2hex(color);
    var name = $(this).siblings('.name').text();
    var value = $(this).siblings('.value').text();
    var id = $(this).siblings('.id').text();

    $('input.minicolors').minicolors('value', color);
    $('#name').val(name);
    $('#value').val(value);
    $('#priority_id').val(id);

    if ($('.form').is(':hidden'))
      toggle_form();

  };

  var rgb2hex = function (rgb) {
   match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   var r = match[1];
   var g = match[2];
   var b = match[3];

   var hex = '#' + ('0' + parseInt(r, 10).toString(16)).slice(-2) +
                           ('0' + parseInt(g,10).toString(16)).slice(-2) +
                           ('0' + parseInt(b,10).toString(16)).slice(-2);
   return hex;
  };

$('#priorities'). on ('click', '.color_box', edit_priority);

  var toggle_form = function () {
    $('#new_priority').toggle();
    $('.form').toggleClass('invisible');
    return false;
  }

  $('#new_priority').click(toggle_form);
  $('#create_priority').click(create_priority);



  var toggle_clear_form = function () {
    $('#new_priority').toggle();
    $('#name, #color, #priority_id').empty();
    // $('.form').removeAttr('#name', '#color', '#priority_id');
    // $('#name, #color, #priority_id').empty();
    return false;
  }
 $('#clear_priority').click(toggle_clear_form);




  $('input.minicolors').minicolors({
    animationSpeed: 100,
    animationEasing: 'swing',
    change: null,
    changeDelay: 0,
    control: 'hue',
    defaultValue: '#ffffff',
    hide: null,
    hideSpeed: 100,
    inline: false,
    letterCase: 'lowercase',
    opacity: false,
    position: 'default',
    show: null,
    showSpeed: 100,
    swatchPosition: 'left',
    textfield: false,
    theme: 'default'
  });
});
