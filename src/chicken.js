var chicken = {
    x: 0,
    y: 300,
    step: 3,
    changeFrame: false,
    frameToDraw: null,
    clock: 0,
    cntr: 0, 
    adder: -8, 
    animation: {
        totalFrames: 4,
        currentFrame: 0,
        sources: [
            'assets/chicken.png',
        'assets/chicken01.png',
        'assets/chicken02.png',
        'assets/chicken03.png'
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
        this.x += this.step;
        this.isMoving = true;
    },
    moveLeft: function () {
        this.x -= this.step; 
        this.isMoving = true;
    },
    jump: function () {
        this.isJumping = true;
    },
    update: function () {
        if (this.isJumping) {
            this.cntr++;
            //console.log(this.cntr);
            this.y += this.adder;
            if (this.cntr === 20) {
                this.adder = 8;
            }
            if (this.cntr === 40) {
                this.isJumping = false;
                this.cntr = 0;
                this.adder = -8;
            }
        }
        if (this.isMoving) {
            this.clock++;
            this.isMoving = false;
        }
        if (this.clock % 11 === 0) {
            this.changeFrame = true;
            this.clock = 1;
        }
        this.frameToDraw = this.animation.frames[this.animation.currentFrame];
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
