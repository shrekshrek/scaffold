import {Layer} from 'core/Layer';
import './preload.less';
import html from './preload.html';

import JT from 'jstween';
import {model} from "core/model";

var PreloadLayer = function () {
    Layer.call(this);

    this.el = document.createElement('div');
    this.el.id = 'preload-layer';
    this.el.style.position = 'absolute';
    this.el.style.transformOrigin = '0% 0%';
    this.el.style.overflow = 'hidden';
    this.$el = $(this.el);

    this.originRect.width = 750;
    this.originRect.height = 1448;

    this.el.innerHTML = html;

    this.resizeEl();
};

PreloadLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: PreloadLayer,

    resizeEl: function () {
        var _iw = window.innerWidth, _ih = window.innerHeight;
        var _s = _iw / this.originRect.width;
        var _h = _ih / _s;
        this.modifyRect.width = this.originRect.width;
        this.modifyRect.height = _h;
        this.modifyRect.scale = _s;

        JT.set(this.el, {
            width: this.modifyRect.width,
            height: this.modifyRect.height,
            scale: this.modifyRect.scale
        });
    },

    init: function () {
        this.$txt = $(this.el).find('.txt');
        this.$txt.text('0%');
    },

    resize: function () {
        Layer.prototype.resize.call(this);
    },

    progress: function (n) {
        this.$txt.text(Math.floor(n * 100) + '%');
    },

});


export {PreloadLayer};