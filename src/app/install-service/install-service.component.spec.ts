import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { InstallServiceComponent } from './install-service.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeRoutingModule } from '../home/home-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TruncatePipe } from '../shared/pipe/limitto';
import { LoadingscreenComponent } from '../loadingscreen/loadingscreen.component';
import { ElectronService } from '../core/services/electron/electron.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FakeElectronService } from '../testservice/fake-electron.service';

describe('InstallServiceComponent', () => {
  let component: InstallServiceComponent;
  let fixture: ComponentFixture<InstallServiceComponent>;
  let electronService: FakeElectronService;
  const service: ElectronService = TestBed.get(ElectronService);
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallServiceComponent,
        LoadingscreenComponent,
        TruncatePipe
      ],
      providers: [ElectronService],
      imports: [
        TranslateModule.forRoot(),
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatDialogModule, 
        MatButtonModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatTableModule, 
        MatListModule,
        MatIconModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // const service: ElectronService = TestBed.get(ElectronService);
    // if(service.remote.app.isReady()){
    //   electronService.channelSource.next({
    //     channel: 'InstallServiceComplete',
    //     params: ['ok']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'InstallServiceError',
    //     params: ['error']
    //   });
      expect(component).toBeTruthy();
    //}
    
  });
  // it('should create', inject([service, component], (object) => {
  //   expect(object).toBeTruthy();
  // }));
});
