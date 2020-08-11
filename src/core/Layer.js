import Eventer from 'libs/eventer';

var Layer = function () {
    this.preloadCount = 0;
    this.preloadMax = 0;

    this.originRect = {width: 0, height: 0};
    this.modifyRect = {width: 0, height: 0};
};

Object.assign(Layer.prototype, {
    resizeEl() {
    },

    resize() {
        this.resizeEl();
    }
});

Eventer.initialize(Layer.prototype);

export {Layer};