addObject({
    name: 'control',
    create() {
        const player = instanceCreate('player', global.world.w / 2 * 16, 96);
        instanceCreate('generator', 0, 0);
        console.log(camera.w(), player.x)
        const cam = instanceCreate('camera', player.x - camera.w() / 6, player.y - camera.h() / 6);
        console.log(cam.x)
        cam.prompt = 'player';

        if (localStorage.getItem('instruction') !== 'true') {
            gui_showLearn(true);
            localStorage.setItem('instruction', 'true');
        }
    }
});