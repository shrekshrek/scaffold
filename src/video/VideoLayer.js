import {Layer} from 'core/Layer';
import {Vplayer} from 'core/Vplayer';
import {model} from 'core/model';

var VideoLayer = function () {
    Layer.call(this);

    this.el = document.createElement('div');
    this.el.id = 'video-layer';
    this.el.style.position = 'absolute';
    this.el.style.transformOrigin = '0% 0%';
    this.el.style.overflow = 'hidden';
    this.$el = $(this.el);

    this.originRect.width = 750;
    this.originRect.height = 1334;

    this.resizeEl();
};

VideoLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: VideoLayer,

    resizeEl: function () {
        var _iw = window.innerWidth, _ih = window.innerHeight;
        var _s = _iw / this.originRect.width;
        var _h = _ih / _s;
        this.modifyRect.width = this.originRect.width;
        this.modifyRect.height = _h;
        this.modifyRect.scale = _s;

        JT.set(this.el, {
            width: _iw,
            height: _ih
        });
    },

    init: function () {
        model.globalCanvas = document.createElement('canvas');
        this.curVideoId = null;
        this.isMuted = false;
        this.videos = {};
    },

    resize: function () {
        Layer.prototype.resize.call(this);

        for (var i in this.videos) {
            var _player = this.videos[i];
            if (_player) {
                _player.resize(this.originRect.width * this.modifyRect.scale, this.originRect.height * this.modifyRect.scale);
                _player.el.style.top = (window.innerHeight - this.originRect.height * this.modifyRect.scale) / 2 + 'px';
            }
        }
    },

    createPlayer: function (name) {
        var _player = new Vplayer('./media/' + name, {
            width: this.originRect.width * this.modifyRect.scale,
            height: this.originRect.height * this.modifyRect.scale,
            canvas: model.globalCanvas,
            onStart: () => {
                this.dispatchEvent('start', name);
            },
            onEnd: () => {
                this.dispatchEvent('end', name);
            }
        });
        _player.el.style.top = (window.innerHeight - this.originRect.height * this.modifyRect.scale) / 2 + 'px';
        _player.muted(this.isMuted);
        this.videos[name] = _player;
    },

    muted: function (bool) {
        for (var i in this.videos) {
            var _player = this.videos[i];
            _player.muted(bool);
        }
        this.isMuted = bool;
    },

    play: function (id, time) {
        if (this.videos[id] == undefined) this.createPlayer(id);
        if (this.curVideoId != null && this.curVideoId != id) this.pause();
        this.curVideoId = id;
        var _player = this.videos[this.curVideoId];
        this.el.appendChild(_player.el);
        _player.play(time);
    },

    pause: function () {
        if (this.curVideoId == null) return;
        var _player = this.videos[this.curVideoId];
        _player.pause();
        this.el.removeChild(_player.el);
        this.curVideoId = null;
    },

    ready: function (id) {
        if (this.videos[id] == undefined) this.createPlayer(id);
        var _player = this.videos[id];
        _player.play();
        _player.pause();
    }

});

export {VideoLayer};