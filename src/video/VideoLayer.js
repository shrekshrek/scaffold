import {Layer} from 'core/Layer';
import {Vplayer} from 'core/Vplayer';

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
        // this.globalCanvas = document.createElement('canvas');

        this.vplayer = new Vplayer('./media/v1', {
            width: this.originRect.width,
            height: this.originRect.height,
            // canvas: this.globalCanvas,
            onStart: () => {
                this.dispatchEvent('start');
            },
            onEnd: () => {
                this.dispatchEvent('end');
            }
        });
        this.el.appendChild(this.vplayer.el);

        this.resize();
    },

    resize: function () {
        Layer.prototype.resize.call(this);

        if (this.vplayer) {
            this.vplayer.resize(this.originRect.width * this.modifyRect.scale, this.originRect.height * this.modifyRect.scale);
            this.vplayer.el.style.top = (window.innerHeight - this.originRect.height * this.modifyRect.scale) / 2 + 'px';
        }
    }

});

export {VideoLayer};