import { AbstractControl, FormArray } from '@angular/forms';
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
// TODO: FUCKING FIX ANGULAR CHECKBOXES OVVERRIDE CHECKED
const createFormGroup = (questions: any, objectMapper: any): FormGroup => {
    const group: any = {};
    questions.forEach(question => {
        const key = question.key;
        const value = (objectMapper) ? objectMapper[key] : question.value || '';
        if (question.controlType === 'checkbox-group') {
            const curKeyMapper = Object.keys((objectMapper[key] as Array<any>)[0] as {})[0];
            const curValueSet = objectMapper[key] as Array<any>;
            group[question.key] = new FormArray((question as any).options
                .map(option => {
                    const _disabled = option.disabled;
                    const _value = question.value && question.value.some(y => y === option.value) ? option.key : '';
                    const optionKey = option.key;
                    const _checked = (curValueSet.find(opt => opt[curKeyMapper] === optionKey)) ? true : false;
                    // console.log(_checked)
                    return new FormControl({value: _value, disabled: _disabled});
                }));
        } else if (question.type === 'number') {
            // console.log(question);
            const val: number = +(objectMapper) ? +objectMapper[key] || +question.value || 1 : +question.value || 1;
            group[key] = question.required ? new FormControl(+val, Validators.required) : new FormControl(+val);
        } else {
            group[key] = question.required ? new FormControl(value, Validators.required) : new FormControl(value);
        }
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

// https://stackoverflow.com/questions/37395599/angular2-best-way-to-use-formbuilder-validators-required-with-a-checkbox-group
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
                        console.log(data);
                        console.log(isValidSecretKey(data));
                        // console.log(isValidSecretKey(data) === varString);
                        // console.log(isValidSecretKey(data) === '' ? { invalid: true } : null);
                        return data === varString ? null : { invalid: true };
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
