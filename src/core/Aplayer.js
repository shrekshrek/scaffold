import {WebAudio} from 'libs/aplayer/webaudio';
import {DomAudio} from 'libs/aplayer/domaudio';

var Aplayer = function (options) {
    options = options || {};
    this.type = options.type || 'dom';

    this.play = (id) => {
        if (this.type === 'web') {
            this.webaudio.play(id);
        } else if (this.type === 'dom') {
            this.domaudio.play(id);
        }
    };

    this.stop = (id) => {
        if (this.type === 'web') {
            this.webaudio.stop(id);
        } else if (this.type === 'dom') {
            this.domaudio.stop(id);
        }
    };

    this.ready = (items) => {
        if (this.type === 'web') {
            this.webaudio = new WebAudio();
            this.webaudio.ready();
            this.webaudio.load(items);
        } else if (this.type === 'dom') {
            this.domaudio = new DomAudio();
            this.domaudio.load(items);
        }
    };

    this.volume = (id, n) => {
        if (this.type === 'web') {
            this.webaudio.volume(id, n);
        } else if (this.type === 'dom') {
            this.domaudio.volume(id, n);
        }
    };

};


export {Aplayer};