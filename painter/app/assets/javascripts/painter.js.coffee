$(document).ready ->
  create_paint_boxes = (boxes) ->
    for i in [0..boxes]
      $paint = $('<div/>').addClass 'paint'
      $('#canvas').append $paint

  create_paint_boxes 800

  paint_box = ->
    $box = $(this)
    color = $('#current').css 'background-color'
    $box.css 'background-color' , color

  $('.paint').click paint_box
  $('.paint').mouseover paint_box

  clear_colors = ->
    $('div#current').removeAttr 'style'
    $('#current').addClass 'eraser'
  $('#clear').click(clear_colors)

  clear_color_palette = ->
    $('#colors').empty()
  $('#clear_color_palette').click(clear_color_palette)

  add_color = ->
    color = $('#color').val()

    $box = $('<div/>')
    $box.addClass('box')
    $box.css 'background-color' , color
    $box.text color

    $('#colors').prepend $box
    $('#color').val('').focus()

  $('#add_color').click add_color

  set_color = ->
    $box = $(this)
    color = $box.css 'background-color'
    $('#current').css 'background-color', color

  $('#colors').on 'click', '.box', set_color

  add_image = ->
    img = $('#image').val()
    $box = $('<div/>')
    $box.addClass 'box'
    $box.css 'background', 'url(' + img + ')'
    $('#images').prepend($box)

  set_image = ->
    $box = $(this)
    image = $box.css 'background-image'
    $('#canvas').css 'background-image', image

  $('#add_image').click add_image
  $('#images').on 'click', '.box', set_image

  clear_image = ->
    $('#images').empty()
    $('#canvas').css 'background-image', 'none'

  $('#clear_image').click clear_image
