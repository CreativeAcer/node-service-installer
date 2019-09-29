import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-listservices',
  templateUrl: './listservices.component.html',
  styleUrls: ['./listservices.component.scss']
})
export class ListservicesComponent {

  constructor(private electronService: ElectronService,
    public dialogRef: MatDialogRef<ListservicesComponent>,
    @Inject(MAT_DIALOG_DATA) public servicedata: any) {
      this.electronService.stopLoading();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
