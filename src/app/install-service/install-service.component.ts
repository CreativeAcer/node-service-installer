import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../core/services';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-install-service',
  templateUrl: './install-service.component.html',
  styleUrls: ['./install-service.component.scss']
})
export class InstallServiceComponent implements OnInit {
  displayOptions = false;
  isProcessVar = false;
  envVariables: EnvironmentVariable[] = [];
  addedOptions: MatTableDataSource<EnvironmentVariable>;
  displayedColumns: string[] = ['position', 'name', 'value', 'action'];

  installForm = new FormGroup({
    scriptName: new FormControl('', Validators.required),
    scriptDesc: new FormControl('', Validators.required),
    scriptPath: new FormControl({value: '', disabled: true}, Validators.required),
  });

  envvarForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });

  constructor(private electronService: ElectronService) {

  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.electronService.ipcRenderer.on('InstallServiceComplete', (event, arg) => {
      this.resetForm();
      this.electronService.stopLoading();
      this.electronService.sendsnackbar(arg);
    });
    this.electronService.ipcRenderer.on('InstallServiceError', (event, arg) => {
      this.electronService.stopLoading();
      this.electronService.sendsnackbar(arg);
    });
    this.addedOptions = new MatTableDataSource<EnvironmentVariable>(this.envVariables);
    if (!this.addedOptions.paginator ) {
      this.addedOptions.paginator = this.paginator;
    }
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

  install() {
    this.electronService.startLoading();
    const Data = {
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

  onOptionSubmit(value: EnvironmentVariable) {
    if (this.isProcessVar) {
      if (process.env[value.value]) {
        const optionData: EnvironmentVariable = ({
          name: value.name,
          value: process.env[value.value]
        });
        this.envVariables.push(optionData);
      } else {
        // not a correct env variable
        this.electronService.sendsnackbar('Please enter a valid process.env variable!');
      }


    } else {
      this.envVariables.push(value);
    }

    this.addedOptions.data = this.envVariables;
    this.envvarForm.reset();
  }

  deleteoption(itemIndex: number) {
    this.envVariables.splice(itemIndex, 1);
    this.addedOptions.data = this.envVariables;
  }

  optionsToggle(event: MatSlideToggleChange) {
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
