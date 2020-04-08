// GAMEPAD
// Gamepad Button Checker
function isButton(gp, i) {
    // console.log('>>> ', gp.buttons[i], i)
    if (typeof gp.buttons[i] == 'number') return gp.buttons[0] == 1; // ??? // for webkitGetGamepads
    return (gp.buttons[i].value > 0 || gp.buttons[i].pressed == true)
}



function move(x, y) {
    if (x) pers.x += x;
    if (y) pers.y += y;
    // limit
    if (pers.x < 1) pers.x = 1;
    if (pers.y < 1) pers.y = 1;
    if (pers.x > limitArea.x.end) pers.x = limitArea.x.end;
    if (pers.y > limitArea.x.end) pers.y = limitArea.x.end;
    // DOM
    pers.link.style.left = pers.x  + "em";
    pers.link.style.top = pers.y  + "em";
}

// Level
let levelLocker = false
function nextLevel() {
    if (!levelLocker) {
        levelLocker = true;
        document.querySelector('#won').play()
        setTimeout(() => {
            clearInterval(window.loop)
            setTimeout(() => location.reload(), 2000)
            // alert('You won !!!');
            level++
            setGameLevel()
            restart()
        }, 500)
    }
}

// GameScore
function getGameScore() {
    let score = +localStorage.getItem('score')
    if (typeof score !== 'number') score = 0
    return score
}
function setGameScore() {
    localStorage.setItem('score', score)
    document.querySelector('.score-num').innerHTML = localStorage.getItem('score')
}

// GameLevel
function getGameLevel() {
    let level = +localStorage.getItem('level')
    if (typeof level !== 'number') level = 0
    return level
}
function setGameLevel() {
    localStorage.setItem('level', level)
    document.querySelector('.level-num').innerHTML = localStorage.getItem('level')
}

//LevelDesign
function setLevelDesign() {
    body.style.background = `url(src/img/bg_${level}.jpg)`
    body.style.backgroundSize = 'cover'
    // body.style.backgroundSize = '400xp'
    _case(level, [
        [0, _ => setBgSize(200)],
        [1, _ => setBgSize(500)],
        [2, _ => setBgSize(1000)],
        [3, _ => setBgSize(200)],
        [4, _ => setBgSize(600)],
        [5, _ => setBgSize(300)],
    ])
}
function setBgSize(size) {
    body.style.backgroundSize = size + 'px'
}


