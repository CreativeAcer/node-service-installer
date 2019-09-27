import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services/electron/electron.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routerSub: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('isAdminUserReturn', (event, arg) => {
      console.log('isadmin: ' + arg);
    });
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        const settings: ShellSetting = {
          showHeader: this.activatedRoute.snapshot.data.showHeader,
          showFooter: this.activatedRoute.snapshot.data.showFooter,
          showSidebar: this.activatedRoute.snapshot.data.showSidebar,
        }
        this.electronService.setShellSettings(settings);
      }
    });
  }

  ngOnInit() {
    this.electronService.ipcRenderer.send('isAdminUser');
  }

}
