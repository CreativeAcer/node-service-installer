import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-install-service',
  templateUrl: './install-service.component.html',
  styleUrls: ['./install-service.component.scss']
})
export class InstallServiceComponent implements OnInit {
  
  installForm = new FormGroup({
    scriptName: new FormControl('', Validators.required),
    scriptDesc: new FormControl('', Validators.required),
    scriptPath: new FormControl('', Validators.required),
  });

  constructor(private electronService: ElectronService) {
    
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('InstallServiceComplete', (event, arg) => {
      console.log(arg); 
    });
    this.electronService.ipcRenderer.on('InstallServiceError', (event, arg) => {
      console.log(arg); 
    });
  }

  selectScript() {
// this.windowsservice.install('testService', 'service pure for testing',  'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js');
    // Some data that will be sent to the main process
    this.electronService.remote.dialog.showOpenDialog(this.electronService.remote.getCurrentWindow(), {
      filters: [{
        name: 'Scripts',
        extensions: ['.js']
      }],
      properties: ['openFile']
    },
    function (filepaths, bookmarks) {
      if (filepaths === undefined) {
        return;
      }
      if (filepaths && filepaths[0]) {
        this.installForm.controls['scriptPath'].setValue(filepaths[0]);
      }
      return;
    }.bind(this));
  }

  install(){
    let Data = {
      name: this.installForm.get('scriptName'),
      description: this.installForm.get('scriptDesc'),
      script: this.installForm.get('scriptPath')
    };

    // demo script 'D:\\dev\\GitHub\\ServiceInstaller\\src\\assets\\HelloWorld.js'
    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    this.electronService.ipcRenderer.send('InstallService', Data);
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