import JSMpeg from 'exports-loader?JSMpeg!libs/vplayer/jsmpeg.min';
import enableInlineVideo from 'exports-loader?enableInlineVideo!libs/vplayer/iphone-inline-video.min';
import {model} from 'core/model';

var Vplayer = function (url, options) {
    options = options || {};

    this.onStart = options.onStart || null;
    this.onEnd = options.onEnd || null;
    this.onPlaying = options.onPlaying || null;
    this.lastTime = 0;
    this.type = options.type || 'mp4';
    this.canvas = options.canvas || null;

    // if (model.ua.ios || model.ua.wechat && this.type === 'mp4') {
    if (model.ua.ios && this.type === 'mp4') {
        this.type = 'video';
        this.el = document.createElement('video');
        this.el.preload = 'auto';
        this.el.loop = options.loop || false;
        this.el.setAttribute('webkit-playsinline', 'true');
        this.el.setAttribute('playsinline', 'true');
        if (model.ua.android) {
            this.el.setAttribute('x-webkit-airplay', 'true');
            this.el.setAttribute('x5-video-player-type', 'h5');
            this.el.setAttribute('x5-video-player-fullscreen', 'true');
            this.el.setAttribute('x5-video-orientation', 'portrait');

            this.el.addEventListener('x5videoenterfullscreen', () => {
                this.el.play();
            });
        }
        this.el.src = url + '.mp4';
        this.player = this.el;

        var driver;
        if (model.ua.weibo) {
            enableInlineVideo(this.el);
            driver = this.el['bfred-it:iphone-inline-video'].driver;
        } else {
            driver = this.player;
        }

        driver.addEventListener('ended', () => {
            if (this.onEnd) this.onEnd();
        });
    } else {
        this.type = 'canvas';
        this.el = this.canvas || document.createElement('canvas');
        this.player = new JSMpeg.Player(url + '.ts', {
            canvas: this.el,
            loop: options.loop || false,
            onEnded: () => {
                if (this.onEnd) this.onEnd();
            }
        });
    }

    this.animate = () => {
        this.animateId = requestAnimationFrame(this.animate);
        if (this.onStart && this.lastTime === 0 && this.player.currentTime > 0) this.onStart();
        else if (this.onPlaying && this.lastTime !== this.player.currentTime) this.onPlaying();
        this.lastTime = this.player.currentTime;
    }

    if (options.width && options.height) this.resize(options.width, options.height);
    this.el.style.position = 'absolute';
};

Object.assign(Vplayer.prototype, {
    currentTime() {
        return this.player.currentTime;
    },

    load() {
        if (this.type === 'video') this.player.load();
        else this.player.stop();
    },

    play(time) {
        if (time !== undefined) this.seek(time);
        this.player.play();
        this.animate();
    },

    seek(time) {
        this.player.currentTime = time;
        this.lastTime = time;
    },

    pause() {
        this.player.pause();
        if (this.animateId) cancelAnimationFrame(this.animateId);
    },

    destroy() {
        if (this.type === 'video') this.player.src = '';
        else this.player.destroy();
    },

    resize(width, height) {
        if (this.type == 'video') {
            this.el.style.width = width + 'px';
            this.el.style.height = height + 'px';
        } else {
            this.el.style.width = width * 1.025 + 'px';
            this.el.style.height = height + 'px';
        }
    },

    muted(bool) {
        if (this.type === 'video') this.player.muted = bool;
        else this.player.volume = bool ? 0 : 1;
    }

});

export {Vplayer};