import {Layer} from 'core/Layer';
import './dom.less';
import html from './dom.html';

import {model} from 'core/model';
import JT from 'jstween';
import JTL from 'jstimeline';

var DomLayer = function () {
    Layer.call(this);

    this.el = document.createElement('div');
    this.el.id = 'dom-layer';
    this.el.style.position = 'absolute';
    this.el.style.transformOrigin = '0% 0%';
    this.el.style.width = '100%';
    this.el.style.height = '100%';
    this.el.style.overflow = 'hidden';
    this.$el = $(this.el);

    this.el.innerHTML = html;
};

DomLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: DomLayer,

    resize() {
        Layer.prototype.resize.call(this);
    },

    init() {
        this.curPageId = null;
        this.pages = {};

        this.$el.on('touchend', () => {
            this.dispatch('click');
        });
    },

    createPage(id) {
        var _page = this.$el.find(id);
        this.pages[id] = _page;
    },

    pageOn(id) {
        if (this.pages[id] == undefined) this.createPage(id);
        if (this.curPageId != null && this.curPageId != id) this.pageOff();
        this.curPageId = id;
        var _page = this.pages[this.curPageId];
        JT.to(_page, 0.2, {autoAlpha: 1});
    },

    pageOff() {
        if (this.curPageId == null) return;
        var _page = this.pages[this.curPageId];
        JT.to(_page, 0.2, {autoAlpha: 0});
        this.curPageId = null;
    }

});


export {DomLayer};