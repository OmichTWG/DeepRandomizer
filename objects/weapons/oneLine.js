addObject({
    name: 'oneLine',
    collider: {
        type: 'line',
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    },
    type: 'digger',
    t: 1,
    step() {
        const ci = {
            x1: Math.floor((this.x + this.collider.x1) / 16),
            y1: Math.floor((this.y + this.collider.y1) / 16 - global.world.top),
            x2: Math.floor((this.x + this.collider.x2) / 16),
            y2: Math.floor((this.y + this.collider.y2) / 16 - global.world.top)
        }

        if (this.t) {
            this.t--;

            const setValue = (x, y) => {
                if (global.matrix[x - 1][y - 1] > 0) {
                    global.matrix[x - 1][y - 1] = 0;
                }
                if (global.matrix[x][y - 1] > 0) {
                    global.matrix[x][y - 1] = 0;
                }
            }

            try {
                const A = ci.y2 - ci.y1;
                const B = ci.x1 - ci.x2;
                const sign = Math.abs(A) > Math.abs(B) ? 1 : -1;
                const signa = A < 0 ? -1 : 1;
                const signb = B < 0 ? -1 : 1;
                let x = ci.x1, y = ci.y1, f = 0;
                if (sign === -1) {
                    do {
                        f += A * signa;
                        if (f > 0) {
                            f -= B * signb;
                            y += signa;
                        }
                        x -= signb;
                        if (x > 0 && y > 0 && x < global.world.w && y < global.world.h) {
                            if (y - 1 < global.world.h - 20) {
                                setValue(x, y);
                            }
                        }
                    } while (x !== ci.x2)
                } else {
                    do {
                        f += B * signb;
                        if (f > 0) {
                            f -= A * signa;
                            x -= signb;
                        }
                        y += signa;
                        if (x > 0 && y > 0 && x < global.world.w && y - 1 < global.world.h) {
                            if (y - 1 < global.world.h - 20) {
                                setValue(x, y);
                            }
                        }
                    } while (y !== ci.y2)
                }
            } catch (e) {
                console.error(e)
            }
        } else {
            instanceDestroy(this);
        }
    }
})