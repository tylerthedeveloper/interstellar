import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent {


    @ViewChild("fileInput") fileInput;

    public title: string;
    public content: string;
    imageUpload(e) {
      let reader = new FileReader();
      //get the selected file from event
      let file = e.target.files[0];
      reader.onloadend = () => {
        //Assign the result to variable for setting the src of image element
        // this.imageUrl = reader.result;
      }
      reader.readAsDataURL(file);
    }
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

}
