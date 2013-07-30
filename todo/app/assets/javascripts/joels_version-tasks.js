$(document).ready(function () {

  var toggle_task_form = function () {
    clear_task_form();
    $('.taskform').toggleClass('invisible');
    $('#new_task').toggle();
    return false;
  };

  var clear_task_form = function () {
    $('#task_id, #title, #description, #duedate, #address, #priority_id').val('');
    $('#is_complete').removeAttr('checked');
  };

  var new_task = function () {
    $('#update_task').hide();
    $('#create_task').show();
    toggle_task_form();

    $('#title').focus();
  };

  var edit_task = function () {
    if ($('.taskform').is(':hidden')) {
      toggle_task_form();
    }
    clear_task_form();
    $('#update_task').show();
    $('#create_task').hide();

    $('#title').focus();

    var $ul = $(this).closest('ul');

    var id = $ul.find('.task_id').text();
    var title = $ul.find('.title').text();
    var description = $ul.find('.description').text();
    var duedate = $ul.find('.duedate').text();
    var is_complete = $ul.find('.is_complete input').is(':checked');
    var address = $ul.find('.address').text();
    var priority_id = $ul.find('.priority_id').text();

    $('#task_id').val(id);
    $('#title').val(title);
    $('#description').val(description);
    $('#duedate').val(duedate);
    if (is_complete) {
      $('#is_complete').attr('checked', true);
    }
    $('#address').val(address);
    $('#priority_id').val(priority_id);
  };

  var display_task = function (task) {
    var $li = $('<li/>');
    var $ul = $('<ul/>');

    if (task.is_complete) {
      $ul.addClass('complete');
    }

    var $li0 = $('<li/>').addClass('title').text(task.title);
    var $li1 = $('<li/>').addClass('description').text(task.description);
    var $li2 = $('<li/>').addClass('duedate').text(task.duedate);
    var $li2a = $('<li/>').addClass('iscomplete').html('Completed: <input type="checkbox">');
    task.is_complete && $li2a.find('input').attr('checked', true);
    var $li3 = $('<li/>').addClass('priority_name').text(task.priority.name);
    $li3.prepend('<span class="color_box invisible">' + task.priority.color + '</span>');
    var $li4 = $('<li/>').addClass('priority_id invisible').text(task.priority_id);
    var $li5 = $('<li/>').addClass('task_id invisible').text(task.id);
    var $li6 = $('<li/>').addClass('address').text(task.address);
    var $li7 = $('<li/>').html('<button class="edit_task button radius tiny" name="button" type="submit">Edit task</button>');

    $ul.append([$li0, $li1, $li2, $li2a, $li3, $li4, $li5, $li6, $li7]);
    $li.append($ul);
    $('#tasks').append($li);

    add_marker(task.latitude, task.longitude, task.title); // LOL duplicates.
  };

  var add_task_everywhere = function (task) {
    // Remove any old copy of this task from the array.
    tasks = _.reject(tasks, function (t) {
      return t.id === task.id;
    });

    tasks.push(task);

    // Fuck sorting.

    $('#tasks').empty();
    _.each(tasks, display_task);

    toggle_task_form();

    create_color_boxes();
  };

  var create_task = function () {
    var title = $('#title').val();
    var description = $('#description').val();
    var duedate = $('#duedate').val();
    var is_complete = $('#is_complete').val();
    var address = $('#address').val();
    var priority_id = $('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/tasks',
      data: {
        authenticity_token: token,
        task: {
          title: title,
          description: description,
          duedate: duedate,
          is_complete: is_complete,
          address: address,
          priority_id: priority_id
        }
      }
    }).done(add_task_everywhere);

    return false;
  };

  var update_task = function () {
    var task_id = $('#task_id').val();
    var title = $('#title').val();
    var description = $('#description').val();
    var duedate = $('#duedate').val();
    var is_complete = $('#is_complete').is(':checked');
    var address = $('#address').val();
    var priority_id = $('#priority_id').val();
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/tasks/' + task_id,
      data: {
        _method: 'put',
        authenticity_token: token,
        task: {
          title: title,
          description: description,
          duedate: duedate,
          is_complete: is_complete,
          address: address,
          priority_id: priority_id
        }
      }
    }).done(add_task_everywhere);

    return false;
  };

  var toggle_complete = function () {
    var $this = $(this);
    var task_id = $this.closest('ul').find('.task_id').text();
    var is_complete = $this.is(':checked');
    var token = $('input[name="authenticity_token"]').val();

    $.ajax({
      dataType: 'json',
      type: 'POST',
      url: '/tasks/' + task_id,
      data: {
        _method: 'put',
        authenticity_token: token,
        task: {
          is_complete: is_complete
        }
      }
    }).done(function (task) {
      if (task.is_complete) {
        $this.closest('ul').addClass('complete').closest('li').appendTo('#tasks');
      } else {
        $this.closest('ul').removeClass('complete').closest('li').prependTo('#tasks');
      }
    });
  };

  $('#new_task').click(new_task);
  $('#tasks').on('click', '.edit_task', edit_task);
  $('#cancel_task').click(toggle_task_form);
  $('#create_task').click(create_task);
  $('#update_task').click(update_task);

  $('#tasks').on('click', '.is_complete :checkbox', toggle_complete);

});

// Map stuff

var map;
var canvas;

var add_marker = function (lat, long, title) {
  var latlng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({position: latlng, map: map, title: title});
};

$(document).ready(function () {
  var display_map = function (lat, long, zoom) {
    canvas = $('#map_canvas')[0];

    if (! canvas) {
      return; // I QUIT
    }

    var mapOptions = {
      center: new google.maps.LatLng(lat, long),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(canvas, mapOptions);
  };

  display_map(-33.89336, 151.217167, 13);
});