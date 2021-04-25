addObject({
    name: 'explosion',
    sprite: sprites.get('explosion'),
    tpX: 16,
    tpY: 16,
    scaleX: 0,
    scaleY: 0,
    timer: 10,
    sm: false,
    create() {
        playSound('explosion');
    },
    setSize(r) {
        this.scaleX = r / 16;
        this.scaleY = r / 16;
    },
    step() {
        if (this.timer) {
            this.timer--;
        } else {
            this.scaleX -= 1;
            this.scaleY -= 1;
        }

        if (this.scaleX <= 0) {
            instanceDestroy(this);
        }
    }
});