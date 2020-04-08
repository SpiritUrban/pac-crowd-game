setGameScore();
setGameLevel();
setLevelDesign();


// onresize
window.onresize = whenResize;
function whenResize() {
    scene = getSceneSize(); // refresh
    showSizes();
};
whenResize();


// GAME
function toSow(classes, amount = 1) {
    for (let i = 0; i < amount; i++) {
        const p = document.createElement('p');
        p.classList.add(...classes);
        p.style.left = `${Math.random() * scene.width.em}em`;
        p.style.top = `${Math.random() * scene.width.em}em`;
        body.appendChild(p)
    }
}

function restart() {
    toSow(['ball', 'en'], 20);
    toSow(['ball', 'cristal'], 100);
}

function processing_of_cristals() {
    toCollect('.cristal').forEach((p) => {
        var rect = p.getBoundingClientRect();
        if (isIntersected(rect, rectSelection)) {
            p.remove();
            audio.play();
            score++;
            setGameScore();
        }
    });
}

function processing_of_enemies() {
    toCollect('.en').forEach((en) => {
        var rect = en.getBoundingClientRect();
        if (isIntersected(rect, rectSelection)) {
            en.remove();
            audio.play();
            score++;
            setGameScore();
        }
        // currentPosition
        const currentPosition = getPosition(en)
        // new Position
        let { x, y } = limitPosition(limitArea, currentPosition)
        setPosition(en, x, y)
    })
};


// setTimeout(nextLevel, 3000)
function gameLoop() {
    if (!isExist('.en')) nextLevel();
    let x = y = null;

    // CONTROLS
    window.gp = (navigator.webkitGetGamepads) ? navigator.webkitGetGamepads()[0] : navigator.getGamepads()[0]; // Get gamepad
    if (isButton(gp, 0)) y = -1;
    if (isButton(gp, 2)) y = 1;
    if (isButton(gp, 1)) { x = 1; pers.link.classList.remove('reverse') }
    if (isButton(gp, 3)) { x = -1; pers.link.classList.add('reverse') }
    move(x, y)

    window.rectSelection = ball.getBoundingClientRect();

    // PROCESSING OF UNITS
    processing_of_cristals() // cristal
    processing_of_enemies() // enemy
};

//
// ready ?
//
window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    restart()
    window.loop = setInterval(gameLoop, 50)
});

window.addEventListener("gamepaddisconnected", function (e) {
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
});
