addObject({
    name: 'triangle',
    sprite: sprites.get('triangle'),
    tpX: 8,
    tpY: 8,
    collider: {
        type: 'box',
        x1: -6,
        y1: -6,
        x2: 6,
        y2: 8
    },
    type: 'win',
    dir: random(0, 2) ? 1 : -1,
    time: 60,
    step() {
        if (!global.pause) {
            gravity.call(this);
            if (this.time) {
                this.time--;
            } else {
                this.dir = -this.dir;
                this.scaleX = -this.dir;
                this.time = 60;
            }
            this.x += this.dir;
        }
    }
});