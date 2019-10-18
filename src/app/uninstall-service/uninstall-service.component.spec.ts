import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UninstallServiceComponent } from './uninstall-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TruncatePipe } from '../shared/pipe/limitto';
import { ElectronService } from '../core/services';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FakeElectronService } from '../testservice/fake-electron.service';

describe('UninstallServiceComponent', () => {
  let component: UninstallServiceComponent;
  let fixture: ComponentFixture<UninstallServiceComponent>;
  let electronService: FakeElectronService;
  const service: ElectronService = TestBed.get(ElectronService);
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UninstallServiceComponent,
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
    fixture = TestBed.createComponent(UninstallServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // const service: ElectronService = TestBed.get(ElectronService);
    // if(service.remote.app.isReady()){
    //   electronService.channelSource.next({
    //     channel: 'allInstalledServicesComplete',
    //     params: ['true']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'allInstalledServicesError',
    //     params: ['error']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'UninstallServiceComplete',
    //     params: ['complete']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'killWindowsServiceComplete',
    //     params: ['killok']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'killWindowsServiceError',
    //     params: ['killerror']
    //   });
    //   electronService.channelSource.next({
    //     channel: 'AllServicesComplete',
    //     params: ['ok']
    //   });
      expect(component).toBeTruthy();
    //}
    
  });

});
