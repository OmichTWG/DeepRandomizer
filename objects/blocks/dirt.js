addObject({
    name: 'dirt',
    collider: {
        type: 'box',
        x1: 0,
        y1: 0,
        x2: 16,
        y2: 16
    },
    type: 'solid',
    t: 0,
    mc: {
      x: 0,
      y: 0
    },
    step() {
        if (global.matrix[this.mc.x][this.mc.y] === 0) {
            instanceDestroy(this);
        }
    },
    collision(obj) {
        if (obj.type === 'solid') {
            instanceDestroy(this);
        }
    }
});