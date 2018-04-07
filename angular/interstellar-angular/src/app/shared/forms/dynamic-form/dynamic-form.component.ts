import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyFormElement } from '../form-element';
import { createFormGroup } from '../form.utils';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

    // @Input() objectMapper: any;
    // @Input() questions: MyFormElement<any>[] = [];
    objectMapper2: any;
    questions: MyFormElement<any>[] = [];

    private form: FormGroup;
    private payLoad;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.objectMapper2 = data.mapper;
      this.questions = data.mapper;
      this.form = createFormGroup(this.objectMapper2, this.questions);
      console.log(data)
    }

    ngOnInit() {
    }

    onSubmit() {
      // this.payLoad = JSON.stringify(this.form.value);
    }

}
