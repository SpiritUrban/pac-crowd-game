function toSow(classes, amount = 1) {
    // const theHarvest = []
    for (let i = 0; i < amount; i++) {
        const p = document.createElement('p');
        p.classList.add(...classes);
        p.style.left = `${Math.random() * scene.width.em}em`;
        p.style.top = `${Math.random() * scene.width.em}em`;
        body.appendChild(p)
        // theHarvest.push(p)
    }
    // return theHarvest
}

function restart() {
    toSow(['ball', 'en'], 1);
    toSow(['ball', 'cristal'], 1);
}

function toCollect(by) {
    return document.querySelectorAll(by)
}

function isButton(gp, i) {
    console.log('>>> ', gp.buttons[i], i)
    if (typeof gp.buttons[i] == 'number') return gp.buttons[0] == 1; // ??? // for webkitGetGamepads
    return (gp.buttons[i].value > 0 || gp.buttons[i].pressed == true)
}


function move(x, y) {
    if (x) pers.x += x;
    if (y) pers.y += y;
    // limit
    if (pers.x < 2) pers.x = 2;
    if (pers.y < 2) pers.y = 2;
    if (pers.x > 80) pers.x = 80;
    if (pers.y > 80) pers.y = 80;
    // DOM
    pers.link.style.left = pers.x * 10 + "px";
    pers.link.style.top = pers.y * 10 + "px";
}

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


function isIntersected(rect, rectSelection) {
    return (rect.top + rect.height > rectSelection.top
        && rect.left + rect.width > rectSelection.left
        && rect.bottom - rect.height < rectSelection.bottom
        && rect.right - rect.width < rectSelection.right)
}
function getPosition(el) {
    return {
        x: parseInt(el.style.left, 10),
        y: parseInt(el.style.top, 10)
    }
}

function setPosition(el, x, y) {
    el.style.left = x + ((Math.random() * 4) - 1) + 'em'
    el.style.top = y + ((Math.random() * 4) - 1) + 'em'
}

function limitPosition(limitArea, currentPosition) {
    let { x, y } = currentPosition
    // new Position
    return {
        x: (x < 1) ? scene.width.em - 5 : (x > scene.width.em - 3) ? 1 : x,
        y: (x < 1) ? scene.height.em - 5 : (y > scene.height.em - 8) ? 1 : y
    }
    // if (x < 1) x = scene.width.em - 5;
    // if (x > scene.width.em - 3) x = 1;
    // if (y < 1) y = scene.height.em - 5;
    // if (y > scene.height.em - 8) y = 1;
}

function getGameScore() {
    let score = +localStorage.getItem('score')
    if (typeof score !== 'number') score = 0
    return score
}
function setGameScore() {
    localStorage.setItem('score', score)
    document.querySelector('.score-num').innerHTML = localStorage.getItem('score')
}


function getGameLevel() {
    let level = +localStorage.getItem('level')
    if (typeof level !== 'number') level = 0
    return level
}
function setGameLevel() {
    localStorage.setItem('level', level)
    document.querySelector('.level-num').innerHTML = localStorage.getItem('level')
}



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


function _case(point, cases) {
    cases.forEach((item) => {
        console.log(point == item[0], point, item[0])
        if (point == item[0]) item[1]()
    })
}

function setBgSize(size) {
    body.style.backgroundSize = size + 'px'
}

function showSizes() {
    // window.screen.width
    document.getElementById("width_px").innerHTML = scene.width.px;
    document.getElementById("width_ems").innerHTML = scene.width.em;
    document.getElementById("height_px").innerHTML = scene.height.px;
    document.getElementById("height_ems").innerHTML = scene.height.em;
}
