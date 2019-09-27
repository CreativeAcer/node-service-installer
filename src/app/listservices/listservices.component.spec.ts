import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListservicesComponent } from './listservices.component';

describe('ListservicesComponent', () => {
  let component: ListservicesComponent;
  let fixture: ComponentFixture<ListservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
