import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isValidSecretKey } from 'app/stellar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

/* TODO: https://embed.plnkr.co/plunk/QcCN2I */
/**
 * @returns FormGroup
 */
const createFormGroup = (questions: any, objectMapper: any): FormGroup => {
    const group: any = {};
    questions.forEach(element => {
        const key = element.key;
        const value = (objectMapper) ? objectMapper[key] || element.value || '' : element.value || '';
        if (element.type === 'number') {
            console.log(element);
            const val: number = +(objectMapper) ? +objectMapper[key] || +element.value || 1 : +element.value || 1;
            group[key] = element.required ? new FormControl(+val, Validators.required) : new FormControl(+val);
        } else {
            group[key] = element.required ? new FormControl(value, Validators.required) : new FormControl(value);
        }
                        // console.log('+element', group[key]);

    });
    return new FormGroup(group);
};


function ValidateFormUrl(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
        return { validUrl: true };
    }
    return null;
}

function ValidateFormSecretKey(control: AbstractControl) {
    console.log(control.value);
    const str = String(control.value);
    if (!control.valueChanges || control.pristine) {
        return Observable.of( null );
    } else {
        return control.valueChanges
          .debounceTime( 1000 )
          .distinctUntilChanged()
        //   .take( 1 )
          .switchMap( () => isValidSecretKey(control.value) )
          .do( () => control.markAsTouched() )
          .map( isValid => {
              console.log(isValid)
              return isValid ? { isValid: true } : null;
        } );
    }
}

export { createFormGroup, ValidateFormUrl, ValidateFormSecretKey };

/*
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
const createFormGroup = (_dataMapper: any, _model: any = {}): FormGroup => {
    const _formBuilder = new FormBuilder();
    const group = _formBuilder.group({});
    _dataMapper.forEach(attr => {
        // console.log(attr);
        group.addControl(attr, new FormControl(_model[attr] || ''));
    });
    return group;
};

export { createFormGroup };

*/
