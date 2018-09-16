// from: https://github.com/PierfrancescoSoffritti

function EventBus() {
    // var this.eventObjects = new Array();
    this.eventObjects = new Array();
    
    /**
     * [subscribe Subscribe for a specific event]
     * @param  {[string]} eventType [the event name]
     * @param  {Function} callback  [function that will be called when 'eventType' occurs]
     */
    this.subscribe = function (eventType, callback) {
        // check if someone is already subscribed to this event
        var eventObject = this.eventObjects.filter(function (eventObject) { return eventObject.eventType === eventType; })[0];

        if(eventObject) {
            // if there are already callbacks for this event -> add the new callback
            eventObject.callbacks.push(callback);
        } else {
            // if there are no callbacks for this event -> create a new entry in the array
            var eventObject = new EventObject(eventType);
            eventObject.callbacks.push(callback);

            this.eventObjects.push(eventObject);
        }
    }

    /**
     * [post Post an envent on the event bus]
     * @param  {[string]} eventType [event]
     * @param  {[object]} argument  [an optional argument]
     */
    this.post = function (eventType, argument1, argument2) {
        // call every callback of the event
        this.eventObjects
            .filter(function (eventObject) { return eventObject.eventType === eventType; })
            .forEach(function (eventObject) { eventObject.callbacks.forEach(function (callback) { callback(eventType, argument1, argument2) }) });
    }

    /**
     * [EventObject Class representing an association between an event type and its list of callbacks]
     * @param {[string]} type [event name]
     */
    function EventObject(type) {
        this.eventType = type;
        this.callbacks = new Array();
    }

    /**
     * [unsubscribe Unsubscribe from the specific event]
     * Added by Michael Coons
     * @param  {[string]} eventType [the event name]
     * @param  {Function} callback  [function that will be called when 'eventType' occurs]
     */
    this.unsubscribe = function (eventType, callback) {
        // get the eventObject for the event
        this.eventObjects
        .filter(function (eventObject) { return eventObject.eventType === eventType; })
        // remove the callback from the eventObject's callback array
        .forEach(function (eventObject) { eventObject.callbacks = eventObject.callbacks.filter(function (cb) { return cb != callback }) });

        // if the callbacks array is now empty then remove the eventObject 
        // from the this.eventObjects array 

        var eventObject = this.eventObjects.filter(function (eventObject) { return eventObject.eventType === eventType; })[0];
        if (eventObject.callbacks.length === 0){
            this.eventObjects = this.eventObjects.filter(function (eventObject) { return eventObject.eventType != eventType; })

        }

    }

}