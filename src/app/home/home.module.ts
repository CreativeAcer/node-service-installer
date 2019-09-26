import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { InstallServiceComponent } from '../install-service/install-service.component';
import { UninstallServiceComponent } from '../uninstall-service/uninstall-service.component';

@NgModule({
  declarations: [HomeComponent, InstallServiceComponent, UninstallServiceComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, HomeRoutingModule, BrowserAnimationsModule, MatButtonModule]
})
export class HomeModule {}
