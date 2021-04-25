addObject({
    name: 'laser',
    sprite: sprites.get('laser'),
    tpX: 16,
    animationSpeed: 0.1,
    timer: 10,
    ssp: 0.5,
    type: 'digger',
    depth: 0,
    create() {
        playSound('laser');
    },
    step() {
        if (this.timer) {
            this.timer--;
        } else {
            this.scaleX -= this.ssp;
        }

        if (this.scaleX <= 0) {
            instanceDestroy(this);
        }
    },
    setSize(w, h, r) {
        this.scaleX = w / 32;
        this.scaleY = h / 32;
        this.rotation = r;
    }
});