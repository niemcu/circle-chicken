var Game = (function (chicken, bg) {
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
        requestAnimFrame(tick);
        ctx.drawImage(bg, 0, 0);
        if (keyState[37]) {
            chicken.moveLeft();
        } 

        if (keyState[39]) {
            chicken.moveRight();
        }
        chicken.update();
        ctx.drawImage(chicken.frameToDraw, chicken.x, chicken.y);
    };
})(chicken, bg);
