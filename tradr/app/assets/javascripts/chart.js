$(document).ready(function () {



function start_timer() {
  setInterval(show_chart, 1000);
}


  var show_chart = function () {
    // $('#chart').append('<div>#chart<'); //Trying to interpolate
    var stock = $(this).attr('id'); //gets current clicked on activity and get json data via ajax,



    $.ajax({
      dataType: 'json',
      type: 'get',
      url: '/stocks/chart/' + stock
    }).done(process_stock);

  };

  function add_chart_element(quote) {
  if(!$('#' + quote.symbol).length)
    $('#graphs').append('<div id=' + quote.symbol + '>');



}


var process_stock = function (stocks) {

    $('#chart').empty();
    new Morris.Line({
      element: 'chart',
      data: stocks,
      xkey: 'symbol',
      ykeys: ['purchase_price'],
      labels: [stocks],
    });
  };


  // var buy_stock = function (users) {
  //   $('#update_balance').empty();

  // var stock = $(this).attr('id'); //gets current clicked on activity and get json data via ajax,

  //   $.ajax({
  //     dataType: 'json',
  //     type: 'get',
  //     url: '/' + stock
  //   }).done(process_stock);
  // };

  // }







// Trying to type a check bo arguement
// $('.show_chart').change(function () {
//   //   show_chart();
//   if check_box_tag(stock.symbol, '', true)
//     is_complete: #{stock. || 'false'}

// });

 $('.show_chart').change(show_chart);


 // $('#buy_stock').click(buy_stock);




});

  // $('.show_chart').change(function () {
  //   show_chart();

     // $('#chart').append('<h2>sadfd</h2>');
  // })
