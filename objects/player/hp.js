addObject({
    name: 'hp',
    sprite: sprites.get('hp'),
    collider: {
        type: 'box',
        x1: 0,
        y1: 0,
        x2: 16,
        y2: 16
    },
    type: 'heal',
    step() {
        gravity.call(this);
    },
    collision (obj) {
        if (obj.name === 'player') {
            instanceDestroy(this);
        }
    }
});