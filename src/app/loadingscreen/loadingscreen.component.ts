import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.scss']
})
export class LoadingscreenComponent implements OnInit {

  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private electronService: ElectronService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.electronService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
