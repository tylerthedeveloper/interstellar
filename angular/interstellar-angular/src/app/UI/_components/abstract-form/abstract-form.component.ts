import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElement } from '../form-element';

@Component({
  selector: 'abstract-form',
  templateUrl: './abstract-form.component.html',
  styleUrls: ['./abstract-form.component.css']
})

export class AbstractFormComponent implements OnInit {

    @Input() formControls: FormElement<any>[] = [];
    form: FormGroup;
    payLoad = '';

    constructor() {  }

    ngOnInit() {
    }

    onSubmit() {
      this.payLoad = JSON.stringify(this.form.value);
    }
}
