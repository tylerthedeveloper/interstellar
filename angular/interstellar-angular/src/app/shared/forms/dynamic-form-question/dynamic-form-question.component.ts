import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MyFormElement } from '../form-element';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {

    // @ViewChild('fileInput') fileInput; // ElementRef;
    // imageUrl: any;
    // file: any;

    @Input() question: MyFormElement<any>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.key].valid; }
    // get hasImageFileName() { return this.imageUrl; }
    // get hasImageFile() { return this.fileInput; }
    // get value() { return this.file; }

    // renderFile(e: any) {
    //     const fi = this.fileInput.nativeElement;
    //   // if (fi.files && fi.files[0]) {
    //     const  reader = new FileReader();
    //     // let file = e.target.files[0];
    //     const fileToUpload = fi.files[0];
    //     reader.readAsDataURL(fileToUpload);
    //     reader.onloadend = () => {
    //       this.imageUrl = reader.result;
    //       console.log(fileToUpload);
    //       this.file = fileToUpload;
    //       const key = this.question.key;
    //       console.log(key);
    //       console.log(this.fileInput.nativeElement.files);
    //       console.log(this.form.get(this.question.key).value);
    //       // this.form.patchValue({key: 'fileToUpload'}); //, {onlySelf: true, emitEvent: true})
    //       this.form.controls[key].patchValue('fileToUpload');

    //       // this.form.patchValue({
    //       //   key : 'aaaa'
    //       //     // filename: fileToUpload.name,
    //       //     // filetype: fileToUpload.type,
    //       //     // value: reader.result.split(',')[1]
    //       // });
    //       console.log(this.fileInput.nativeElement.files);
    //       console.log(this.form.get(this.question.key).value);
    //     };
          // this.form.controls['file'].setValue($event.target.files)
    // }
    constructor() { }

}
