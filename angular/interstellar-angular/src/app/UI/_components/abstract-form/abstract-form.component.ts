import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyFormElement } from '../../../shared/forms/form-element';

@Component({
  selector: 'app-abstract-form',
  templateUrl: './abstract-form.component.html',
  styleUrls: ['./abstract-form.component.css']
})

export class AbstractFormComponent implements OnInit {

    @Input() formControls: MyFormElement<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor() {  }

    ngOnInit() {
    }

    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }
}
