import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windowsservice/windows-service.service';

@Component({
  selector: 'app-uninstall-service',
  templateUrl: './uninstall-service.component.html',
  styleUrls: ['./uninstall-service.component.scss']
})
export class UninstallServiceComponent implements OnInit {
  private uninstallerService: any;

  constructor(private windowsservice: WindowsService) {
    
  }

  ngOnInit() {
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
