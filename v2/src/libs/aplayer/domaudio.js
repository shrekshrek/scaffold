var DomAudio = function () {
    this.audios = {};
};

DomAudio.prototype = {
    load(items, complete) {
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            this.audios[item.id] = document.createElement('audio');
            if (item.url) this.audios[item.id].src = item.url;
            if (item.loop) this.audios[item.id].loop = 'loop';
            this.audios[item.id].autoplay = item.autoplay || false;
            this.audios[item.id].volume = item.volume || 1;
            if (item.autoplay) {
                this.audios[item.id].play();
            } else {
                this.audios[item.id].play();
                this.audios[item.id].pause();
            }
        }
        this.onComplete = complete;
        if (this.onComplete) this.onComplete();
    },

    play(id) {
        if (!this.audios[id]) return;
        this.audios[id].play();
    },

    stop(id) {
        if (!this.audios[id]) return;
        this.audios[id].pause();
    },

    volume(id, n) {
        if (!this.audios[id]) return;
        this.audios[id].volume = n;
    },

    muted(bool) {
        for (var i in this.audios) {
            if (this.audios[i]) {
                this.audios[i].muted = bool;
            }
        }
    }
};

export {DomAudio};