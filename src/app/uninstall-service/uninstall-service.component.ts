import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-uninstall-service',
  templateUrl: './uninstall-service.component.html',
  styleUrls: ['./uninstall-service.component.scss']
})
export class UninstallServiceComponent implements OnInit {

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('allInstalledServices', (event, arg) => {
      console.log(arg);
    });
    
  }

  ngOnInit() {
    this.electronService.ipcRenderer.send('getAllServices');
    this.electronService.ipcRenderer.on('UninstallServiceComplete', (event, arg) => {
      console.log(arg);
    });
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

/**
 * EXAMPLE UNINSTALL
var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'Name for Service',
  description: 'Description of the service',
  script: 'D:\\path\\path\\scriptname.js'
});
 
// Listen for the 'uninstall' event so we know when it is done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
 
});
 
// Uninstall the service.
svc.uninstall();
 * 
 */
