import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromPromise';
import { User } from 'app/user/user';

@Injectable()
export class FileStorageService {

    public currentUser: User;
    private usersCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<User>('users');
    }

    // renderFile() {
    //     const files = this.fileInput.nativeElement.files;
    //     if (files && files[0]) {
    //         const reader = new FileReader();
    //         const fileToUpload = files[0];
    //         reader.readAsDataURL(fileToUpload);
    //         reader.onloadend = () => {
    //             // this.imageUrl = reader.result;
    //             // this.fileToUpload = fileToUpload;
    //         };
    // }

// uploadFile(): void {
  //   const id = this.data.productID;
  //   this.ref = this.afStorage.ref('productThumbnails');
  //   this.task = this.ref.child(id)
  //       .put(this.fileToUpload)
  //       .then((res: firebase.storage.UploadTaskSnapshot) => {
  //           console.log(res);
  //           if (res.state === 'success') {
  //               this.dialogRef.close(res.downloadURL);
  //           }
  //       })
  //       .catch(err => console.log('errr" \n' + err));
  // }
}
