import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, Shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private shellSettingSubject = new Subject<ShellSetting>();
  private _loading: boolean = false;
  loadingStatus = new Subject<any>();
  snackbarMSG = new Subject<any>();
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  /**
   * SHELLSETTINGS
   */
  getShellSettings(): Observable<ShellSetting> {
    return this.shellSettingSubject.asObservable();
  }

  setShellSettings(settings: ShellSetting): void {
    this.shellSettingSubject.next(settings);
  }
  /**
   * END SHELLSETTINGS
   */

   /**
   * LOADING SETTINGS
   */
  get loading():boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    console.log("start loading screen");
    this.loading = true;
  }

  stopLoading() {
    console.log("stop loading screen");
    this.loading = false;
  }

  /**
   * END LOADING SETTINGS
   */

   /**
   * SNACKBAR SETTINGS
   */
  set snackbar(value) {
    this.snackbarMSG.next(value);
  }

  sendsnackbar(value) {
    this.snackbar = value;
  }

  /**
   * END SNACKBAR SETTINGS
   */

}
