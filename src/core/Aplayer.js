import {WebAudio} from 'libs/aplayer/webaudio';
import {DomAudio} from 'libs/aplayer/domaudio';

var Aplayer = function (options) {
    options = options || {};
    this.type = options.type || 'dom';

    this.play = (id) => {
        if (this.type === 'web') {
            if (!this.webaudio) return;
            this.webaudio.play(id);
        } else if (this.type === 'dom') {
            if (!this.domaudio) return;
            this.domaudio.play(id);
        }
    };

    this.stop = (id) => {
        if (this.type === 'web') {
            if (!this.webaudio) return;
            this.webaudio.stop(id);
        } else if (this.type === 'dom') {
            if (!this.domaudio) return;
            this.domaudio.stop(id);
        }
    };

    this.ready = (items, complete) => {
        if (this.type === 'web') {
            this.webaudio = new WebAudio();
            this.webaudio.ready();
            this.webaudio.load(items, complete);
        } else if (this.type === 'dom') {
            this.domaudio = new DomAudio();
            this.domaudio.load(items, complete);
        }
    };

    this.volume = (id, n) => {
        if (this.type === 'web') {
            if (!this.webaudio) return;
            this.webaudio.volume(id, n);
        } else if (this.type === 'dom') {
            if (!this.domaudio) return;
            this.domaudio.volume(id, n);
        }
    };

    this.muted = (bool) => {
        if (this.type === 'web') {
            if (!this.webaudio) return;
            this.webaudio.muted(bool);
        } else if (this.type === 'dom') {
            if (!this.domaudio) return;
            this.domaudio.muted(bool);
        }
    };

};


export {Aplayer};