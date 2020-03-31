setGameScore();
setGameLevel();
setLevelDesign();

// onresize
window.onresize = whenResize;
function whenResize() {
    scene = getSceneSize(); // refresh
    showSizes();
};
whenResize()

// setTimeout(nextLevel, 3000)
function gameLoop() {
    const allEn = document.querySelector('.en')
    const audio = document.querySelector('audio')
    let x = y = null;

    if (allEn == null) nextLevel()

    // CONTROLS
    window.gp = (navigator.webkitGetGamepads) ? navigator.webkitGetGamepads()[0] : navigator.getGamepads()[0]; // Get gamepad
    if (isButton(gp, 0)) y = -1;
    if (isButton(gp, 2)) y = 1;
    if (isButton(gp, 1)) { x = 1; pers.link.classList.remove('reverse') }
    if (isButton(gp, 3)) { x = -1; pers.link.classList.add('reverse') }
    move(x, y)

    var rectSelection = ball.getBoundingClientRect();

    toCollect('.cristal').forEach((p) => {
        var rect = p.getBoundingClientRect();
        // remove
        if (isIntersected(rect, rectSelection)) {
            p.remove()
            audio.play()
            score++
            setGameScore()
        }
    });

    toCollect('.en').forEach((en) => {
        var rect = en.getBoundingClientRect();
        // remove
        if (isIntersected(rect, rectSelection)) {
            en.remove()
            audio.play()
            score++
            setGameScore()
        }
        // currentPosition
        const currentPosition = getPosition(en)
        // new Position
        let { x, y } = limitPosition(limitArea, currentPosition)
        setPosition(en, x, y)
    })

};

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
