import {Layer} from 'core/Layer';
import './preload.less';
import html from './preload.html';

import {model} from "core/model";
import JT from 'jstween';

var PreloadLayer = function () {
    Layer.call(this);

    this.el = document.createElement('div');
    this.el.id = 'preload-layer';
    this.el.style.position = 'absolute';
    this.el.style.transformOrigin = '0% 0%';
    this.el.style.width = '100%';
    this.el.style.height = '100%';
    this.el.style.overflow = 'hidden';
    this.$el = $(this.el);

    this.el.innerHTML = html;
};

PreloadLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: PreloadLayer,

    resize() {
        Layer.prototype.resize.call(this);
    },

    init() {
        this.$txt = $(this.el).find('.txt');
        this.$txt.text('0%');
    },

    progress(n) {
        this.$txt.text(Math.floor(n * 100) + '%');
    },

});


export {PreloadLayer};