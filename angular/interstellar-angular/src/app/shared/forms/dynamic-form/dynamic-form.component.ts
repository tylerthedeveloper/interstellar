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


    // isValidWithData() {
    //   // if (this.form.valid) {
    //   //   this._submitted.next(true);
    //   // }
    //   // return this._submitted.asObservable();
    // }

    cancel() {
      this._submitted.next(false);
    }

    ngOnInit() {
      this.form = createFormGroup(this.questions, this.objectMapper);
    }

    submitForm() {
      // const result = Object.assign({}, this.form.value);
      // const checkboxQuestions = this.questions.filter(x => x instanceof CheckBoxGroupQuestion) as CheckBoxGroupQuestion[];
      // Object.keys(this.form.value)
      //   .filter(x => x === 'checkbox-group')
      //   .forEach(x => {
      //     console.log(x)
      //     result[x] = checkboxQuestions[0].options
      //       .filter((y, n) => result[x][n])
      //       .map(z => z.key);
      // });
      // console.log(JSON.stringify(result));
      //   this.payLoad = JSON.stringify(this.form.value);
        this._submitted.next(true);
    }

}
