import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listservices',
  templateUrl: './listservices.component.html',
  styleUrls: ['./listservices.component.scss']
})
export class ListservicesComponent {

  constructor(public dialogRef: MatDialogRef<ListservicesComponent>,
    @Inject(MAT_DIALOG_DATA) public servicedata: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
