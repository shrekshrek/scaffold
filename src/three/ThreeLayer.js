import 'expose-loader?THREE!libs/three/three.r90.min';
import {Layer} from 'core/Layer';
import {model} from 'core/model';


var ThreeLayer = function () {
    Layer.call(this);

    this.el = document.createElement('canvas');
    this.el.id = 'three';
    this.el.style.position = 'absolute';

    this.originRect.width = 750;
    this.originRect.height = 1334;

    this.cameraOriginZ = 2666;
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({canvas: this.el});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0xffffff);

    this.resizeEl();
};

ThreeLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: ThreeLayer,

    resizeEl: function () {
        var _iw = window.innerWidth, _ih = window.innerHeight;

        this.renderer.setSize(_iw, _ih);

        var _h = this.originRect.width * _ih / _iw;
        var _fov = Math.atan(_h / 2 / this.cameraOriginZ) * 2 / Math.PI * 180;
        this.camera.fov = _fov;

        this.camera.aspect = _iw / _ih;
        this.camera.updateProjectionMatrix();
    },

    init: function () {

    },

    resize: function () {
        Layer.prototype.resize.call(this);

    }

});


export {ThreeLayer};