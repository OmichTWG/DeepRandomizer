addObject({
    name: 'enemy',
    sprite: sprites.get('enemy'),
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
    dir: random(0, 2) ? 1 : -1,
    collision(obj) {
        if (obj.type === 'digger' || obj.type === 'damage') {
            instanceDestroy(this);
            playSound('hurt');
        }
    },
    step() {
        if (!global.pause) {
            gravity.call(this);
            if (collisionMatrix(this.x, this.y + 1, this.collider, this.dir, 0)) {
                this.dir = -this.dir;
                this.scaleX = -this.dir;
            }
            this.x += this.dir;
        }
    }
});