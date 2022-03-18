const { app, BrowserWindow } = require("electron");
const path = require("path");
const electronReload = require('electron-reload')(__dirname)

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 230,
    height: 120,
    resizable: false,
  });

  mainWindow.removeMenu()

  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});