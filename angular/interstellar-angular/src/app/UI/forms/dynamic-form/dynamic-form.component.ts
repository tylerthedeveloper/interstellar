import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyFormElement } from '../form-element';
import { createFormGroup } from '../form.utils';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

    questions: MyFormElement<any>[] = [];
    objectMapper: any;

    private _submitted = new Subject<boolean>();
    private form: FormGroup;
    private payLoad;

    // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    //   // this.objectMapper2 = data.mapper;
    //   // this.questions = data.mapper;
    //   // console.log(data);
    // }

    isValid() {
      return this._submitted.asObservable();
    }

    ngOnInit() {
      this.form = createFormGroup(this.questions, this.objectMapper);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
        this._submitted.next(true);
        // console.log(JSON.stringify(this.form.value));
    }

}
