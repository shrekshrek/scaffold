import Eventer from 'libs/eventer';

var Layer = function () {
    this.preloadCount = 0;
    this.preloadMax = 0;

    this.originRect = {width: 750, height: 1448};
    this.modifyRect = {width: 0, height: 0, scale: 1};
    this.resizeEl();
};

Object.assign(Layer.prototype, {
    bindEvent(obj) {
        for (var i in obj) {
            var _arr = i.split(':');
            var _str = _arr[0], _act = _arr[1] || "touchend";
            var _dom = this.$el.find(_str);
            _dom.on(_act, obj[i]);
        }
    },

    unbindEvent(obj) {
        for (var i in obj) {
            var _arr = i.split(':');
            var _str = _arr[0], _act = _arr[1] || "touchend";
            var _dom = this.$el.find(_str);
            _dom.off(_act, obj[i]);
        }
    },

    resizeEl() {
        var _iw = window.innerWidth, _ih = window.innerHeight;
        var _s = _iw / this.originRect.width;
        var _h = _ih / _s;
        this.modifyRect.width = this.originRect.width;
        this.modifyRect.height = _h;
        this.modifyRect.scale = _s;
    },

    resize() {
        this.resizeEl();
    }
});

Eventer.initialize(Layer.prototype);

export {Layer};