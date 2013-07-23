$(document).ready(function () {
  var url = "#greenmonster";
  var display_task = function (task) {

    $('#task_' + task.id).remove();

    var $ol = $('<li/>').attr('id', 'task_' + task.id);
    var $li1 = $('<li/>').addClass('');
    var $li2 = $('<li/>').addClass('');
    var $li3 = $('<li/>').addClass('');
    var $li4 = $('<li/>').addClass('');
    var $li5 = $('<li/>').addClass('id invisible');
    var $li6 = $('<li/>').addClass('');

    $li1.text(task.title).addClass('');
    $li2.text(task.description);
    $li3.text(task.duedate);
    $li4.text(task.is_complete.id);
    $li5.text(task.priority_id);
    $li6.text(task.address);
    // color box trick
    // $li7.prepend('<span class="color_box invisible">' + task.priority.color + '</span>');

    // merge the map into view?
    // add_marker(task.latitude, task.longitude, task.title);

    $ol.append([$li1, $li2, $li3, $li4, $li5, $li6]);
    $('#taski').append($li);

   toggle_taskform();
  };

var add_task_everywhere = function (task) {
    // Refresh on url page
    tasks = _.reject(tasks, function (t) {
      return t.id === task.id;
    });

    tasks.push(task);
    $('#tasks').empty();
    _.each(tasks, display_task);

    toggle_taskform();
    // create_color_boxes();
  };

  var create_task = function () {

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
      url: '/tasks',
      data: {
        'authenticity_token': token,
        'task': {
          'title': title,
          'description': description,
          'duedate': duedate,
          'address': address,
          'is_complete': is_complete,
          'priority_id': priority_id
        }
      }
    }).done(display_task);

    return false;
  };

    var update_task = function () {

       var task_id = $('#task_id').val();
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

  var edit_task = function () {
    if ($('.taskform').is(':hidden')) {
      toggle_taskform();
    }
    // clear_taskform();


    $('#update_task').show();


    $('#create_task').hide();

    var $ol = $(this).closest('li');

    var id = $(this).siblings('.task_id').text();
    var title = $(this).siblings('.title').text();
    var description = $(this).siblings('.description').text();
    var duedate = $(this).siblings('.duedate').text();
    var is_complete = $(this).siblings('.is_complete input').is(':checked');
    var address = $(this).siblings('.address').text();
    var priority_id = $(this).siblings('.priority_id').text();

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
  $(location).attr('href',url);

  var new_task = function () {
    if ($('.taskform').is(':hidden'))
      toggle_taskform();

    $('#create_task').show();
    // $('#update_task').hide();
  }


  var toggle_taskform = function () {
    $('#new_task').toggle();
    $('.taskform').toggleClass('invisible');

    clear_taskform();

    return false;
  }

  var clear_taskform = function () {
    // Clear out the form values.
    $('#title').val('');
    $('#description').val('');
    $('#duedate').val('');
    $('#is_complete').val('');
    $('#address').val('');
    $('#priority_id').val('');

  }

  $('#taski').on('click', '.pinknose', edit_task);
  $('#new_task').click(new_task);
  $('#cancel_task').click(toggle_taskform);
  $('#clear_task').click(clear_taskform);
  $('#create_task').click(create_task);
  $('#update_task').click(update_task);

});