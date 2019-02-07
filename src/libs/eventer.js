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
        target.on = target.addEventListener = p.addEventListener;
        target.off = target.removeEventListener = p.removeEventListener;
        target.offAll = target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasListener = target.hasEventListener = p.hasEventListener;
        target.dispatch = target.dispatchEvent = p.dispatchEvent;
    };

// public methods:
    p.on = function (type, listener, originListener) {
        var listeners = this._listeners = this._listeners || {};
        var arr = listeners[type];
        if (arr) this.off(type, listener);
        arr = listeners[type];
        if (originListener) listener.origin = listener;
        if (!arr) listeners[type] = [listener];
        else arr.push(listener);
        return this;
    };

    p.once = function (type, listener) {
        var onceListener = function (params) {
            p.off(type, onceListener);
            listener(params);
        }
        p.on(type, onceListener, listener);
    };

    p.off = function (type, listener) {
        var listeners = this._listeners;
        if (!listeners) return;
        var arr = listeners[type];
        if (!arr) return;
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == listener || arr[i].origin == listener) {
                if (l == 1) delete(listeners[type]);
                else arr.splice(i, 1);
                break;
            }
        }
    };

    p.offAll = function (type) {
        if (!type) {
            this._listeners = null;
        } else {
            if (this._listeners) {
                delete(this._listeners[type]);
            }
        }
    };

    p.dispatch = function (type, data) {
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

    p.hasListener = function (type) {
        var listeners = this._listeners;
        return !!(listeners && listeners[type]);
    };

    p.addEventListener = p.on;
    p.removeEventListener = p.off;
    p.removeAllEventListeners = p.offAll;
    p.hasEventListener = p.hasListener;
    p.dispatchEvent = p.dispatch;

    return Eventer;

})));
