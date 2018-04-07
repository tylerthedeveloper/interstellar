import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

/**
 * @returns FormGroup
 */
const createFormGroup = (_dataMapper: any, _model: any = null): FormGroup => {
        const _formBuilder = new FormBuilder();
        const group = _formBuilder.group({});
        Object.keys(_dataMapper).forEach(attr => {
            console.log(attr)
            group.addControl(attr, new FormControl(_model[attr] || ''));
        });
        return group;
};

export { createFormGroup };
