addObject({
    name: 'camera',
    prompt: '',
    target: null,
    speed: 10,
    depth: 1000,
    padding: 1/3,
    first: true,
    create() {
        camera.scaleX = 3;
        camera.scaleY = 3;

        const resize = () => {
            this.x = this.target.x - camera.w() / 2;
            this.y = this.target.y - camera.h() / 2;
        }

        window.onresize = () => {
            resize();
        }
        console.log(this.x)
    },
    step() {
        if(this.target && this.target.name === this.prompt) {
            let xMove = this.x;
            let yMove = this.y;

            const w1 = camera.w() * this.padding;
            const w2 = camera.w() * (1 - this.padding);
            const h1 = camera.h() * this.padding;
            const h2 = camera.h() * (1 - 1/2);

            if (this.target.x < camera.x + w1) {
                if (camera.x - 4 > 0)
                    xMove = this.target.x - w1;
            } else if (this.target.x > camera.x + w2) {
                if (camera.x + camera.w() + 4 < global.world.w * 16)
                    xMove = this.target.x - w2;
            }

            if (this.target.y < camera.y + h1) {
                if (camera.y - 4 > 0)
                    yMove = this.target.y - h1;
            } else if (this.target.y > camera.y + h2) {
                if (camera.y + camera.h() + 4 < global.world.h * 16)
                    yMove = this.target.y - h2;
            }

            moveToPoint(this, xMove, yMove, this.speed);
            camera.x = this.x;
            camera.y = this.y;
        } else {
            this.target = findNearest(this.prompt, this.x, this.y);
        }
    },
    toCenter() {
        this.padding = 0.5;
    },
    free() {
        this.padding = 1/3;
    },
    findTarget (prompt) {
        this.prompt = prompt;
    }
});