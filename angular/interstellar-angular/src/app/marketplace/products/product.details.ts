import { TextboxQuestion, DropdownQuestion, NumberInputQuestion } from 'app/UI/forms/form-element';
import { categoryTitleList } from '../category/categories';


const requiredPublicProductDataTyped = [
    { key: 'productName', type: 'string'},
    { key: 'productShortDescription', type: 'string'},
    { key: 'fixedUSDAmount', type: 'number'},
    { key: 'quantity', type: 'number'},
    { key: 'productThumbnailLink', type: 'string'},
    { key: 'productCategory', type: 'string'}, // todo: test how????
];

const requiredPublicProductData = [
    'productName',
    'productShortDescription',
    'fixedUSDAmount',
    'quantity',
    'productThumbnailLink',
    'productCategory'
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
    new TextboxQuestion({key: 'fixedUSDAmount', label: 'Fixed USD Amount', value: '', required: true, order: 1 }),

    // TODO: CHANGE TO QUANT
    new NumberInputQuestion({
        key: 'quantity',
        // TODO: CHANGE TO productCategory
        label: 'Quantity',
        value: 1,
        required: true,
        order: 1
      }),
    // TODO: CHANGE TO ASSET PROUDCT PRICES ... or dont????
    new DropdownQuestion({
        key: 'productAssetPrices',
        label: 'ASSET PROUDCT PRICES',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
      // todo: change to photo uplOAD
    new TextboxQuestion({key: 'productThumbnailLink', label: 'Product ThumbnailLink', value: '', required: true, order: 1 }),
    new DropdownQuestion({
        key: 'productCategory',
        label: 'Product Category',
        options: categoryTitleList.map(element => {
            return {key: element,  value: element};
        }),
        order: 3
      }),
            // todo: change to photo uplOAD --> set max
      new TextboxQuestion({key: 'productImages', label: 'Product Images', value: '', required: false, order: 1 }),
];

export { productFormData, optionalPublicProductData, requiredPublicProductData };
