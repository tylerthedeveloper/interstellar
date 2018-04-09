import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';

@Component({
  templateUrl: './confirm.dialog.component.html',
  styleUrls: ['./confirm.dialog.component.css']
})
export class ConfirmDialogComponent {


  @ViewChild('fileInput') fileInput;

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    // public title: string;
    // public content: string;
    private imageUrl = '';
    private fileToUpload: File;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                private afStorage: AngularFireStorage,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    renderFile() {
        const files = this.fileInput.nativeElement.files;
        if (files && files[0]) {
            const reader = new FileReader();
            const fileToUpload = files[0];
            reader.readAsDataURL(fileToUpload);
            reader.onloadend = () => {
              this.imageUrl = reader.result;
              // console.log(fileToUpload);
              // console.log(this.data.productID);
                this.fileToUpload = fileToUpload;
            };
        }
    }

    uploadFile() {
      // const id = Math.random().toString(36).substring(2);
      const id = this.data.productID;
      this.ref = this.afStorage.ref('productThumbnails');
      this.task = this.ref.child(id).put(this.fileToUpload);
      this.task.then(res => {
                      console.log('succc');
                      this.dialogRef.close(true);
                  })
                .catch(err => console.log('errr'));

    }
}
