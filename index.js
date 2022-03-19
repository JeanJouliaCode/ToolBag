const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("path");
const electronReload = require('electron-reload')(__dirname)

let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 230,
    height: 120,
    resizable: false,
    webPreferences: {
      enableRemoteModule: true, // <-- You probably want this but note this is going through a severe deprecation process
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.removeMenu() //remove default menu under title bar
  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();//open devtool on launch

  changeCommandRegistered('F1') // set the default trigger key to F1 for auto clicker

  ipcMain.on('command', (event, arg) => {
    changeCommandRegistered(arg)
    return
  })
});

function changeCommandRegistered(commandToRegister) {
  globalShortcut.unregisterAll()
  const ret = globalShortcut.register(commandToRegister, () => {
    mainWindow.webContents.send("triggerCommand")
  })
  if (!ret) {
    console.log('registration failed')
  }
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})