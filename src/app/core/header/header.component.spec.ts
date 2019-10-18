import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ElectronService } from '../services';
import { RouterModule } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';

import { FakeElectronService } from '../../testservice/fake-electron.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [ElectronService],
      imports: [
        TranslateModule.forRoot(),
        RouterModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // const service: ElectronService = TestBed.get(ElectronService);
    // if(service.remote.app.isReady()){
    //   electronService.channelSource.next({
    //     channel: 'isAdminUserReturn',
    //     params: [true]
    //   });
      expect(component).toBeTruthy();
    // }

  });
  // it('should create', inject([service, component], (object) => {
  //   expect(object).toBeTruthy();
  // }));
});
