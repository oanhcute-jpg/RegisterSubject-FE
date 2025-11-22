import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrls: ['./confirm-dialog-component.component.scss'],
    template: `
    <h2 mat-dialog-title>Xác nhận</h2>
    <mat-dialog-content>{{data.message}}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">Huỷ</button>
      <button mat-button color="warn" (click)="onYes()">Xoá</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponentComponent implements OnInit {

constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }

}
