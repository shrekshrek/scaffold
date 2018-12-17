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
        this.curPageId = null;
        this.pages = {};
    },

    resize: function () {
        Layer.prototype.resize.call(this);

    },

    createPage: function (id) {
        var _page = this.$el.find(id);
        this.pages[id] = _page;
    },

    pageOn: function (id) {
        if (this.pages[id] == undefined) this.createPage(id);
        if (this.curPageId != null && this.curPageId != id) this.pageOff();
        this.curPageId = id;
        var _page = this.pages[this.curPageId];
        JT.to(_page, 0.2, {autoAlpha: 1});
    },

    pageOff: function () {
        if (this.curPageId == null) return;
        var _page = this.pages[this.curPageId];
        JT.to(_page, 0.2, {autoAlpha: 0});
        this.curPageId = null;
    }

});


export {DomLayer};