var step = 0;
var offset = 0;
var finished = false;

function populateCountries() {
    if (finished == true) {
        return;
    };
    var step = parseInt($('#step-input').val());
    var template_f = Handlebars.compile($('#country_template').html());
    var $posts = $('#content');
    $.ajax({
        url: '/countries/' + step + '/' + offset + '/',
        datatype: 'JSON'
    }).done(function (results) {
        if (results.length <= 0) {
            finished = true;
        };
            $.each(results, function (i, render) {
                $posts.append(template_f(render));
            });
            console.log('step: ' + step + ' & offset: ' + offset);
            offset = offset + step;
            console.log('step: ' + step + ' & offset: ' + offset);
    });
};

function populateAll() {
    if (finished == true) {
        return;
    };
    var step = 1000;
    var template_f = Handlebars.compile($('#country_template').html());
    var $posts = $('#content');
    $.ajax({
        url: '/countries/' + step + '/' + offset + '/',
        datatype: 'JSON'
    }).done(function (results) {
                finished = true;
            $.each(results, function (i, render) {
                    $posts.append(template_f(render));
                });
                console.log('step: ' + step + ' & offset: ' + offset);
            })
    };
    // Create the event bindings
    $(document).ready(function () {
        // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
        // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
        $('#populate-button').click(populateCountries);
        $('#all-button').click(populateAll);
        $('#reset-button').click(function () {
            step = 10;
            offset = 0;
            finished = false;
            // this function resets the button and scroll bindings, and sets pointer to 0
            pointer = 0;
            $('#step-input').val('10');
            $('#content').html('');
            $(window).unbind('scroll').scroll(scrollFunction);
            $('#populate-button').unbind('click').click(populateCountries);
            $('#all-button').unbind('click').click(allButtonClick);
        });

        $(window).scroll(scrollFunction);

        function scrollFunction() {
            var win = $(window);
            // Infinite scroll math!
            if (win.height() + win.scrollTop() >= $(document).height()) {
                populateCountries();
            };
        };

        // Disables other buttons and scroll event so we don't get duplicate data
        // This serves as a demonstration; we could also just set pointer = false

        function allButtonClick() {
            $(window).unbind('scroll');
            $('#populate-button').unbind('click');
            $('#all-button').unbind('click');
            populateAll();
        }
    });