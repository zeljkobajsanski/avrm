define(function() {
    return {
        attached: function() {
            $('.sliding-door-top').click(function () {
                $(this).animate({
                    left: '101%'
                }, 500, 'easeInOutExpo');
                return false;
            });

            $('.sliding-door-bottom a em').click(function () {
                $(this).parent().parent().parent().find('.sliding-door-top').animate({
                    left: '0px'
                }, 500, 'easeOutBounce');
                return false;

            });
        }
    };
});