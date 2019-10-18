import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from '../shared/pipe/limitto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeRoutingModule } from './home-routing.module';
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
import { ElectronService } from '../core/services';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InstallServiceComponent } from '../install-service/install-service.component';
import { UninstallServiceComponent } from '../uninstall-service/uninstall-service.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,
        TruncatePipe,
        InstallServiceComponent,
        UninstallServiceComponent
      ],
        providers: [ElectronService],
      imports: [TranslateModule.forRoot(),
        RouterTestingModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HomeRoutingModule,
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title in a h1 tag', async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'PAGES.HOME.TITLE'
  //   );
  // }));
});
