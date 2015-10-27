var Loader = (function () {

    var assets = {};

    var gameLoaded = false;

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

    })();
