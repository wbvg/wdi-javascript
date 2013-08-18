$(document).ready(function () {

  var toggle_taskform = function () {
    clear_taskform();
    $('.taskform').toggleClass('invisible');
    $('#new_task').toggle();
    return false;
  };

  var clear_taskform = function () {
    // Clear out the form values.
    $('#task_id, #title, #description, #duedate, #address, #priority_id').val('');
    $('#is_complete').removeAttr('checked');
     $('.taskform').toggleClass('invisible');
     $('#new_task').toggle();
  };

  var new_task = function () {
    $('#update_task').hide();
    $('#create_task').show();
    toggle_taskform();
    $('#title').focus();
  };

  var edit_task = function () {
    if ($('.taskform').is(':hidden')) {
      toggle_taskform();
    };
      clear_taskform();
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

    var $li1 = $('<li/>').addClass('').text(task.title);
    var $li2 = $('<li/>').addClass('').text(task.description);
    var $li3 = $('<li/>').addClass('').text(task.duedate);
    var $li4 = $('<li/>').addClass('').html('Completed: <input type="checkbox">');
    var $li5 = $('<li/>').addClass('priority_id invisible').text(task.priority_id);
    var $li6 = $('<li/>').addClass('').text(task.address);
    var $li7 = $('<li/>').addClass('task_id invisible').text(task.id);
    var $li8 = $('<li/>').addClass('priority_name').text(task.priority.name);
    $li8.prepend('<span class="color_box invisible">' + task.priority.color + '</span>');
    var $li9 = $('<li/>').html('<button class="pinknose" name="button" type="submit">Edit </button>');

    $li1.text(task.title).addClass('');
    $li2.text(task.description);
    $li3.text(task.duedate);
    $li4.text(task.is_complete.id);
    $li5.text(task.priority_id);
    $li6.text(task.address);
    $li7.text(task.task_id);
    $li8.text(task.priority.name);
    $li9.html

    $ul.append([$li1, $li2, $li3, $li4, $li5, $li6, $li7, $li8, $li9]);
    $li.append($ul);
    $('#taski').append($li);

    add_marker(task.latitude, task.longitude, task.title);


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
    create_color_boxes();
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
        authenticity_token: token,
        task: {
          title: title,
          description: description,
          duedate: duedate,
          address: address,
          is_complete: is_complete,
          priority_id: priority_id
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



  $('#taski').on('click', '.pinknose', edit_task);
  $('#new_task').click(new_task);
  $('#cancel_task').click(toggle_taskform);
  $('#clear_task').click(clear_taskform);
  $('#create_task').click(create_task);
  $('#update_task').click(update_task);

});