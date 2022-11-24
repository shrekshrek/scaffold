import $ from 'jquery';
import {LayerLoader} from 'core/LayerLoader';
import {model} from './core/model';
import {Aplayer} from 'core/Aplayer';
import JT from 'jstween';


var $body = $('body'), $window = $(window);
var preloadLayer, domLayer, flashLayer, threeLayer;

//-------------------------------------------------------------------preload
import {PreloadLayer} from "./preload/PreloadLayer";

preloadLayer = new PreloadLayer();
$body.prepend(preloadLayer.el);
preloadLayer.init();


//-------------------------------------------------------------------layers
var layerData = [
    {id: 'dom', per: 100},
    // {id: 'flash', per: 40, sub: true},
    // {id: 'three', per: 20},
];

var layerLoader = new LayerLoader({
    progress(per) {
        preloadLayer.progress(per);
    },
    complete() {
        domLayer = this.domLayer;
        flashLayer = this.flashLayer;
        threeLayer = this.threeLayer;

        if (domLayer) {
            $body.prepend(domLayer.el);
            domLayer.init();

            domLayer.$el.on('focusin', function () {
                window.scrollTo(0, 250);
            });
            domLayer.$el.on('focusout', function () {
                window.scrollTo(0, 0);
            });
            domLayer.$el.on('touchmove', function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            });
        }
        if (flashLayer) {
            $body.prepend(flashLayer.el);
            flashLayer.init();
        }
        if (threeLayer) {
            $body.prepend(threeLayer.el);
            threeLayer.init();
        }

        init();
    }
});


//---------------------------------------------------------------------------------全局resize
function resize() {
    if (domLayer) domLayer.resize();
    if (flashLayer) flashLayer.resize();
    if (threeLayer) threeLayer.resize();
}

var resizeId;
$window.on('resize', function () {
    if (resizeId) clearTimeout(resizeId);
    resizeId = setTimeout(function () {
        resize();
    }, 100);
});


//---------------------------------------------------------------------------------init
function init() {
    resize();
    JT.to(preloadLayer.el, 0.3, {
        autoAlpha: 0, onEnd: () => {
            preloadLayer.$el.remove();
        }
    });

    domLayer.pageOn('.intro');

    domLayer.once('click', function () {
    });

}


//---------------------------------------------------------------------------------audio
// var aplayer = new Aplayer({type: 'dom'});
// var audioList = [
//     {id: 'bgm', url: './media/bgm.mp3', loop: true, autoplay: true, volume: 0.5},
// ];
//
// if (model.ua.ios && model.ua.wechat) {
//     document.addEventListener("WeixinJSBridgeReady", function () {
//         aplayer.ready(audioList);
//     });
// } else {
//     aplayer.ready(audioList);
// }


//---------------------------------------------------------------------------------start
layerLoader.load(layerData);


