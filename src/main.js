import 'jstween';
import 'expose-loader?$!./libs/jqlite.min';
import {LayerLoader} from './core/LayerLoader';
import {model} from './core/model';


var $body = $('body'), $window = $(window);
var domLayer, flashLayer, threeLayer, videoLayer;

var layerData = [
    // {id: 'dom', per: 20},
    // {id: 'flash', per: 40, sub: true},
    // {id: 'three', per: 20},
    {id: 'video', per: 20},
];

var layerLoader = new LayerLoader({
    progress: function (per) {
        $('#loading .txt').text(Math.floor(per * 100) + '%');
        // console.log(Math.floor(per * 100));
    },
    complete: function () {
        domLayer = this.domLayer;
        flashLayer = this.flashLayer;
        threeLayer = this.threeLayer;
        videoLayer = this.videoLayer;

        if (domLayer) {
            $body.prepend(domLayer.el);
            domLayer.init();

            $(domLayer.el).on('touchmove', function (evt) {
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
        if (videoLayer) {
            $body.prepend(videoLayer.el);
            videoLayer.init();
        }

        init();
    }
});

layerLoader.load(layerData);


//---------------------------------------------------------------------------------全局resize
function resize() {
    if (domLayer) domLayer.resize();
    if (flashLayer) flashLayer.resize();
    if (threeLayer) threeLayer.resize();
    if (videoLayer) videoLayer.resize();
}

var timeId;
$window.on('resize', function () {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(function () {
        resize();
    }, 100);
});
resize();


//---------------------------------------------------------------------------------init
function init() {
    JT.to('#loading', 0.4, {
        opacity: 0, onEnd: function () {
            this.el.style.display = 'none';
        }
    });

}

