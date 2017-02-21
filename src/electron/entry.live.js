const { app, BrowserWindow, Menu } = require('electron'),
  path = require('path'),
  url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width : 1000,
    height: 800,
    title : 'Work Calendar',
    icon  : 'src/favicon.png'
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: 'localhost:4200',
    protocol: 'http',
    slashes: true
  }));

  // Open the DevTools
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

function createMenu () {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Paramètres...',
          accelerator: 'CmdOrCtrl+P',
          click () {

          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quitter',
          accelerator: 'CmdOrCtrl+W',
          click () {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Recharger',
          accelerator: 'CmdOrCtrl+R',
          click () {
            win.reload();
          }
        },
        {
          label: 'Plein écran',
          accelerator: 'F11',
          click () {
            win.setFullScreen(!win.isFullScreen());
          }
        }
      ]
    }
  ];
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

Menu.setApplicationMenu(Menu.buildFromTemplate(createMenu()));

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
