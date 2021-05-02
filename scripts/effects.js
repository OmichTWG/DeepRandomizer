const length = [
    ['short', 200],
    ['middle length', 450],
    ['long', 650]
];

const size = [
    ['small', 2],
    ['medium', 3],
    ['big', 5]
];

const size_e = [
    ['small', 50],
    ['medium', 100],
    ['big', 150]
];

const sevenEffects = [
    () => {
        return {
            id: 5,
            desc: `Tp up.`,
            action: function () {
                const x = Math.floor((this.x) / 16);
                const y = Math.floor( (this.y - 200) / 16) - 16;
                this.x = x * 16 + 8;
                this.y = (y + global.world.top) * 16;
                global.matrix[x][y] = 0;
            },
            ex: [7, 9]
        }
    },
    () => {
        return {
            id: 1,
            desc: `You take damage.`,
            action: function () {
                this.hp--;
                this.invincibility = 30;
                playSound('hurt');
            }
        }
    },
]

const effects = [
    () => {
        const _size = random(0, 3);
        const _length = random(0, 3);
        return {
            id: 0,
            desc: `Shoot ${length[_length][0]} ${size[_size][0]} laser.`,
            action: function () {
                createLaser(this.x, this.y, camera.x + mouse.x, camera.y + mouse.y, size[_size][1], length[_length][1]);
            }
        }
    },
    () => {
        const _size = random(0, 3);
        const _length = random(0, 3);
        return {
            id: 1,
            desc: `Shoot ${length[_length][0]} ${size[_size][0]} laser on the other side.`,
            action: function () {
                createLaser(this.x, this.y, camera.x + mouse.x, camera.y + mouse.y, size[_size][1], -length[_length][1]);
            }
        }
    },
    () => {
        const _size = random(0, 3);
        const _length = random(0, 3);
        return {
            id: 2,
            desc: `Shoot X-shape ${length[_length][0]} ${size[_size][0]} laser.`,
            action: function () {
                const a = Math.sqrt(2) / 2 * size[_size][1] * 16;
                createLaser(this.x + a, this.y + a, this.x + 1, this.y + 1, size[_size][1], length[_length][1]);
                createLaser(this.x + a, this.y - a, this.x + 1, this.y - 1, size[_size][1], length[_length][1]);
                createLaser(this.x - a, this.y + a, this.x - 1, this.y + 1, size[_size][1], length[_length][1]);
                createLaser(this.x - a, this.y - a, this.x - 1, this.y - 1, size[_size][1], length[_length][1]);
            }
        }
    },
    () => {
        const _size = random(0, 3);
        const _length = random(0, 3);
        return {
            id: 3,
            desc: `Shoot cross-shape ${length[_length][0]} ${size[_size][0]} laser.`,
            action: function () {
                const a = size[_size][1] * 16;
                createLaser(this.x, this.y + a, this.x, this.y + 1, size[_size][1], length[_length][1]);
                createLaser(this.x + a, this.y, this.x + 1, this.y, size[_size][1], length[_length][1]);
                createLaser(this.x - a, this.y, this.x - 1, this.y, size[_size][1], length[_length][1]);
                createLaser(this.x, this.y - a, this.x, this.y - 1, size[_size][1], length[_length][1]);
            }
        }
    },
    () => {
        return {
            id: 4,
            desc: `Destroy one block.`,
            action: function () {
                global.matrix[Math.floor((camera.x + mouse.x) / 16)][Math.floor( (camera.y + mouse.y) / 16) - 16] = 0;
            }
        }
    },
    () => {
        return {
            id: 5,
            desc: `Tp you to point you click.`,
            action: function () {
                const x = Math.floor((camera.x + mouse.x) / 16);
                const y = Math.floor( (camera.y + mouse.y) / 16) - 16;
                this.x = x * 16 + 8;
                this.y = (y + global.world.top) * 16;
                global.matrix[x][y] = 0;
            },
            ex: [7, 9]
        }
    },
    () => {
        return {
            id: 6,
            desc: `Tp you to point you click on another side of screen horizontally.`,
            action: function () {
                const x = Math.floor((camera.x + mouse.x) / 16);
                const y = Math.floor((camera.y - (camera.y + mouse.y - (camera.y + camera.h()))) / 16) - 16;
                this.x = x * 16 + 8;
                this.y = (y + global.world.top) * 16;
                console.log(x, y)
                global.matrix[x][y] = 0;
            }
        }
    },
    () => {
        return {
            id: 7,
            desc: `Damage something on point you click.`,
            action: function () {
                const cd = instanceCreate('circleDamage', camera.x + mouse.x, camera.y + mouse.y);
                cd.setSize(10);
            }
        }
    },
    () => {
        return {
            id: 8,
            desc: `Heal something on point you click.`,
            action: function () {
                const cd = instanceCreate('circleDamage', camera.x + mouse.x, camera.y + mouse.y);
                cd.setSize(10);
                cd.type = 'heal';
            }
        }
    },
    () => {
        const _size = size_e[random(0, size_e.length)];
        return {
            id: 7,
            desc: `Create ${_size[0]} explosion on point you click.`,
            action: function () {
                createExplosion(camera.x + mouse.x, camera.y + mouse.y, _size[1]);
            }
        }
    },
    () => {
        let myeffects = [];
        if (0) {
            myeffects = weaponGenerator(2, true).effects;
        } else {
            myeffects = weaponGenerator(1, true).effects;
            if (random(0, 2)) {
                myeffects.push(sevenEffects[random(0, sevenEffects.length)]());
            } else {
                myeffects = [sevenEffects[random(0, sevenEffects.length)](), myeffects[0]];
            }
        }
        return {
            id: 7,
            desc: `Click left side of screen to ${myeffects[0].desc} Click right side of screen to ${myeffects[1].desc}`,
            action: function () {
                if (camera.x + mouse.x < this.x) {
                    myeffects[0].action.call(this);
                } else {
                    myeffects[1].action.call(this);
                }
            }
        }
    }
];