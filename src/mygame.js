(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var assets = {};

    var bg = new Image(canvas.width, canvas.height);
    bg.src = './background.png';

    console.log('img', bg);

    bg.onload = function () {
        ctx.drawImage(bg, 0, 0);
    }

    //    var preloaderToggler = true;

    //    var togglePreloader = function () {
    //        if (preloaderToggler) {
    //            preloaderToggler = false;
    //            var preloader = new Image();
    //            preloader.src = 'preloader.gif';
    //            preloader.onload = function () {
    //                ctx.drawImage(preloader, canvas.width/2 - 66, canvas.height/2 - 66);
    //            }
    //        } else {
    //            preloaderToggler = true;
    //            ctx.clearRect(0, 0, canvas.width, canvas.height);
    //        }

    //    }

    var gameLoaded = false;
    
    var chicken = {
        x: 0,
        y: 300,
        changeFrame: false,
        clock: 0,
        animation: {
            totalFrames: 4,
            currentFrame: 0,
            sources: [
                'chicken.png',
                'chicken01.png',
                'chicken02.png',
                'chicken03.png'
            ],
            frames: []
        },
        loadFrames: function () {
            for (i in this.animation.sources) {
                var img = new Image();
                img.src = this.animation.sources[i];
                this.animation.frames.push(img);
                console.log(this.animation.frames);
            }
        },
        moveRight: function () {
            this.x += 5;
            this.isMoving = true;
        },
        moveLeft: function () {
            this.x -= 5;
            this.isMoving = true;
        },
        draw: function () {
            if (this.isMoving) {
                this.clock++;
                this.isMoving = false;
            }
            //console.log(this);
            if (this.clock % 10 === 0) {
                this.changeFrame = true;
                this.clock = 0;
            }
            ctx.drawImage(this.animation.frames[this.animation.currentFrame], this.x, this.y);
            if (this.changeFrame) {
                if (this.animation.currentFrame == this.animation.totalFrames - 1) {
                    this.animation.currentFrame = 0;
                } else {
                    this.animation.currentFrame++;
                }
                this.changeFrame = false;
            }
        }
    };

    var loadImages = function () {
        var images = {
            'bg': {
                0: 'background.png'
            }, 
            'chicken': {
                0: 'chicken.png',
                1: 'chicken01.png',
                2: 'chicken02.png',
                3: 'chicken03.png'
            }
        };

        numImages = 5
        numLoaded = 0;

        for (i in images) {
            assets.i = {};
            for (j in i) {
                console.log('loading', images[i][j], '...');
                assets.i[j] = new Image();
                assets.i[j].src = images[i][j];
                assets.i[j].onload = function () {
                    console.log('loaded', images[i][j]);
                    numLoaded++;
                    console.log(numLoaded, numImages);
                    if (numLoaded === numImages) {
                        drawTest();
                    } 
                }
            }
        }
    };

    var j = 0;
    
    var drawTest = function () {
        //anim = requestAnimFrame(drawTest);
        //while (!gameLoaded) {};
        console.log(assets);
        ctx.drawImage(assets.bg, 0, 0);
        ctx.drawImage(assets.chicken[0], j, 330);
        j++;

        if (j === 140) cancelAnimationFrame(anim);
    };

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
        chicken.draw();
    };
})();
