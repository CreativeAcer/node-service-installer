import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UninstallServiceComponent } from './uninstall-service.component';

describe('UninstallServiceComponent', () => {
  let component: UninstallServiceComponent;
  let fixture: ComponentFixture<UninstallServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UninstallServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UninstallServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
