const { app, BrowserWindow } = require("electron");
const path = require("path");
const electronReload = require('electron-reload')(__dirname)

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 190,
    height: 120,
    resizable: false,
  });

  mainWindow.loadFile(path.join(__dirname, "public/index.html"));
  mainWindow.webContents.openDevTools();
});