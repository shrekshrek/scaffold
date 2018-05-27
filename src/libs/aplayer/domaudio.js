var DomAudio = function () {
    this.audios = {};
};

DomAudio.prototype = {
    load: function (items) {
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            this.audios[item.id] = document.createElement('audio');
            if (item.url) this.audios[item.id].src = item.url;
            if (item.loop) this.audios[item.id].loop = 'loop';
            this.audios[item.id].autoplay = item.autoplay || 'none';
            this.audios[item.id].volume = item.volume || 1;
            if (item.autoplay) this.audios[item.id].play();
        }
    },

    play: function (id) {
        if (!this.audios[id]) return;

        this.audios[id].play();
    },

    stop: function (id) {
        if (!this.audios[id]) return;

        this.audios[id].pause();
    },

    volume: function (id, n) {
        if (!this.audios[id]) return;

        this.audios[id].volume = n;
    }
};

export {DomAudio};