global = {
    pause: false,
    g: 0.1,
    world: {
        w: 64,
        h: 420,
        top: 16
    },
    matrix: [],
    hardness: 1,
    music: false
}

const el = () => {
    if (!global.music) {
        playSound('music', 1, true)
        global.music = true;
        document.removeEventListener('click', el);
    }
}
document.addEventListener('click', el)