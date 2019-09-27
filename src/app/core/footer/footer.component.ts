import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../services/electron/electron.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  appVersion: string;

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('appVersion', (event, arg) => {
      this.appVersion = arg;
    });
  }

  ngOnInit() {
    this.electronService.ipcRenderer.send('getVersion');
  }
}
