//TODO co w przypadku gdy nie ma danego obrazka?
var loader = (function () {

    var dir = 'assets/',
        totalImages = 0,
        loadedImages = 0;

    var sources = [
        {
            name: 'bg',
            path: 'background.png'
        }, {
            name: 'chicken',
            paths: [    
                'chicken.png',
                'chicken01.png',
                'chicken02.png',
                'chicken03.png'
            ]
        }
    ];

    var assets = {};

    var gameLoaded = false;

    var j = 0;
    
    var loadGame = function(callback) {
        sources.forEach(function (obj, idx) {
            if (obj.path) {
                totalImages++;
                var img = new Image();
                img.src = dir + obj.path;
                img.onload = function () {
                    loadedImages++;
                    assets[obj.name] = img;
                    checkIfFinished();
                };            
            } else if (obj.paths) {
                obj.paths.forEach(function (frame, idx) {
                    totalImages++;
                    var img = new Image();
                    img.src = dir + frame;
                    img.onload = function () {
                        loadedImages++;
                        assets[obj.name] = assets[obj.name] || [];
                        assets[obj.name].push(img);
                        checkIfFinished();
                    };
                });
            }
        });
        // do your job a potem
        var checkIfFinished = function () {
            if (totalImages === loadedImages) {
                if (typeof callback === 'function') {
                    callback(assets);
                }
            }
        };
    }

    return {
        loadGame: loadGame
    }

})();
