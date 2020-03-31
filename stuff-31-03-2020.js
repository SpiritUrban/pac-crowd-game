// general/universal porpuse function


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


// UI indicators for Developing