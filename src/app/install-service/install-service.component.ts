import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-install-service',
  templateUrl: './install-service.component.html',
  styleUrls: ['./install-service.component.scss']
})
export class InstallServiceComponent implements OnInit {
  displayOptions: boolean = false;
  isProcessVar: boolean = false;
  envVariables: EnvironmentVariable[] = [];
  
  installForm = new FormGroup({
    scriptName: new FormControl('', Validators.required),
    scriptDesc: new FormControl('', Validators.required),
    scriptPath: new FormControl({value:'', disabled: true}, Validators.required),
  });

  envvarForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });

  constructor(private electronService: ElectronService) {
    
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('InstallServiceComplete', (event, arg) => {
      console.log(arg);
      this.resetForm();
      this.electronService.stopLoading();
    });
    this.electronService.ipcRenderer.on('InstallServiceError', (event, arg) => {
      console.log(arg);
      this.electronService.stopLoading();
    });
  }

  resetForm() {
    this.installForm.reset();
  }

  selectScript() {
    // Some data that will be sent to the main process
    this.electronService.remote.dialog.showOpenDialog(this.electronService.remote.getCurrentWindow(), {
      filters: [{
        name: 'JavaScript',
        extensions: ['js']
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
    this.electronService.startLoading();
    let Data = {
      name: this.installForm.get('scriptName').value,
      description: this.installForm.get('scriptDesc').value,
      script: this.installForm.get('scriptPath').value,
      env: this.envVariables
    };

    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    this.electronService.ipcRenderer.send('InstallService', Data);
  }

  onOptionSubmit(value: EnvironmentVariable){
    if(this.isProcessVar){
      let optionData: EnvironmentVariable = ({
        name: value.name,
        value: process.env[value.value]
      });
      this.envVariables.push(optionData);
    }else {
      this.envVariables.push(value);
    }
    
    this.envvarForm.reset();
  }

  optionsToggle(event: MatSlideToggleChange){
    this.displayOptions = event.checked;
    event.checked ? null : this.envVariables = [];
  }

  processChange(event: MatCheckboxChange) {
    this.isProcessVar = event.checked;
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