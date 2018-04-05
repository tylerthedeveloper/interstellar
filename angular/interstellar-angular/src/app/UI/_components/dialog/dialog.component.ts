import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

//selector: 'dialog',
@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

    public title: string;
    public content: string;

    constructor(public dialogRef: MatDialogRef<DialogComponent>) {} //public dialogRef: MdDialogRef<DialogComponent>
    ngOnInit() {}
}

