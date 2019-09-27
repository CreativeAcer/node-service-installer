import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../services/electron/electron.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private electronService: ElectronService) {
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
