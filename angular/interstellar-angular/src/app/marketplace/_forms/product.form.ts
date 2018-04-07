
export class MyFormElement<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;

    constructor(options: {
                value?: T,
                key?: string,
                label?: string,
                required?: boolean,
                order?: number,
                controlType?: string
                } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}

export class TextboxQuestion extends MyFormElement<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../_market-models/product';



// const publicProductData = [
//     // {'productName'},
//     {key: 'productName',
//     label: 'productName',
//     value: '',
//     required: true,
//     order: 1},
//     'productShortDescription',
//     'productLongDescription',
//     'fixedUSDAmount',
//     'quantity',
//     'productPrices',
//     'productThumbnailLink',
//     'productImages',
//     'productCategory'
// ];

const publicProductData = [
    // {'productName'},
    new TextboxQuestion({
        key: 'productName',
        label: 'productName',
        value: '',
        required: true,
        order: 1
      }),
      new TextboxQuestion({
        key: 'productShortDescription',
        label: 'productShortDescription',
        value: '',
        required: true,
        order: 1
      }),
];



/* TODO: https://embed.plnkr.co/plunk/QcCN2I */
/**
 * @returns FormGroup
 */
// _model: any = {}
const productFormGroup = (): FormGroup => {
        const _formBuilder = new FormBuilder();
        const group = _formBuilder.group({});
        // _model[attr] ||
                                        // group.addControl(attr['key'] || attr, new FormControl(attr)));
        publicProductData.forEach(element => (group[element.key] = element.required) ?
                                            group[element.key] = new FormControl(element.value || '', Validators.required) :
                                            group[element.key] = new FormControl(element.value || ''));

        return group;
};

const toFormGroup = (object: any) => {
    const group: any = {};
    // if (product) {
    //     Object.keys(product).forEach(key => console.log(key + ' ' + product[key]))
    // }
    publicProductData.forEach(element => {
        const key = element.key;
            const value = object[key] || element.value || '';
            group[key] = element.required ? new FormControl(value, Validators.required) :
                                            new FormControl(value);
            console.log('+element', group[key]);

    });
    return new FormGroup(group);
  };

export { publicProductData, toFormGroup, productFormGroup };
