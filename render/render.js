const { ipcRenderer } = require('electron')

document.body.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.key == 'Control') {
        keys.innerHTML = 'Ctrl'
    } else {
        keys.innerHTML = `${keys.innerHTML} +  ${e.key}`
    }
})

function reset() {
    keys.innerHTML = ""
}

function create() {

    let shortcut = keys.innerHTML.replace('Ctrl', 'CommandOrControl').split(' ').join('')
    console.log(ipcRenderer.sendSync('create-shortcut', shortcut))
}