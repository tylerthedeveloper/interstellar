import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogComponent } from '..';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent {

    @Input() public title: string;
    public content: string;

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.content = data.content;
    }

}
