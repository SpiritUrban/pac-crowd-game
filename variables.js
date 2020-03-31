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
const body = document.querySelector('body');
const ball = document.querySelector('#ball');



let scene = getSceneSize();


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