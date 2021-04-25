addObject({
    name: 'star',
    sprite: sprites.get('star'),
    tpX: 8,
    tpY: 8,
    collider: {
        type: 'box',
        x1: -6,
        y1: -6,
        x2: 6,
        y2: 8
    },
    type: 'enemy',
    sleep: true,
    player: null,
    pos: false,
    dir: 1,
    timer: 0,
    collision(obj) {
        if (obj.type === 'digger' || obj.type === 'damage') {
            instanceDestroy(this);
            playSound('hurt');
        }
    },
    step() {
        if (!global.pause) {
            if (this.player) {
                if (this.sleep) {
                    if (distanceBetween(this.x, this.y, this.player.x, this.player.y) < 130) {
                        this.sleep = false;
                    }
                } else {
                    if (!this.pos) {
                        moveToPoint(this, camera.x + 32, camera.y + 32, 8);
                        if (distanceBetween(this.x, this.y, camera.x + 32, camera.y + 32) < 10) {
                            this.pos = true;
                        }
                    } else {
                        if (this.x < camera.x + 32 || this.x > camera.x + camera.w() - 32) {
                            this.dir = -this.dir;
                            this.scaleX = -this.dir;
                        }
                        this.x += this.dir * 3;
                        this.y = camera.y + 32;

                        if (this.timer) {
                            this.timer--;
                        } else {
                            const b = instanceCreate('bullet', this.x, this.y);
                            b.dir = getDirectionVector(this.x, this.y, this.player.x, this.player.y)
                            this.timer = 300;
                        }
                    }
                }
            } else {
                this.player = findNearest('player', this.x, this.y);
            }
        }
    }
});