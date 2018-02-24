import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent { //extends DialogComponent

    public title: string;
    public content: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
        //super(dialogRef);
    }
    ngOnInit() {}
}