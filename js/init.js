(function ($) {
    $(document).ready(function () {
        $('.collapsible').collapsible({
            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });

    $(document).ready(function () {
        $('select').material_select();
    });
    $(function () {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    });
})(jQuery); // end of jQuery name space

$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});