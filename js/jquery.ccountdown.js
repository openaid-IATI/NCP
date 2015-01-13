(function($) {
    $.fn.ccountdown = function(_s) {
        var $this = this;
        console.log(_s);
        var _zerocount = 0;
        // calling function first time so that it wll setup remaining time
        var _changeTime = function() {
            var _secondsleft = $($this).prop("seconds_left");
            if (_secondsleft > 0){
                _secondsleft = _secondsleft - 1;
            }

            if (_secondsleft === 0) {
                _secondsleft = $($this).prop("timer");
                $($this).ccountdown('next');
            }

            $($this).prop("seconds_left", _secondsleft);
            //console.log(_secondsleft);
            var $ss = $($this).find(".second");
            $ss.val(_secondsleft).trigger("change");
        };

        if (typeof _s === 'number') {
            $(this).prop("timer", _s);
            $(this).prop("seconds_left", _s);

            _changeTime();

            $(this).ccountdown('play');
        } else {
            if (_s === 'stop') {
                clearInterval($(this).prop('int'));
            }
            if (_s === 'play') {
                $(this).prop('int', setInterval(_changeTime, 1000));
            }
            if (_s === 'next') {
                hps.next();
            }
            if (_s === 'prev') {
                hps.prev();
            }
        }


        return this;
    };
})(jQuery);
