const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 230,
    height: 120,
    resizable: false,
    webPreferences: {
      enableRemoteModule: true, // <-- You probably want this but note this is going through a severe deprecation process
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.removeMenu()

  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();

  const ret = globalShortcut.register('CommandOrControl+F1', () => {
    mainWindow.webContents.send("triggerCommand")
  })

  if (!ret) {
    console.log('registration failed')
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})