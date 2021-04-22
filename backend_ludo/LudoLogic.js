const step = (color, ox, oy, steps) => {
    const transform = ([ox, oy]) => ({ 'blue': [+ox, +oy], 'green': [- ox, -oy], 'red': [-oy, +ox], 'yellow': [+oy, -ox] }[color])
    const path = ['-7,-7', '-1,-6', '-1,-5', '-1,-4', '-1,-3', '-1,-2', '-2,-1', '-3,-1', '-4,-1', '-5,-1', '-6,-1', '-7,-1', '-7,0', '-7,1', '-6,1', '-5,1', '-4,1', '-3,1', '-2,1', '-1,2', '-1,3', '-1,4', '-1,5', '-1,6', '-1,7', '0,7', '1,7', '1,6', '1,5', '1,4', '1,3', '1,2', '2,1', '3,1', '4,1', '5,1', '6,1', '7,1', '7,0', '7,-1', '6,-1', '5,-1', '4,-1', '3,-1', '2,-1', '1,-2', '1,-3', '1,-4', '1,-5', '1,-6', '1,-7', '0,-7', '0,-6', '0,-5', '0,-4', '0,-3', '0,-2', '0,-1']
    const [x, y] = transform(transform(transform(path[path.indexOf(transform([ox - 7, oy - 7]).join(',')) + steps].split(','))))
    return [x + 7, y + 7]
}

function Logic(x, y, color) {
    const rng = Math.floor(Math.random()*6)+1
    let steps = rng
    const fs = require('fs')
    let file = fs.readFileSync('./current.json')
    const jsonFile = JSON.parse(file)
    const ludo = jsonFile.type.newboard.board

    jsonFile.dice = rng
    fs.writeFileSync('current.json', JSON.stringify(jsonFile), err => {
        if (err) console.log(err)
    })

    const iskilled = (ox, oy) => (ox-7)*(ox-7)+(oy-7)*(oy-7) == 98
    if (iskilled(x, y)){
        if (rng !== 6){
            return;
        }
        steps = 1
    }

    const newSteps = step(color, x, y, steps)
    const x_new = newSteps[0]
    const y_new = newSteps[1]
    console.log("old: ", x, y)
    console.log("new: ", x_new, y_new)
    for (let i = 0; i < ludo[x][y].length; i++) {
        if (ludo[x][y][i] === color) {
            ludo[x][y].splice(i, 1)
            break
        }
    }

    ludo[x_new][y_new].splice(-1, 0, color)

    jsonFile.type.newboard.board = ludo

    fs.writeFileSync('current.json', JSON.stringify(jsonFile), err => {
        if (err) console.log(err)
    })
}

module.exports = { Logic }