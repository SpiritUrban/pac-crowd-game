//
// general/universal porpuse function
//

/* Like swith/case
    _case(level, [
        [0, _ => setBgSize(200)],
        [1, _ => setBgSize(500)],
    ]) 
*/
function _case(point, cases) {
    cases.forEach((item) => {
        console.log(point == item[0], point, item[0])
        if (point == item[0]) item[1]()
    })
}

//
// DOM
//
function toCollect(by) {
    return document.querySelectorAll(by)
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

//
// UI indicators for Developing
//
const emInPx = () => parseFloat(getComputedStyle(body).fontSize);
function getSceneSize() {
    return {
        width: {
            px: window.innerWidth,
            em: window.innerWidth / emInPx()
        },
        height: {
            px: window.innerHeight,
            em: window.innerHeight / emInPx()
        }
    }
}
function showSizes() {
    // window.screen.width
    document.getElementById("width_px").innerHTML = scene.width.px;
    document.getElementById("width_ems").innerHTML = scene.width.em;
    document.getElementById("height_px").innerHTML = scene.height.px;
    document.getElementById("height_ems").innerHTML = scene.height.em;
}

