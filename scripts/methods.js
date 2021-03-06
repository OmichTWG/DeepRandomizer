const gravity = function (collide = false) {
    if(!collisionMatrixThree(this.x, this.y + (!collide ? this.vspeed : 0), this.collider, 0, Math.sign(this.vspeed))) {
        this.y += this.vspeed;
        if (this.vspeed <= 7 - global.g) {
            this.vspeed += global.g;
        } else {
            this.vspeed = 7;
        }
    } else {
        this.vspeed = 0;
    }
}

const collisionMatrix = (x, y, collider, xd, yd, xofs = 0, yofs = 0) => {
    const _y = y - global.world.top * 16;
    const nx = Math.floor(x / 16) + xd;
    const ny = Math.floor(_y / 16) + yd;
    setDrawColor('white');
    if (nx >= 0 && ny >= -16 && nx < global.world.w && ny < global.world.h) {
        if (global.matrix[nx + xofs][ny + yofs] > 0) {
            const tx = (Math.floor(x / 16) + xd) * 16 + xofs * 16;
            const ty = (Math.floor(y / 16) + yd) * 16 + yofs * 16;
            //drawRect(tx - camera.x, ty - camera.y, 16, 16);
            return checkCollision({x, y, collider}, {
                x: tx,
                y: ty,
                collider: {type: 'box', x1: 0, y1: 0, x2: 16, y2: 16}
            });
        } else {
            return false;
        }
    } else {
        return true;
    }
}

const collisionMatrixThree = (x, y, collider, xd, yd) => {
    try {
        return [-1, 0, 1].reduce((a, i) => a || collisionMatrix(x, y, collider, xd, yd, yd !== 0 ? i : 0, xd !== 0 ? i : 0), false);
    } catch (e) {
        return true;
    }
}

const createLaser = (x1, y1, x2, y2, count, length) => {
    const laser = instanceCreate('laser', x1, y1)
    const a = x2 - x1;
    const b = y2 - y1;
    const d = Math.sqrt(a * a + b * b);
    const dv = getDirectionVector(x1, y1, x2, y2);
    const angle = 180 * Math.acos(b/d) / Math.PI;
    laser.setSize((count - 1) * 16, length, x2 - x1 > 0 ? -angle : angle);
    for (let i = 0; i < count; i++) {
        const step = i * 16 - count / 2 * 16 + 8;
        const line = instanceCreate('oneLine', x1 - (b/d) * step, y1 + (a/d) * step);
        line.collider = {
            ...line.collider,
            x2: dv.x * length,
            y2: dv.y * length
        }
    }
}

const createExplosion = (x, y, r) => {
    const e = instanceCreate('explosion', x, y);
    e.setSize(r);
    const c = instanceCreate('circleDamage', x, y);
    c.setSize(r);
}

const generateName = () => {
    const length = random(3, 8);
    const v = 'euioa'.split('');
    const c = 'qwrtypsdfghjklzxcvbnm'.split('');
    let what = random(0,2);
    let name = '';
    for (let i = 0; i < length; i++) {
        if (what) {
            name += v[random(0, v.length)];
        } else {
            name += c[random(0, v.length)];
        }
        if (!i) {
            name = name.toUpperCase();
        }
        what = !what;
    }
    return name;
}

const weaponGenerator = (hardness, noSeven = false) => {
    const myeffects = [];
    let _hardness = hardness;
    let ex = [];
    if (noSeven) {
        ex.push(7);
    }
    for(let i = 0; i < _hardness; i++) {
        let no = false;
        const effect = effects[random(0, effects.length)]();

        if (!ex.includes(effect.id)) {
            if (effect.ex) {
                ex = ex.concat(effect.ex);

                const myids = myeffects.map((e) => e.id);
                effect.ex.forEach((e) => {
                    if (myids.includes(e)) {
                        no = true;
                    }
                })
            }

            if (!no) {
                myeffects.push(effect);
                ex.push(effect.id);
            } else {
                _hardness++;
            }
        } else {
            _hardness++;
        }
    }
    return {
        name: generateName(),
        effects: myeffects,
    }
}