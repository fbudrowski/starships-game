import "es6-promise";
typeof globalThis;
let Loader = {
    images: {},
    loadImage: (key, src) => {
        let img = new Image();
        let d = new Promise((resolve, reject) => {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(this);
            img.onerror = () => {
                reject("Could not load image");
            };
        });
    },
    getImage: (key) => {
        return (key in this.images) ? this.images[key] : null;
    },
};
let Keyboard = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    priv_keys: {},
    startListening: (keys) => {
        window.addEventListener('keydown', this.priv_onKeyDown.bind(this));
        window.addEventListener('keyup', this.priv_onKeyUp.bind(this));
        keys.array.forEach(function (key) {
            this.priv_keys[key] = false;
        }.bind(this));
    },
    priv_onKeyDown: function (event) {
        let keyCode = event.keyCode;
        if (keyCode in this.priv_keys) {
            event.preventDefault();
            this.priv_keys[keyCode] = true;
        }
    },
    priv_onKeyUp: function (event) {
        let keyCode = event.keyCode;
        if (keyCode in this.priv_keys) {
            event.preventDefault();
            this.priv_keys[keyCode] = false;
        }
    },
    isDown: function (keyCode) {
        if (!(keyCode in this.priv_keys)) {
            throw new Error("We are not listening to " + keyCode + " anymore!");
        }
        return this.priv_keys[keyCode];
    }
};
let Game = {
    run: (context) => {
        this.ctx = context;
        this.priv_previousElapsed = 0;
        let p = this.load();
        Promise.all(p).then(function (loaded) {
            this.init();
            window.requestAnimationFrame(this.tick);
        }.bind(this));
    },
    tick: (elapsed) => {
        window.requestAnimationFrame(this.tick);
        this.ctx.clearRect(0, 0, 512, 512);
        let delta = Math.min((elapsed - this._previousElapsed) / 1000.0, 0.25);
        this._previousElapsed = elapsed;
        this.update(delta);
        this.render();
    },
    init: () => { },
    update: (delta) => { },
    render: () => { },
};
window.onload = function () {
    let context = document.getElementById('demo').getContext('2d');
    Game.run(context);
};
//# sourceMappingURL=loaders.js.map