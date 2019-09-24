import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windowsservice/windows-service.service';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-install-service',
  templateUrl: './install-service.component.html',
  styleUrls: ['./install-service.component.scss']
})
export class InstallServiceComponent implements OnInit {

  constructor(private windowsservice: WindowsService, private electronService: ElectronService) {
    
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('InstallServiceComplete', (event, arg) => {
      console.log(arg); 
    });
    this.electronService.ipcRenderer.on('InstallServiceError', (event, arg) => {
      console.log(arg); 
    });
    this.electronService.ipcRenderer.on('UninstallServiceComplete', (event, arg) => {
      console.log(arg);
    });
  }

  install(){
    // this.windowsservice.install('testService', 'service pure for testing',  'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js');
    // Some data that will be sent to the main process
    let Data = {
      name: 'testService',
      description: 'service pure for testing',
      script: 'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js'
    };

    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    this.electronService.ipcRenderer.send('InstallService', Data);
  }

  

  uninstall(){
    // this.windowsservice.uninstall('testService', 'service pure for testing',  'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js');
    // Some data that will be sent to the main process
    let Data = {
      name: 'testService',
      description: 'service pure for testing',
      script: 'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js'
    };

    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    this.electronService.ipcRenderer.send('UninstallService', Data);
  }

}



/*
EXAMPLE INSTALL
var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Name for Service',
  description: 'Description of the service',
  script: 'D:\\path\\path\\scriptname.js'
});
 
// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
});
 
// install the service
svc.install();

*/