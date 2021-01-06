const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('render/index.html')
    win.toggleDevTools()
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('create-shortcut', (event, arg) => {
    globalShortcut.register(arg, () => {
        console.log(`${arg} is pressed`)
    })

    try {
        globalShortcut.isRegistered(arg)
        event.returnValue = 'success'

    } catch (err) {
        console.log(err)
        event.returnValue = 'failure'
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})