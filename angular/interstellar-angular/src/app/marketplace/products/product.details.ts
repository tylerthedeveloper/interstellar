import { categoryTitleList } from '../category/categories';
import { NumberInputQuestion, DropdownQuestion, TextboxQuestion } from '../../shared/forms/form-element';


const requiredPublicProductDataTyped: Array<{ key: string, type: string}> = [
    { key: 'productName', type: 'string'},
    { key: 'productShortDescription', type: 'string'},
    { key: 'fixedUSDAmount', type: 'number'},
    { key: 'quantity', type: 'number'},
    // { key: 'productThumbnailLink', type: 'string'}, // todo: test in dialog
    { key: 'productCategory', type: 'string'}, // todo: test how????
];

const requiredPublicProductData = [
    'productName',
    'productShortDescription',
    'fixedUSDAmount',
    'quantity',
    'productThumbnailLink',
    'productCategory',
    'productPrices',
];


const optionalPublicProductData = [
    'productPrices',
    'productLongDescription',
    'productImages',
];

// TODO: https://embed.plnkr.co/plunk/QcCN2I -----> FORM ARRAY

const productFormData = [
    new TextboxQuestion({key: 'productName', label: 'Product Name', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'productShortDescription', label: 'Product Short Description', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'productLongDescription', label: 'Product Long Description', value: '', required: false, order: 1 }),
    new NumberInputQuestion({key: 'fixedUSDAmount', label: 'Fixed USD Amount', type : 'number', value: 1, required: true, order: 1 }),
    new NumberInputQuestion({key: 'quantity', label: 'Quantity', type : 'number', value: 1, required: true, order: 1 }),
    new DropdownQuestion({ key: 'productCategory', label: 'Product Category', required: true, order: 3,
                            options: categoryTitleList.map(element => ({key: element,  value: element})),
    }),
    // TODO: CHANGE TO ASSET PROUDCT PRICES ... or dont????
    // new DropdownQuestion({
    //     key: 'productAssetPrices',
    //     label: 'ASSET PROUDCT PRICES',
    //     options: [
    //       {key: 'solid',  value: 'Solid'},
    //       {key: 'unproven', value: 'Unproven'}
    //     ],
    //     order: 3
    //   }),
      // todo: change to photo uplOAD
    // new FileUploadQuestion({key: 'productThumbnailLink',
    //         label: 'Product ThumbnailLink', required: false, order: 1, type: 'file',
    //         value: ''
    // }),


    // todo: change to photo uplOAD --> set max
    // new TextboxQuestion({key: 'productImages', label: 'Product Images', value: '', required: false, order: 1 }),
];

export { productFormData, optionalPublicProductData,
        requiredPublicProductData, requiredPublicProductDataTyped
};
