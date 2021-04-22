// import { Logic } from './LudoLogic'
const express = require('express')
const app = express();
const port = 5000;
const file = require('./InitialState.json')
const lib = require('./LudoLogic')
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/board", (req, res) => {
    const fs = require('fs')
    let current = fs.readFileSync('./InitialState.json')
    const jsonFile = JSON.parse(current)
    fs.writeFile('current.json', JSON.stringify(jsonFile), err => {
        if (err) console.log(err)
    })
    
    res.json(file)
})

app.post('/click', (req, res) => {
    x = req.body.x;
    y = req.body.y
    color = req.body.color
    lib.Logic(x, y, color)
    const fs = require('fs')
    let current = fs.readFileSync('./current.json')
    // const jsonFile = JSON.parse(current)
    res.json(JSON.parse(current))
})

app.listen(port, () => console.log(port))
