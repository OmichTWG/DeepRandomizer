addObject({
    name: 'circleDamage',
    collider: {
        type: 'circle',
        r: 0
    },
    type: 'damage',
    setSize(r) {
        this.collider.r = r;
    },
    step() {
        instanceDestroy(this);
    }
});