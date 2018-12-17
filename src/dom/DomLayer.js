import {Layer} from 'core/Layer';
import './dom.less';
import html from './dom.html';

import JT from 'jstween';
import JTL from 'jstimeline';
import {model} from 'core/model';


var DomLayer = function () {
    Layer.call(this);

    this.el = document.createElement('div');
    this.el.id = 'dom-layer';
    this.el.style.position = 'absolute';
    this.el.style.transformOrigin = '0% 0%';
    this.el.style.overflow = 'hidden';
    this.$el = $(this.el);

    this.originRect.width = 750;
    this.originRect.height = 1448;

    this.el.innerHTML = html;

    this.resizeEl();
};

DomLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: DomLayer,

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
        var tl = JTL.create();
        tl.to('#test', 1, {x: 100}, 1);
        tl.play();
    },

    resize: function () {
        Layer.prototype.resize.call(this);

    }

});


export {DomLayer};