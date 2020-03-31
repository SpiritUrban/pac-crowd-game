let score = getGameScore()
let level = getGameLevel()
var x = 0;
var y = 0;
// let enList = [];
// let cristalList = [];

let pers = {
    x: 0,
    y: 0,
    link: document.querySelector('.pers')
}
const body = document.querySelector('body')

const emInPx = parseFloat(getComputedStyle(body).fontSize);

const scene = {
    width: {
        px: window.innerWidth,
        em: window.innerWidth / emInPx
    },
    height: {
        px: window.innerHeight,
        em: window.innerHeight / emInPx
    },
    refresh: () => {
        scene.width = {
            px: window.innerWidth,
            em: window.innerWidth / emInPx
        };
        scene.height = {
            px: window.innerHeight,
            em: window.innerHeight / emInPx
        };
    }
}
// limit
const limitArea = {
    x: {
        begin: 1,
        end: scene.width.em - 3
    },
    y: {
        begin: 1,
        end: scene.height.em - 8
    }
}
// alert(getGameScore())

console.log('*****************', parseFloat(getComputedStyle(body).fontSize))
window.onresize = whenResize;
function whenResize() {
    scene.refresh();
    showSizes();
};
whenResize()

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

// setTimeout(nextLevel, 3000)
function gameLoop() {
    // const ball = document.querySelector('.pers')
    const area = document.querySelector('#scrollArea')
    const allEn = document.querySelector('.en')
    const audio = document.querySelector('audio')
    let x = null;
    let y = null;

    if (allEn == null) nextLevel()

    if (navigator.webkitGetGamepads) {
        alert('webkitGetGamepads detected')
        var gp = navigator.webkitGetGamepads()[0];
        if (gp.buttons[0] == 1) y = -1;
        if (gp.buttons[1] == 1) x = 1;
        if (gp.buttons[2] == 1) y = 1;
        if (gp.buttons[3] == 1) x = -1;
    } else {
        var gp = navigator.getGamepads()[0];

        function isButton(gp, i) {
            console.log('>>> ', gp.buttons[i], i)
            if (typeof gp.buttons[i] == 'number') return gp.buttons[0] == 1; // ??? // for webkitGetGamepads
            return (gp.buttons[i].value > 0 || gp.buttons[i].pressed == true)
        }

        if (isButton(gp, 0)) y = -1
        if (isButton(gp, 2)) y = 1
        if (isButton(gp, 1)) {
            x = 1
            pers.link.classList.remove('reverse')
        }
        if (isButton(gp, 3)) {
            x = -1
            pers.link.classList.add('reverse')
        }
        move(x, y)
    }

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
setGameScore()


function getGameLevel() {
    let level = +localStorage.getItem('level')
    if (typeof level !== 'number') level = 0
    return level
}
function setGameLevel() {
    localStorage.setItem('level', level)
    document.querySelector('.level-num').innerHTML = localStorage.getItem('level')
}
setGameLevel()


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
setLevelDesign()

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