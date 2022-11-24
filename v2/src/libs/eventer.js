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
        target.on = target.addEventListener = p.on;
        target.off = target.removeEventListener = p.off;
        target.offAll = target.removeAllEventListeners = p.offAll;
        target.hasListener = target.hasEventListener = p.hasListener;
        target.dispatch = target.dispatchEvent = p.dispatch;
        target.once = p.once;
    };

// public methods:
    p.on = function (type, listener, originListener) {
        var _listeners = this._listeners = this._listeners || {};
        var _arr = _listeners[type];
        if (_arr) this.off(type, listener);
        _arr = _listeners[type];
        if (originListener) listener.origin = originListener;
        if (!_arr) _listeners[type] = [listener];
        else _arr.push(listener);
        return this;
    };

    p.once = function (type, listener) {
        var _self = this;
        var onceListener = function (params) {
            listener(params);
            _self.off(type, onceListener);
        };
        this.on(type, onceListener, listener);
    };

    p.off = function (type, listener) {
        var _listeners = this._listeners;
        if (!_listeners) return;
        var _arr = _listeners[type];
        if (!_arr) return;
        if (!listener) {
            this.offAll(type);
            return;
        }
        for (var i = 0, l = _arr.length; i < l; i++) {
            if (_arr[i] == listener || _arr[i].origin == listener) {
                if (l == 1) delete (_listeners[type]);
                else _arr.splice(i, 1);
                break;
            }
        }
    };

    p.offAll = function (type) {
        if (!type) {
            this._listeners = null;
        } else {
            if (this._listeners) delete (this._listeners[type]);
        }
    };

    p.dispatch = function (type, data) {
        var _len, _listeners = this._listeners;
        if (type && _listeners) {
            var _arr = _listeners[type];
            if (!_arr || !(_len = _arr.length)) return;

            var _temp = _arr.slice(0);
            for (var i = 0; i < _len; i++) {
                _temp[i]({type: type, data: data});
            }
        }
    };

    p.hasListener = function (type) {
        var _listeners = this._listeners;
        return !!(_listeners && _listeners[type]);
    };

    p.addEventListener = p.on;
    p.removeEventListener = p.off;
    p.removeAllEventListeners = p.offAll;
    p.hasEventListener = p.hasListener;
    p.dispatchEvent = p.dispatch;

    return Eventer;

})));
