// //Global priorities, for global use.
// var priorities = [];

$(document).ready(function () {

  var create_boxes = function () {
    $('.color_box').each(function () {
      var color = $(this).text();
      $(this).css('background-color', color);
      $(this).text('').removeClass('invisible');
    });
  };

  var display_priority = function (priority) {

    $('#priority_' + priority.id).remove();

    var $li = $('<li/>').attr('id', 'priority_' + priority.id);
    var $span0 = $('<span/>').addClass('priority');
    $span0.html('<img src="/assets/famfamfam/icons/add.png" class="up"><img src="/assets/famfamfam/icons/delete.png" class="down">');

    var $span1 = $('<span/>').addClass('color_box');
    var $span2 = $('<span/>').addClass('name');
    var $span3 = $('<span/>').addClass('value invisible');
    var $span4 = $('<span/>').addClass('id invisible');

    $span1.css('background-color', priority.color);
    $span2.text(priority.name);
    $span3.text(priority.value);
    $span4.text(priority.id);

    $li.append([$span0, $span1, $span2, $span3, $span4]);
    $('#priorities').append($li);

    toggle_form();

  };

var add_priority_everywhere = function (priority) {
    priorities = _.reject(priorities, function (p){
      return p.id === priority.id;
    });

    priorities.push(priority);
    priorities = _.sortBy(priorities, function (p) {
      return p.value;
    }).reverse();
    $('#priorities').empty();
    _.each(priorities, display_priority);
  };
     // priorities.push({   // each value
          // name: amy ,
          // value: 5 ,
          // color: #ff0000
     // });


  var create_priority = function () {
    var color = $('input.minicolors').minicolors('value');
    var name = $('#name').val();
    var value = $('#value').val();
    var priority_id = $('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/priorities',
      data: {'authenticity_token': token, 'id': priority_id, 'color': color, 'name': name, 'value': value}
    }).done(add_priority_everywhere).error(function (message) {
    });

    return false;
  };

    var update_priority = function () {
      var color = $('input.minicolors').minicolors('value');
      var name = $('#name').val();
      var value = $('#value').val();
      var priority_id = $('#priority_id').val();
      var token = $('input[name="authenticity_token"]').val();

      $.ajax({
        dataType: 'json',
        type: 'POST',
        url: '/priorities/' + priority_id,
        data: {
        '_method': 'put' ,
        'authenticity_token': token,
        'priority[color]': color,
        'priority[name': name,
        'priority[value]': value}
      }).done(add_priority_everywhere).error(function (message) {
      });

    return false;
  };

  var edit_priority = function () {
    if ($('.form').is(':hidden'))
      toggle_form();

    $('#create_priority').hide();
    $('#update_priority').show();

    var color = $(this).css('background-color');
    color = rgb2hex(color);
    var name = $(this).siblings('.name').text();
    var value = $(this).siblings('.value').text();
    var id = $(this).siblings('.id').text();

    $('input.minicolors').minicolors('value', color);
    $('#name').val(name);
    $('#value').val(value);
    $('#priority_id').val(id);
  };

  var new_priority = function () {
    if ($('.form').is(':hidden'))
      toggle_form();

    $('#create_priority').show();
    $('#update_priority').hide();
  }

  var rgb2hex = function (rgb) {
    var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var r = match[1];
    var g = match[2];
    var b = match[3];

    var hex = '#' + ('0' + parseInt(r, 10).toString(16)).slice(-2) +
                    ('0' + parseInt(g, 10).toString(16)).slice(-2) +
                    ('0' + parseInt(b, 10).toString(16)).slice(-2);
    return hex;
  };

  var toggle_form = function () {
    $('#new_priority').toggle();
    $('.form').toggleClass('invisible');

    clear_form();

    return false;
  }

  var clear_form = function () {
    // Clear out the form values.
    $('input.minicolors').minicolors('value', '#ffffff');
    $('#name').val('');
    $('#value').val('');
    $('#priority_id').val('');
  }

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

  var up_priority = function () {
    var id = $(this).closest('li').find('.id').text();
    var token =$('input[name="authenticity_token"]').val();


    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/priorities/' + id + '/up',
      data: {authenticity_token: token}
    }).done(process_priority);
    // console.log('up up up', this, id);
  }

  var down_priority = function () {
   var id = $(this).closest('li').find('.id').text();
    var token =$('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/priorities/' + id + '/down',
      data: {authenticity_token: token}
    }).done(process_priority);
    // console.log('down down down', this, id);
  }

  var process_priority = function (result) {
    _.each(result, add_priority_everywhere);
    // console.log('process_priority:', result);

  }

  create_boxes();
  $('#priorities').on('click', '.color_box', edit_priority);
  $('#new_priority').click(new_priority);
  $('#cancel_priority').click(toggle_form);
  $('#clear_priority').click(clear_form);
  $('#create_priority').click(create_priority);
  $('#update_priority').click(update_priority);

  //We use delegation here becuase these elements may be added after $(document).ready (), via AJAX.
  $('#priorities').on('click', '.up', up_priority);
  $('#priorities').on('click', '.down', down_priority);
});

var map;
var canvas;

var display_map = function (lat, long, zoom) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  canvas = $('#map_canvas')[0];
  map = new google.maps.Map(canvas, mapOptions);
};

var add_marker = function (lat, long, title) {
  var latlng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({position: latlng, map: map, title: title});
};

$(document).ready(function () {
  display_map(-33.89336, 151.217167, 13);
});