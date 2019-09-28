import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

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
    HomeRoutingModule, 
    BrowserAnimationsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatTableModule, 
    MatListModule,
    MatIconModule],
  entryComponents: [ListservicesComponent]
})
export class HomeModule {}
