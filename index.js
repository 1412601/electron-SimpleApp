const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, (err, data) => {
    console.log("file lengths", data.format.duration);
    mainWindow.webContents.send("video:data", data.format.duration);
  });
});
