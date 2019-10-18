import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingscreenComponent } from './loadingscreen.component';
import { ElectronService } from '../core/services/electron/electron.service';

import { FakeElectronService } from '../testservice/fake-electron.service';

describe('LoadingscreenComponent', () => {
  let component: LoadingscreenComponent;
  let fixture: ComponentFixture<LoadingscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingscreenComponent ],
      providers: [ElectronService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
