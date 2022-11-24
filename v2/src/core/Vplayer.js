import {model} from 'core/model';
import JT from 'jstween';

var Vplayer = function (url, options) {
    options = options || {};

    this.onStart = options.onStart || null;
    this.onEnd = options.onEnd || null;
    this.onPlaying = options.onPlaying || null;
    this.lastTime = 0;
    this.animateId = '';

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

    this.el.addEventListener('ended', () => {
        if (this.onEnd) this.onEnd();
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
            this.animateId = '';
        }
    });

    this.animate = () => {
        this.animateId = requestAnimationFrame(this.animate);
        if (this.onStart && this.lastTime === 0 && this.el.currentTime > 0) this.onStart();
        else if (this.onPlaying && this.lastTime !== this.el.currentTime) this.onPlaying();
        this.lastTime = this.el.currentTime;
    }

    if (options.width && options.height) this.resize(options.width, options.height);
    this.el.style.position = 'absolute';
    this.el.src = url + '.mp4';

};

Object.assign(Vplayer.prototype, {
    currentTime() {
        return this.el.currentTime;
    },

    load() {
        this.el.load();
    },

    play(time) {
        if (time !== undefined) this.seek(time);
        this.el.play();
        if (!this.animateId) this.animate();
    },

    seek(time) {
        this.el.currentTime = time;
        this.lastTime = time;
    },

    pause() {
        this.el.pause();
        if (this.animateId) {
            cancelAnimationFrame(this.animateId);
            this.animateId = '';
        }
    },

    destroy() {
        this.el.src = '';
    },

    resize(width, height) {
        JT.set(this.el, {width: width, height: height});
    },

    muted(bool) {
        this.el.muted = bool;
    }

});

export {Vplayer};