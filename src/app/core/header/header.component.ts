import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../services/electron/electron.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private electronService: ElectronService) {
  }

  ngOnInit() {
    this.electronService.ipcRenderer.on('isAdminUserReturn', (event, arg) => {
      console.log('isadmin: ' + arg);
    });
  }

  isAdmin(){
    this.electronService.ipcRenderer.send('isAdminUser');
  }

}
