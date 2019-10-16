import { Component, OnInit, NgZone, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
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
export class UninstallServiceComponent implements OnInit, AfterViewInit {
  servicedata: any;
  installedServicesFound = false;
  installedWindowsServices: MatTableDataSource<WindowsServiceModel>;
  installedServices: MatTableDataSource<ServiceModel>;
  displayedColumns: string[] = ['position', 'name', 'action'];
  displayedWindowsColumns: string[] = ['position', 'ImageName', 'MemUsage', 'PID', 'SessionName', 'action'];

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(private electronService: ElectronService, private zone: NgZone) {
    this.installedServices = new MatTableDataSource<ServiceModel>([]);
    this.installedWindowsServices = new MatTableDataSource<WindowsServiceModel>([]);
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('allInstalledServicesComplete', (event, arg: ServiceModel[]) => {
      this.zone.run(() => {
        this.installedServices.data = arg;
        this.installedServicesFound = this.installedServices.data.length > 0;
        this.electronService.stopLoading();
      });
      // this.installedServices._updateChangeSubscription();
    });
    this.electronService.ipcRenderer.on('allInstalledServicesError', (event, arg) => {
      this.electronService.sendsnackbar(arg);
    });
    this.electronService.ipcRenderer.on('UninstallServiceComplete', (event, arg) => {
      this.electronService.ipcRenderer.send('getAllInstalledServices');
      this.electronService.sendsnackbar(arg);
    });
    this.electronService.ipcRenderer.on('killWindowsServiceComplete', (event, arg) => {
      this.electronService.startLoading();
      this.electronService.ipcRenderer.send('getAllServices');
      this.electronService.sendsnackbar(arg);
    });
    this.electronService.ipcRenderer.on('killWindowsServiceError', (event, arg) => {
      this.electronService.sendsnackbar(arg);
    });
    this.electronService.ipcRenderer.send('getAllInstalledServices');
    this.electronService.ipcRenderer.on('AllServicesComplete', (event, arg) => {
      this.zone.run(() => {
        // this.servicedata = of(arg);
        this.installedWindowsServices.data = arg;
        this.electronService.stopLoading();
        // const dialogRef = this.dialog.open(ListservicesComponent, {
        //   data: of(arg)
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed' + result);
        // });
      });
    });
  }

  ngAfterViewInit() {
    this.installedServices.paginator = this.paginator.toArray()[0];
    this.installedWindowsServices.paginator = this.paginator.toArray()[1];
  }


  uninstallchosen(scriptData: any) {
    this.electronService.startLoading();
    const Data = {
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
    this.electronService.ipcRenderer.send('getAllServices');
  }

  killWindowsService(service: any) {
    const Data = {
      pid: service.PID,
      force: true
    };
    this.electronService.ipcRenderer.send('killWindowsService', Data);
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
