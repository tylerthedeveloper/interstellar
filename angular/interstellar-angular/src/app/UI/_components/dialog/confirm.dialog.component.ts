import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent {

    public title: string;
    public content: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

}
