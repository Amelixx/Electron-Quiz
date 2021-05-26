const { app, BrowserWindow, globalShortcut, remote} = require('electron'),
fs = require(`fs`)
stats = require(`./js/stats.json`)
function createWindow () {
  // Make a browser window
  const win = new BrowserWindow({
    width: 470,
    height: 640,
    webPreferences: {
      nodeIntegration: true
    },
    icon: `./icon.png`
  })
  
  // Create shortcuts so that I can do developer stuff and user can press escape to exit a quiz
  globalShortcut.register('CommandOrControl+I', () => {
    win.webContents.openDevTools()
  })

  globalShortcut.register('esc', () => {
    win.loadFile(`main.html`)
  })

  // Set a minimum size so you don't break my glorious html
  win.setMinimumSize(470, 640);

  // Yeet the top bar thing
  win.setMenu(null)

  // and load the index.html of the app
  win.loadFile('main.html')
}

// When electron is all ready create window
app.whenReady().then(createWindow)

// Fully exit the app when all windows are closed because this isn't a horrible background virus thing
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

