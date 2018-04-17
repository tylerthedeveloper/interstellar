import { AbstractControl } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isValidSecretKey } from 'app/stellar';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { stellarKeyLength } from 'app/core/_constants/quantities';

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

function ValidateFormSecretKeyLength(control: AbstractControl) {
    // if (control.value) {
        const formStringValue = String(control.value);
        if (formStringValue.length === stellarKeyLength) {
            console.log(formStringValue);
            console.log(formStringValue.length === stellarKeyLength);
            return { validSKLength: true };
        }
    // }
    return null;
}

// https://stackblitz.com/edit/angular-1czeuw?file=app%2Fapp.component.ts
// https://blog.prowareness.com/2017/06/angular-4-form-validators/
// https://stackoverflow.com/questions/39236992/how-to-validate-white-spaces-empty-spaces-angular-2
// https://auth0.com/blog/real-world-angular-series-part-6/
// https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
// https://stackblitz.com/angular/arvbvjmpbjm?file=src%2Fapp%2Freactive%2Fhero-form-reactive.component.html
// https://stackoverflow.com/questions/48655324/angular-4-reactive-form-control-is-stuck-in-pending-state-with-a-custom-async-v
// https://stackoverflow.com/questions/48655324/angular-4-reactive-form-control-is-stuck-in-pending-state-with-a-custom-async-v?rq=1
// https://angular-templates.io/tutorials/about/angular-forms-and-validations
// https://manuel-rauber.com/2015/12/31/debouncing-angular-2-input-component/
// https://github.com/angular/angular/issues/13200
// http://fiyazhasan.me/asynchronous-validation-in-angulars-reactive-forms-control/

const ValidateFormSecretKey = (control: AbstractControl) => {
    if (!control.valueChanges) {
            return Observable.of( null );
    } else {
        return control.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            // .switchMap(value => control.value)
            .map(data => {
                console.log(isValidSecretKey(data));
                console.log(isValidSecretKey(data) === '' ? { invalid: true } : null);
                return data === '' ? { invalid: true } : null;
            }).first();
    }
};


export { createFormGroup, ValidateFormUrl, ValidateFormSecretKeyLength, ValidateFormSecretKey };


// https://alligator.io/angular/async-validators/
// https://stackoverflow.com/questions/36756159/angular-2-custom-validator-with-parameters
export class CustomValidators {
    static ValidateFormFieldLength(length: number) {
      return (control: AbstractControl) => {
        const formStringValue = String(control.value);
        return (formStringValue.length === length) ? null : { validSKLength: false };
      };
    }

    static ValidateFormUrl(urlString: string) {
        return (control: AbstractControl) => {
            return (control.value.startsWith('https') || !control.value.includes('.io')) ? null : { validURL: false };
          };
    }

    static ValidateFormFieldMatch(varString: any) {
        return (control: AbstractControl) => {
            if (!control.valueChanges) {
                return Observable.of( null );
            } else {
                return control.valueChanges
                    .debounceTime(1000)
                    .distinctUntilChanged()
                    // .switchMap(value => control.value)
                    .map(data => {
                        // console.log(isValidSecretKey(data));
                        // console.log(isValidSecretKey(data) === varString);
                        // console.log(isValidSecretKey(data) === '' ? { invalid: true } : null);
                        return data === varString ? { invalid: true } : null;
                    }).first();
            }
        };
    }
}



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
