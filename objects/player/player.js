addObject({
    name: 'player',
    sprite: sprites.get('player'),
    tpX: 8,
    tpY: 8,
    collider: {
        type: 'box',
        x1: -6,
        y1: -6,
        x2: 6,
        y2: 8
    },
    vspeed: 0,
    spacePromise: false,
    spaceDelay: 0,
    state: '',
    direction: {
        x: 0,
        y: 0
    },
    inertia: 0,
    speed: 3,
    type: 'collide',
    nextWeapon: null,
    heartEmpty: sprites.get('heartEmpty'),
    heartFull: sprites.get('heartFull'),
    hp: 3,
    hpMax: 3,
    time: 420,
    invincibility: 0,
    win: false,
    create() {
        this.nextWeapon = weaponGenerator(global.hardness);
        gui_setWeapon(this.nextWeapon);
    },
    step() {
        if (!global.pause) {
            gravity.call(this);
            this.control();
            this.move();
            this.shoot();

            if (this.spaceDelay > 0) {
                this.spaceDelay--;
            }

            this.time--;
            if (this.time <= 0) {
                this.hp--;
                playSound('hurt');
                this.invincibility = 30;
                this.nextWeapon = weaponGenerator(global.hardness);
                gui_setWeapon(this.nextWeapon);
                this.time = 420;
            }
            gui_setTime(this.time);
            if (this.hp <= 0) {
                gui_showRestart(true);
            }

            if (this.invincibility) {
                this.invincibility--;
                this.opacity = 0.5;
            } else {
                this.opacity = 1;
            }

            global.hardness = Math.floor(this.y / 3200) + 1
        }
    },
    control() {
        let x = 0;
        let y = 0;

        keyPress.forEach(code => {
            const jump = () => {
                if (this.spaceDelay <= 0) {
                    if (collisionMatrixThree(this.x, this.y + 4, this.collider, 0, 1)) {
                        this.spacePromise = true;
                    }
                    this.spaceDelay = 25;
                }
            }
            switch (code) {
                case 'KeyD':
                    x += 1;
                    break;
                case 'KeyA':
                    x += -1;
                    break;

                case 'Space':
                    jump();
                    break;
                case 'KeyW':
                    jump();
                    break;
            }
        });

        keyDown.forEach(code => {
            switch (code) {
                case 'KeyM':
                    if (global.music) {
                        stopSound('music');
                        global.music = false;
                    } else {
                        playSound('music', 1, true);
                        global.music = true;
                    }
                    break;
            }
        });

        if (x !== 0 || y !== 0) {
            this.direction = {x, y};
            if (this.inertia < this.speed) {
                this.inertia += 0.35;
            }
        }

        let st = '';

        const _x = Math.round(this.x);
        const xPrevious = Math.round(this.xPrevious);

        if (_x > xPrevious) {
            st = 'right';
        } else if (_x < xPrevious) {
            st = 'left';
        } else {
            st = 'idle';
        }
        if (this.vspeed < 0) {
            st = 'jump';
        }

        if (st !== this.state) {
            this.state = st;
            switch(st) {
                case 'right':
                    this.scaleX = -1;
                    break;
                case 'left':
                    this.scaleX = 1;
                    break;
                case 'idle':
                    break;
                case 'jump':
                    break;
            }
        }
    },
    move() {
        const direction = getDirectionVector(0, 0, this.direction.x, this.direction.y);

        const moveX = this.inertia * direction.x;

        if (!collisionMatrixThree(this.x + moveX, this.y - 1, this.collider, direction.x, 0)) {
            this.x += moveX;
        }

        if(this.spacePromise && collisionMatrixThree( this.x, this.y + 2, this.collider, 0, 1)) {
            console.log(collisionMatrixThree( this.x, this.y + 2, this.collider, 0, 1))
            this.vspeed = -4;
            this.spacePromise = false;
        }

        if (this.inertia > 0) {
            this.inertia -= 0.2;
        } else {
            this.inertia = 0;
        }
    },
    shoot() {
        mouseDown.forEach((code) => {
            if (code === 0) {
                this.nextWeapon.effects.forEach((e) => e.action.call(this));
                this.nextWeapon = weaponGenerator(global.hardness);
                gui_setWeapon(this.nextWeapon);
                this.time = 420;

                //
                // effects[9]().action.call(this);
                // console.log(effects[9]().desc)
            }
        });
    },
    collision(obj) {
        if ((obj.type === 'damage' || obj.type === 'enemy') && !this.invincibility) {
            this.hp--;
            playSound('hurt');
            this.invincibility = 30;
        } else if (obj.type === 'heal') {
            if (this.hp < this.hpMax) {
                this.hp++;
                playSound('heart');
            }
        } else if (obj.type === 'win') {
            if (!this.win) {
                this.win = true;
                gui_showWin(true);
                playSound('win');
            }
        }
    },
    draw() {
        drawInstance(this);

        for(let i = 0; i < this.hpMax; i++) {
            drawSprite(i < this.hp ? this.heartFull : this.heartEmpty, camera.x + camera.w() - this.hpMax * 20 + i * 20, camera.y + camera.h() - 20, 0, 2, 2);
        }
    }
});