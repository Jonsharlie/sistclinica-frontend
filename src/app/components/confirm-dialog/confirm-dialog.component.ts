import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    this.title = data.title
    this.message = data.message
  }

  onConfirm(): void {
    this.dialogRef.close(true)
  }

  onDismiss(): void {
    this.dialogRef.close(false)
  }
}

export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string
  ) {}
}