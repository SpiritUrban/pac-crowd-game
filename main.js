

// onresize
window.onresize = whenResize;
function whenResize() {
    scene.refresh();
    showSizes();
};
whenResize()



// setTimeout(nextLevel, 3000)
function gameLoop() {
    const allEn = document.querySelector('.en')
    const audio = document.querySelector('audio')
    let x = y = null;

    if (allEn == null) nextLevel()

    // Get gamepad
    // webkitGetGamepads -> Safari
    window.gp = (navigator.webkitGetGamepads) ? navigator.webkitGetGamepads()[0] : navigator.getGamepads()[0];

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

setGameScore();
setGameLevel();
setLevelDesign();





// _case(1, [
//     [1, () => alert('Goood-1')],
//     [1, () => console.log('Goood-1')],
// ])


            // var options = {
    //     root: document.querySelector('#ball'),
    //     rootMargin: '0px',
    //     threshold: 1.0
    // }

    // var observer = new IntersectionObserver(callback, options);

    // var target = document.querySelector('#scrollArea');
    // observer.observe(target);

    // var callback = function (entries, observer) {
    //     alert()
    //     entries.forEach(entry => {
    //         entry.time;               // a DOMHightResTimeStamp indicating when the intersection occurred.
    //         entry.rootBounds;         // a DOMRectReadOnly for the intersection observer's root.
    //         entry.boundingClientRect; // a DOMRectReadOnly for the intersection observer's target.
    //         entry.intersectionRect;   // a DOMRectReadOnly for the visible portion of the intersection observer's target.
    //         entry.intersectionRatio;  // the number for the ratio of the intersectionRect to the boundingClientRect.
    //         entry.target;             // the Element whose intersection with the intersection root changed.
    //         entry.isIntersecting;     // intersecting: true or false
    //     });
    // };