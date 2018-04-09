import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: './file-upload.dialog.component.html',
  styleUrls: ['./file-upload.dialog.component.css']
})
export class FileUploadDialogComponent {


  @ViewChild('fileInput') fileInput;

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    public title: string;
    public content: string;
    private imageUrl = '';
    private fileToUpload: File;

    constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>,
                private afStorage: AngularFireStorage,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    /**
     * @returns void
     */
    renderFile(): void {
        const files = this.fileInput.nativeElement.files;
        if (files && files[0]) {
            const reader = new FileReader();
            const fileToUpload = files[0];
            reader.readAsDataURL(fileToUpload);
            reader.onloadend = () => {
                this.imageUrl = reader.result;
                this.fileToUpload = fileToUpload;
            };
        }
    }

    /**
     * @returns void
     */
    uploadFile(): void {
      const id = this.data.productID;
      this.ref = this.afStorage.ref('productThumbnails');
      this.task = this.ref.child(id)
          .put(this.fileToUpload)
          .then((res: firebase.storage.UploadTaskSnapshot) => {
              console.log(res);
              if (res.state === 'success') {
                  this.dialogRef.close(res.downloadURL);
              }
          })
          .catch(err => console.log('errr" \n' + err));
    }
}
