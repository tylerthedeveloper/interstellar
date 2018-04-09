import { FormGroup, FormControl, Validators } from '@angular/forms';

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

export { createFormGroup };
