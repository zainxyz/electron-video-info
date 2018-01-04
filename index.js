import electron, { app, BrowserWindow, ipcMain } from 'electron';
import ffmpeg from 'fluent-ffmpeg';

let mainWindow;

app.on('ready', () => {
  console.log('App is now ready');

  mainWindow = new BrowserWindow({ width: 1280, height: 720 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:SUBMIT', (event, path) => {
  ffmpeg.ffprobe(path, (err, meta) => {
    const { format: { duration } } = meta;
    const webContents = mainWindow;

    webContents.send('video:METADATA', duration);
  });
});
