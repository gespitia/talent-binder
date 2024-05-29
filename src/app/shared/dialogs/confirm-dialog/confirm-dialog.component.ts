import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef:MatDialogRef<ConfirmDialogComponent>) {
    console.log('ConfirmDialogComponent');
    console.log(this.dialogRef);
   }

}
