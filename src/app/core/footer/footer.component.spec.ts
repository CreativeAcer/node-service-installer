import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService } from '../services';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FooterComponent
      ],
      providers: [ElectronService ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // inject([service, FooterComponent], (object) => {
    //   fixture = TestBed.createComponent(object);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    // });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', inject([service, component], (object) => {
  //   expect(object).toBeTruthy();
  // }));
  
  
});
