"use strict";
var _this = this;
exports.__esModule = true;
require("es6-promise");
var Loader = {
    images: {},
    loadImage: function (key, src) {
        var img = new Image();
        var d = new Promise(function (resolve, reject) {
            img.onload = function () {
                this.images[key] = img;
                resolve(img);
            }.bind(_this);
            img.onerror = function () {
                reject("Could not load image");
            };
        });
    },
    getImage: function (key) {
        return (key in _this.images) ? _this.images[key] : null;
    }
};
var Keyboard = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    priv_keys: {},
    startListening: function (keys) {
        window.addEventListener('keydown', _this.priv_onKeyDown.bind(_this));
        window.addEventListener('keyup', _this.priv_onKeyUp.bind(_this));
        keys.array.forEach(function (key) {
            this.priv_keys[key] = false;
        }.bind(_this));
    },
    priv_onKeyDown: function (event) {
        var keyCode = event.keyCode;
        if (keyCode in this.priv_keys) {
            event.preventDefault();
            this.priv_keys[keyCode] = true;
        }
    },
    priv_onKeyUp: function (event) {
        var keyCode = event.keyCode;
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
var Game = {
    run: function (context) {
        _this.ctx = context;
        _this.priv_previousElapsed = 0;
        var p = _this.load();
        Promise.all(p).then(function (loaded) {
            this.init();
            window.requestAnimationFrame(this.tick);
        }.bind(_this));
    }
};
