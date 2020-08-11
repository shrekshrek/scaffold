import 'expose-loader?THREE!libs/three/three.r90.min';
import {Layer} from 'core/Layer';
import {model} from 'core/model';


var ThreeLayer = function () {
    Layer.call(this);

    this.el = document.createElement('canvas');
    this.el.id = 'three-layer';
    this.el.style.position = 'absolute';
    this.$el = $(this.el);

    this.originRect.width = 750;
    this.originRect.height = 1448;

    this.renderer = new THREE.WebGLRenderer({canvas: this.el});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0xffffff);

    this.resizeEl();
};

ThreeLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: ThreeLayer,

    resizeEl() {
        var _iw = window.innerWidth, _ih = window.innerHeight;

        this.renderer.setSize(_iw, _ih);
    },

    init() {

    },

    resize() {
        Layer.prototype.resize.call(this);

    }

});


export {ThreeLayer};