var LayerLoader = function (options) {
    this.progress = options.progress || function () {
    };
    this.complete = options.complete || function () {
    };
};

Object.assign(LayerLoader.prototype, {
    load(data) {
        this.layerData = data;
        this.percent = 0;
        this.loadLayer(0);
    },

    loadLayer(id) {
        if (id < this.layerData.length) {
            var _curData = this.layerData[id];
            switch (_curData.id) {
                case 'dom':
                    import('../dom/DomLayer').then(({DomLayer}) => {
                        this.domLayer = new DomLayer();
                        this.checkSubload(_curData, this.domLayer, id);
                    });
                    break;
                case 'flash':
                    import('../flash/FlashLayer').then(({FlashLayer}) => {
                        this.flashLayer = new FlashLayer();
                        this.checkSubload(_curData, this.flashLayer, id);
                    });
                    break;
                case 'three':
                    import('../three/ThreeLayer').then(({ThreeLayer}) => {
                        this.threeLayer = new ThreeLayer();
                        this.checkSubload(_curData, this.threeLayer, id);
                    });
                    break;
            }
        } else {
            this.complete.call(this);
        }
    },

    checkSubload(data, layer, id) {
        if (data.sub) {
            layer.on('progress', (evt) => {
                this.progress.call(this, this.percent + evt.data * this.layerData[id].per / 100);
            }).on('complete', () => {
                this.percent += this.layerData[id].per / 100;
                this.progress.call(this, this.percent);
                this.loadLayer(id + 1);
            });
        } else {
            this.percent += this.layerData[id].per / 100;
            this.progress.call(this, this.percent);
            this.loadLayer(id + 1);
        }
    }
});

export {LayerLoader};