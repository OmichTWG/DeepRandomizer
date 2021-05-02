addObject({
    name: 'circleDamage',
    collider: {
        type: 'circle',
        r: 0
    },
    type: 'damage',
    t: 1,
    setSize(r) {
        this.collider.r = r;
    },
    step() {
        if (this.t && this.type !== 'heal') {
            this.t--;
        } else {
            instanceDestroy(this);
        }
    }
});