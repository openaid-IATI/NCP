function DataBus() {
    this.listeners = [];

    this.add_listener = function(listener) {
        this.listeners.push(listener);
    }

    this.fire = function(action, params) {
        $.each(this.listeners, function(_, listener) {
            if (listener[action]) {
                listener[action].apply(listener, params);
            }
        });
    }
}


var dataBus = new DataBus();
