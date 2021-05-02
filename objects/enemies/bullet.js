addObject({
    name: 'bullet',
    sprite: sprites.get('bullet'),
    tpX: 2,
    tpY: 2,
    collider: {
        type: 'box',
        x1: -3,
        y1: -3,
        x2: 3,
        y2: 3
    },
    animationSpeed: 0.3,
    dir: null,
    type: 'enemy',
    collision(obj) {
        if (obj.name === 'player') {
            instanceDestroy(this);
        }
    },
    step() {
        if (!global.pause) {
            this.x += 2 * this.dir.x;
            this.y += 2 * this.dir.y;
        }
    }
});