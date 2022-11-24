import 'imports-loader?this=>window!libs/createjs/createjs.1.0.0.min';
import {Layer} from 'core/Layer';
import {model} from 'core/model';
// import AdobeAn from 'exports-loader?AdobeAn!./main';

var FlashLayer = function () {
    Layer.call(this);

    //--------------------------------------------------------------------------------------导入场景数据
    this.el = document.createElement('canvas');
    this.el.id = 'flash-layer';
    this.el.style.position = 'absolute';
    this.$el = $(this.el);

    //--------------------------此处为flash场景id，必须设置
    this.compId = '';
    var comp = AdobeAn.getComposition(this.compId);
    var lib = comp.getLibrary();

    this.originRect.width = lib.properties.width;
    this.originRect.height = lib.properties.height;

    var loader = new createjs.LoadQueue(false, null, true);
    loader.setMaxConnections(100);

    createjs.MotionGuidePlugin.install();

    this.preloadCount = 0;
    this.preloadMax = lib.properties.manifest.length;
    loader.addEventListener("fileload", (evt) => {
        var images = comp.getImages();
        if (evt && (evt.item.type == "image")) images[evt.item.id] = evt.result;
        this.preloadCount++;
        this.dispatchEvent('progress', this.preloadCount / this.preloadMax);
    });
    loader.addEventListener("complete", (evt) => {
        var lib = comp.getLibrary();
        var ss = comp.getSpriteSheet();
        var queue = evt.target;
        var ssMetadata = lib.ssMetadata;
        for (var i = 0; i < ssMetadata.length; i++) {
            ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                "images": [queue.getResult(ssMetadata[i].name)],
                "frames": ssMetadata[i].frames
            })
        }

        this.root = new lib.main();
        this.stage = new lib.Stage(this.el);
        // stage.enableMouseOver();

        createjs.Touch.enable(this.stage);
        AdobeAn.compositionLoaded(lib.properties.id);

        this.stage.addChild(this.root);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", this.stage);

        this.resize();

        this.dispatchEvent('complete');
    });
    loader.loadManifest(lib.properties.manifest);

    this.resizeEl();
};

FlashLayer.prototype = Object.assign(Object.create(Layer.prototype), {
    constructor: FlashLayer,

    resize() {
        Layer.prototype.resize.call(this);

        this.el.width = this.modifyRect.width + 'px';
        this.el.height = this.modifyRect.height + 'px';
        this.el.style.width = window.innerWidth + 'px';
        this.el.style.height = window.innerHeight + 'px';

        if (this.stage === undefined) return;

        this.stage.tickOnUpdate = false;
        this.stage.update();
        this.stage.tickOnUpdate = true;
        this.stage.updateViewport(this.el.width, this.el.height);
    },

    init() {

    },


});


export {FlashLayer};