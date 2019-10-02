import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ElectronService } from '../core/services';
import { ListservicesComponent } from '../listservices/listservices.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs/internal/observable/of';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-uninstall-service',
  templateUrl: './uninstall-service.component.html',
  styleUrls: ['./uninstall-service.component.scss']
})
export class UninstallServiceComponent implements OnInit {
  servicedata: any;
  installedWindowsServices: MatTableDataSource<WindowsServiceModel>;
  installedServices: MatTableDataSource<ServiceModel>;
  displayedColumns: string[] = ['position', 'name', 'action'];
  displayedWindowsColumns: string[] = ['position', 'ImageName', 'MemUsage', 'PID', 'SessionName'];

  constructor(private electronService: ElectronService, private dialog: MatDialog, private zone: NgZone) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.electronService.ipcRenderer.on('allInstalledServicesComplete', (event, arg: ServiceModel[]) => {
      console.log(arg);
      this.zone.run(() => {
        this.installedServices = new MatTableDataSource<ServiceModel>(arg);
      });
      this.electronService.stopLoading();
      // this.installedServices._updateChangeSubscription();
    });
    this.electronService.ipcRenderer.on('allInstalledServicesError', (event, arg) => {
      console.log(arg);
    }); 
    this.electronService.ipcRenderer.on('UninstallServiceComplete', (event, arg) => {
      console.log(arg);
      this.electronService.ipcRenderer.send('getAllInstalledServices');
    });
    this.electronService.ipcRenderer.send('getAllInstalledServices');
  }

  uninstall(){
    this.electronService.startLoading();
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

  uninstallchosen(scriptData: any){
    let Data = {
      name: scriptData.name,
      script: scriptData.path
    };

    // Send information to the main process
    // if a listener has been set, then the main process
    // will react to the request !
    this.electronService.ipcRenderer.send('UninstallService', Data);
  
  }

  listServices() {
    this.electronService.startLoading();
    this.electronService.ipcRenderer.on('allInstalledServices', (event, arg) => {
      this.zone.run(() => {
        //this.servicedata = of(arg);
        this.installedWindowsServices = new MatTableDataSource<WindowsServiceModel>(arg);
        this.installedWindowsServices.paginator = this.paginator;
        this.electronService.stopLoading();
        // const dialogRef = this.dialog.open(ListservicesComponent, {
        //   data: of(arg)
        // });
    
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed' + result);
        // });
      });
    });

    this.electronService.ipcRenderer.send('getAllServices');
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
