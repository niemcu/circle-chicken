var Game = (function (loader, chicken, bg) {
    var assets = {};

    var preloader = { 
        el: document.getElementById('preloader'),
        show: function () {
            this.el.innerHTML = 'Loading...';
        },
        hide: function () {
            this.el.innerHTML = '';
        }
    };

    preloader.show();
    console.log(loader); 
    loader.loadGame(function (loadedAssets) {
        assets = loadedAssets;
        init();
        preloader.hide();
        tick(); // first tick = start game loop.
    });

    var init = function () {
        chicken.frames = assets.chicken;
    };

    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

    var requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){window.setTimeout(callback, 1000 / 60);};
    })();

    var keyState = {};

    chicken.loadFrames();
    setTimeout(function() {
        tick();
        window.addEventListener('keydown', function (e) {
            keyState[e.keyCode] = true;
        }, true);

        window.addEventListener('keyup', function (e) {
            keyState[e.keyCode] = false;
        }, true);
    }, 1500);

    var tick = function () {
        var lastMove = lastMove || 'right';
        requestAnimFrame(tick);
        ctx.drawImage(bg, 0, 0);
        if (keyState[37]) {
            chicken.moveLeft();
            lastMove = 'left';
        } 

        if (keyState[39]) {
            chicken.moveRight();
            lastMove = 'right';
        }

        if (keyState[32]) {
            chicken.jump();
        }
        chicken.update();
        if (lastMove === 'left') {
            var newx = chicken.x + 83,
                newy = chicken.y + 60,
                width = 166,
                height = 120;
            ctx.translate(newx, newy);
            ctx.scale(-1, 1);
            ctx.drawImage(chicken.frameToDraw, -width /2, -height/2, width, height);
            ctx.scale(-1, 1);
            ctx.translate(-newx, -newy);
        } else {
            ctx.drawImage(chicken.frameToDraw, chicken.x, chicken.y);
        }
        // obstacle
        ctx.fillRect(40, 40, 120, 120);
    };
})(loader, chicken, bg);
