questions = require(`./js/questions.json`)
const { remote } = require("electron")
const fs = require(`fs`)

function exit () {
    remote.getCurrentWindow().close();
}

clearData = () => {
    stats = {}
    fs.writeFileSync(`./js/stats.json`, JSON.stringify(stats, null, 4))
    remote.getCurrentWindow().loadFile(`main.html`)
}

load = () => {
    let cpu = document.getElementById('cpu'),
    numberSystems = document.getElementById('numberSystems'),
    inputOutputStorage = document.getElementById('inputOutputStorage'),
    deleteButton = document.getElementById(`deleteButton`),
    stats = require(`./js/stats.json`)

    if (Object.keys(stats).length == 0) deleteButton.parentNode.removeChild(deleteButton)

    if (stats.CPU > 0) cpu.innerHTML = `High score - ${stats.CPU}/${questions.CPU.length}`
    if (stats.numberSystems > 0) numberSystems.innerHTML = `High score - ${stats.numberSystems}/${questions.numberSystems.length}`
    if (stats.inputOutputStorage > 0) inputOutputStorage.innerHTML = `High score - ${stats.inputOutputStorage}/${questions.inputOutputStorage.length}`
}