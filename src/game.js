(function () {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        player = {},
        ground = [],
        platformWidth = 32,
        platformHeight = canvas.height - platformWidth * 4;

    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback, element){window.setTimeout(callback, 1000 / 60);};
    })();

    var assetLoader = (function () {
        this.images = {
            'bg': 'background.png',
            'chicken': 'chicken.png'
        };

        var assetsLoaded = 0;
        var numImages = Object.keys(this.images).length;
        this.totalAssets = numImages;

        function assetLoaded(dict, name) {
            if (this[dict][name].status !== 'loading') {
                return;
            }
            this[dict][name].status = 'loaded';
            assetsLoaded++;
            if (assetsLoaded === this.totalAssets && typeof this.finished = 'function') {
                this.finished();
            }
        }

        this.downloadAll = function() {
            var _self = this;
            var src;
            for (var img in this.images) {
                if (this.images.hasOwnProperty(img)) {
                    src = this.images[img];
                    (function(_self, img) {
                        _self.images[img] = new Image();
                        _self.images[img].status = 'loading';
                        _self.images[img].name = img;
                        _self.images[img].onload = function () {
                            assetLoaded.call(_self, 'images', img)
                        };
                        _self.images[img].src = src;
                    })(_self, img);
                }
            }
        }

        return {
            images: this.images,
            totalAssets: this.totalAssets,
            downloadAll: this.downloadAll
        };
    })();

    assetLoader.finished = function () {
        startGame();
    }

    function startGame() {
        this.ctx.drawImage
    }
})();
