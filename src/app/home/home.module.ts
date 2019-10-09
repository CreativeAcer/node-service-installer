import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { InstallServiceComponent } from '../install-service/install-service.component';
import { UninstallServiceComponent } from '../uninstall-service/uninstall-service.component';
import { ListservicesComponent } from '../listservices/listservices.component';


@NgModule({
  declarations: [HomeComponent, InstallServiceComponent, UninstallServiceComponent, ListservicesComponent],
  imports: [
    CommonModule, 
    SharedModule, 
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
    MatSnackBarModule],
  entryComponents: [ListservicesComponent]
})
export class HomeModule {}
