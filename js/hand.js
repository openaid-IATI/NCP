function Hand(hand_object) {
    this.obj = hand_object;
    this.last_position = hand_object.palmPosition;
    this.moveTimeout;

    this.movement_direction = undefined;
    this.movement_speed = 0;
    this.moves = [];

    this.init();
}

Hand.prototype.init = function() {
    $('.hand').show().addClass('active')
}

Hand.prototype.update = function(hand) {
    this.obj = hand;
}

Hand.prototype.remove = function() {
    $('.hand').show().removeClass('active');
}

Hand.prototype.move = function(diff) {

    var new_direction;
    if (diff[0] > 0) {
        new_direction = 'right';
    } else {
        new_direction = 'left';
    }

    if (new_direction !== this.movement_direction) {
        clearTimeout(this.moveTimeout);
        
        var move = this.moves.reduce(function(pv, cv) { return pv + cv; }, 0);


        var direction = (move > 0) ? 'next' : 'prev';
        //$('#myCarousel').carousel(direction).carousel('pause'); 
        if (Math.abs(move) > 30) {

            /*console.log(move);
            this.moveTimeout = setTimeout(function() {
                console.log('dor', direction);
                $('.ccounter').ccountdown(direction);
            }, 800);*/
        }

        this.movement_direction = new_direction;
    } else {
        //console.log(diff[0]);
        this.moves.push(diff[0]);
    }
}