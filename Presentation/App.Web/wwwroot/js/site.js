//Cool I came across a solution written by devlucky who provides a small piece of javascript to fix the problem.
//Check out this article https://medium.com/@devlucky/about-passive-event-listeners-224ff620e68c
//This is the javascript that made the listeners passive.
(function () {
    
    var supportsPassive = eventListenerOptionsSupported();

    if (supportsPassive) {
        var addEvent = EventTarget.prototype.addEventListener;
        overwriteAddEvent(addEvent);
    }

    function overwriteAddEvent(superMethod) {
        var defaultOptions = {
            passive: false, //default is true 
            capture: false
        };

        EventTarget.prototype.addEventListener = function (type, listener, options) {
            var usesListenerOptions = typeof options === 'object';
            var useCapture = usesListenerOptions ? options.capture : options;

            options = usesListenerOptions ? options : {};
            options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
            options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;

            superMethod.call(this, type, listener, options);
        };
    }

    function eventListenerOptionsSupported() {
        var supported = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supported = true;
                }
            });
            window.addEventListener("touchstart", null, opts);
        } catch (e) { }

        return supported;
    }
})();
