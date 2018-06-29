var events = {
    on: function(type, callback) {
        (_cbs[type] || (_cbs[type] = [])).unshift(callback);
    },
    off: function(type, callback) {
        if (!type) return;
        if (!callback) return delete _cbs[type];

        var cbs = _cbs[type] || [];
        var i;
        while (cbs && ~(i = cbs.indexOf(callback))) cbs.splice(i, 1);
    },
    trigger: function(type) {
        var cbs = _cbs[type];
        if (cbs) {
            var args = [].slice.call(arguments, 1);
            var l = cbs.length;
            while (l--) cbs[l].apply(this, args);
        }
    }
};
