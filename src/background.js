    var bg = new Image(canvas.width, canvas.height);
    bg.src = 'assets/background.png';
    bg.onerror = function (e) {
        console.log('błąd: nie udało się załadować obrazka: ', e.path[0].getAttribute('src'));
    }
    console.log('img', bg);
