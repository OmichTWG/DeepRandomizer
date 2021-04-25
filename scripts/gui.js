const gui_weaponName = document.querySelector('.weapon-name');
const gui_weaponDesc = document.querySelector('.weapon-desc');
const gui_weaponTimer = document.querySelector('.weapon-timer');
const gui_weaponImage = document.querySelector('.weapon-image');

const gui_restartContainer = document.querySelector('.restart-container');

const gui_winContainer = document.querySelector('.win-container');

const gui_learnContainer = document.querySelector('.learn-container');

const gui_setWeapon = (weapon) => {
    gui_weaponName.innerHTML = weapon.name;
    gui_weaponDesc.innerHTML = weapon.effects.reduce((a, i) => a + i.desc + ' ', '');
    gui_generateImage();
}

const gui_setTime = (time) => {
    const s = Math.floor(time / 60);
    gui_weaponTimer.innerHTML = s + ':' + (time - s * 60);
}

const gui_generateImage = () => {
    gui_weaponImage.innerHTML = '';
    const img = [];
    for (let i = 0; i < 3; i++) {
        img.push(new Image());
        img[i].src = './sprites/weapons/' + (!i ? 'base' : 'add') + '/' + (!i ? random(0, 4) : random(0, 6)) + '.png';
    }
    img.forEach((i) => {
        gui_weaponImage.appendChild(i);
    })
}

const gui_showRestart = (show) => {
    if (show) {
        gui_restartContainer.style.visibility = 'visible';
        global.pause = true;
    } else {
        gui_restartContainer.style.visibility = 'hidden';
        global.pause = false;
    }
}

const gui_showWin = (show) => {
    if (show) {
        gui_winContainer.style.visibility = 'visible';
        global.pause = true;
    } else {
        gui_winContainer.style.visibility = 'hidden';
        global.pause = false;
    }
}

const gui_showLearn = (show) => {
    if (show) {
        gui_learnContainer.style.visibility = 'visible';
        global.pause = true;
    } else {
        gui_learnContainer.style.visibility = 'hidden';
        global.pause = false;
    }
}

const gui_restartGame = () => {
    gui_showRestart(false);
    gui_showWin(false);
    roomRestart();
}