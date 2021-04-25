addObject({
    name: 'generator',
    top: 16,
    dirt: sprites.get('dirt'),
    dirtBack: sprites.get('dirtBack'),
    depth: 1,
    create() {
        global.matrix = [];

        const r = [];
        for (let i = 0; i < global.world.w; i++) {
            r.push([]);
            for (let j = 0; j < global.world.h; j++) {
                r[i].push(random(0, 3) ? 1 : 0);
            }
        }

        for (let i = 0; i < global.world.w; i++) {
            global.matrix.push([]);
            for (let j = 0; j < global.world.h; j++) {
                let s = 0;
                let a = 0;
                try {
                    for (let k = i - 3; k < i + 3; k++) {
                        for (let l = j - 3; l < j + 3; l++) {
                            s += r[k][l];
                            a++;
                        }
                    }
                    global.matrix[i].push(s >= 9 * a / 16 ? this.getRandDirt() + 1 : 0);
                    if (j < 10) {
                        global.matrix[i][j] = this.getRandDirt() + 1;
                    } else if (j > global.world.h - 32 && j < global.world.h - 20) {
                        global.matrix[i][j] = 0;
                    } else if (j >= global.world.h - 20) {
                        global.matrix[i][j] = this.getRandDirt() + 1;
                    } else {
                        if (!global.matrix[i][j]) {
                            if (!random(0, 100)) {
                                instanceCreate('enemy', i * 16 + 8, (j + global.world.top) * 16 + 8)
                            }

                            if (!random(0, 500)) {
                                instanceCreate('star', i * 16 + 8, (j + global.world.top) * 16 + 8)
                            }
                        } else {
                            if (!random(0, 2000)) {
                                instanceCreate('hp', i * 16, (j + global.world.top) * 16)
                            }
                        }
                    }
                } catch (e) {
                    global.matrix[i].push(1);
                }
            }
        }
        instanceCreate('triangle', global.world.w * 16 / 2, (global.world.h - 21 + global.world.top) * 16 - 8);
    },
    draw() {
        for (let i = 0; i < global.world.w; i++) {
            for (let j = 0; j < global.world.h; j++) {
                if (global.matrix[i][j]) {
                    drawSprite(this.dirt, i * 16, global.world.top * 16 + j * 16, 0, 1, 1, 1, global.matrix[i][j] - 1);
                } else {
                    drawSprite(this.dirtBack, i * 16, global.world.top * 16 + j * 16);
                }
            }
        }
    },
    getRandDirt() {
        if (random(0, 12) === 0) {
            return random(7, 9);
        } else {
            return random(0, 7);
        }
    }
});