import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallServiceComponent } from './install-service.component';

describe('InstallServiceComponent', () => {
  let component: InstallServiceComponent;
  let fixture: ComponentFixture<InstallServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
