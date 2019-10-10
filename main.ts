import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

let NodeWindowsService = require('node-windows').Service
let wincmd = require('node-windows');
var child = require('child_process');

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'dist/assets/appx/favicon.png')
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

/**
 * KILL WINDOWS SERVICE - DANGEROUS
 */
ipcMain.on('killWindowsService', (event, arg) => {
//   let command = 'net stop ' + arg.servicename;
//   child.exec(command, function (error, stdout, stderr) {
//     if (error !== null) {
//         event.sender.send('killWindowsServiceError', 'exec error: ' + error);
//     }
//     event.sender.send('killWindowsServiceComplete', 'Windows service has been terminated!');
//     // Validate stdout / stderr to see if service is already running
//     // perhaps.
//  });
  wincmd.kill(arg.pid, arg.force ,function(err){
    if (err) {
      event.sender.send('killWindowsServiceError', 'exec error: ' + err);
    } else {
      event.sender.send('killWindowsServiceComplete', 'Windows service has been terminated!');
    }
  });

})


ipcMain.on('getVersion', (event, arg) => {
  event.sender.send('appVersion', app.getVersion());
})

// Attach listener in the main process with the given ID
ipcMain.on('InstallService', (event, arg) => {
  // check if custom dir exists in app data folder
  const appStorageDir = app.getPath('userData') + '\\installedScripts';
  if (fs.existsSync(appStorageDir)) {
    // Copy script into folder for future use
    fs.copyFile(arg.script, appStorageDir + '\\' + arg.name + '.js', (err) => {
         if (err) event.sender.send('InstallServiceError', "Could not copy file to directory: " + appStorageDir);
         execInstall(arg, appStorageDir + '\\' + arg.name + '.js', event);
    });
  }else {
    // Create folder first
    fs.mkdir(appStorageDir, { recursive: false }, function(err){
      if(err){event.sender.send('InstallServiceError', "Could not create needed directory, please create folder installedScripts in the following location" +app.getPath('userData'));}
      fs.copyFile(arg.script, appStorageDir + '\\' + arg.name + '.js', (err) => {
        if (err) event.sender.send('InstallServiceError', "Could not copy file to directory: " + appStorageDir);
        execInstall(arg, appStorageDir + '\\' + arg.name + '.js', event);
      });
    });
  }
  
});

function execInstall(arg: any, dir: any, event: any){
  let svc = new NodeWindowsService({
    name: arg.name,
    description: arg.description,
    script: dir,
    env: arg.env
  });
  
  svc.on('install',function(){
    svc.start();
    event.sender.send('InstallServiceComplete', "Install complete!");
  });
  svc.on('alreadyinstalled',function(){
    event.sender.send('InstallServiceError', "This service is already installed!");
  });
  svc.install();
}

// Attach listener in the main process with the given ID
ipcMain.on('UninstallService', (event, arg) => {
  let svc = new NodeWindowsService({
    name: arg.name,
    script: arg.script
  });
  svc._directory = app.getPath('userData') + '\\installedScripts';
  svc.on('uninstall',function(){
    // delete copied js file
    fs.unlinkSync(arg.script);
    event.sender.send('UninstallServiceComplete', "Uninstall complete!");
  });
  svc.uninstall();
});

// Attach listener in the main process with the given ID
ipcMain.on('getAllServices', (event, arg) => {
  wincmd.list(function(svc){
    event.sender.send('AllServicesComplete', svc);
  });
});

// Attach listener in the main process with the given ID
ipcMain.on('getAllInstalledServices', (event, arg) => {
  // check if custom dir exists in app data folder
  const appStorageDir = app.getPath('userData') + '\\installedScripts';
  if (!fs.existsSync(appStorageDir)) {
    event.sender.send('allInstalledServicesError', 'No installed services');
  } else{
    const dirents = fs.readdirSync(appStorageDir, { withFileTypes: true });
    const filesNames = dirents
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => { return {name: dirent.name.replace('.js', ''), path: appStorageDir+'\\'+ dirent.name} });
    event.sender.send('allInstalledServicesComplete', filesNames);
  }
});

// Attach listener in the main process with the given ID
ipcMain.on('isAdminUser', (event, arg) => {
  wincmd.isAdminUser(function(isAdmin){
    event.sender.send('isAdminUserReturn', isAdmin);
  });
});




try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
