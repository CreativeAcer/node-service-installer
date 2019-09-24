import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  NodeWindowsService: any;
  svc: any;


  constructor() { 
    this.NodeWindowsService = require('node-windows').Service;

    

  }

  async install(servicename: string, desc: string, path: string){
    this.svc = new this.NodeWindowsService({
      name:servicename,
      description: desc,
      script: path
    });    
    
    this.svc.on('install',function(){
      console.log('Install succesfull.');
      this.svc.start();
    });
    this.svc.on('alreadyinstalled',function(){
      console.log('This service is already installed.');
    });
    this.svc.install(path , function(){
      console.log('installed');
    });

  }


  uninstall(servicename: string, desc: string, path: string){
    this.svc = new this.NodeWindowsService({
      name:servicename,
      description: desc,
      script: path
    });
    this.svc.on('uninstall',function(){
      console.log('Uninstall complete.');
      console.log('The service exists: ',this.svc.exists);
     
    });
    this.svc.uninstall();
  }
}


