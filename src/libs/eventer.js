(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Eventer = factory());
}(this, (function () {
    'use strict';

    function Eventer() {
        this._listeners = null;
    }

    var p = Eventer.prototype;

// static public methods:
    Eventer.initialize = function (target) {
        target.addEventListener = target.on = p.addEventListener;
        target.removeEventListener = target.off = p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
    };

// public methods:
    p.addEventListener = function (type, listener) {
        var listeners = this._listeners = this._listeners || {};
        var arr = listeners[type];
        if (arr) this.removeEventListener(type, listener);
        arr = listeners[type];
        if (!arr) listeners[type] = [listener];
        else arr.push(listener);
        return this;
    };

    p.on = p.addEventListener;

    p.removeEventListener = function (type, listener) {
        var listeners = this._listeners;
        if (!listeners) return;
        var arr = listeners[type];
        if (!arr) return;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == listener) {
                if (l == 1) delete(listeners[type]);
                else arr.splice(i, 1);
                break;
            }
        }
    };

    p.off = p.removeEventListener;

    p.removeAllEventListeners = function (type) {
        if (!type) {
            this._listeners = null;
        } else {
            if (this._listeners) {
                delete(this._listeners[type]);
            }
        }
    };

    p.dispatchEvent = function (type, data) {
        var l, listeners = this._listeners;
        if (type && listeners) {
            var arr = listeners[type];
            if (!arr || !(l = arr.length)) return;

            arr = arr.slice(0);
            for (var i = 0; i < l; i++) {
                arr[i]({type: type, data: data});
            }
        }
    };

    p.hasEventListener = function (type) {
        var listeners = this._listeners;
        return !!(listeners && listeners[type]);
    };

    return Eventer;

})));
