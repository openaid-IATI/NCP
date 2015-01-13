function Countdown(seconds) {
    this.timer = seconds;
    this.seconds = seconds;

    this.next_call_timeout = null;

    return this;
}

Countdown.prototype.loop = function() {
    this.next_timeout;
    this.timer -= 1;
    if (this.timer < 1) {
        this.next();
    }

    $('.ccounter input.second').val(this.timer).trigger("change");

    clearTimeout(this.next_call_timeout);
    this.next_call_timeout = setTimeout(this.loop.bind(this), 1000);
}

Countdown.prototype.next = function() {
    ncp.load_next();
    this.refresh();
}
Countdown.prototype.prev = function() {
    hps.prev();
    this.refresh();
}

Countdown.prototype.refresh = function() {
    this.timer = this.seconds;
    clearTimeout(this.next_call_timeout);
    this.loop();
}

Countdown.prototype.stop = function(callback) {
    clearTimeout(this.next_call_timeout);
    if (typeof callback !== 'undefined') {
        callback();
    }
}

Countdown.prototype.pause = function() {
    clearTimeout(this.next_call_timeout);
}
