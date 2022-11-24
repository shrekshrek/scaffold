import 'expose-loader?THREE!libs/three/three.r142.min';
import {Layer} from 'core/Layer';
import {model} from 'core/model';


var ThreeLayer = function () {
    Layer.call(this);

    this.el = document.createElement('canvas');
    this.el.id = 'three-layer';
    this.el.style.position = 'absolute';
    this.$el = $(this.el);

    this.renderer = new THREE.WebGLRenderer({canvas: this.el});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0xffffff);
};

ThreeLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: ThreeLayer,

    resize() {
        Layer.prototype.resize.call(this);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    init() {

    },

});


export {ThreeLayer};