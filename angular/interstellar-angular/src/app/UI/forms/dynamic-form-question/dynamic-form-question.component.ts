import { Component, Input } from '@angular/core';
import { MyFormElement } from '../form-element';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {

  @Input() question: MyFormElement<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  constructor() { }

}
