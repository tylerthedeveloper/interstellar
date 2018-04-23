import { DropdownQuestion, TextboxQuestion, CheckBoxQuestion, NumberInputQuestion } from '../../shared/forms/form-element';
import { unitedStates } from './states';
import { shipTypes } from './ship-types';
import { countries } from './countries';


// const requiredPublicProductDataTyped: Array<{ key: string, type: string}> = [
//     { key: 'productName', type: 'string'},
//     { key: 'productShortDescription', type: 'string'},
//     { key: 'fixedUSDAmount', type: 'number'},
//     { key: 'quantity', type: 'number'},
//     { key: 'productCategory', type: 'string'},
// ];

// const requiredPublicProductData = [
//     'productName',
//     'productShortDescription',
//     'fixedUSDAmount',
//     'quantity',
//     'productThumbnailLink',
//     'productCategory',
//     'productPrices',
// ];


// const optionalPublicProductData = [
//     'productPrices',
//     'productLongDescription',
//     'productImages',
// ];

// TODO: https://embed.plnkr.co/plunk/QcCN2I -----> FORM ARRAY

    // shipCountry = 'USA';
    // shipContactName: string;
    // shipPhone: string;
    // shipEmail: string;
    // shipCompany_name: string;
    // shipStreet1: string;
    // shipCity: string;
    // shipState: string;
    // shipPostal_code: string;
    // shipType: string;
    // shipTax_id: string;


    // todo: ETD
const shippingAddressQuestions = [
    // new TextboxQuestion({key: 'shipCountry', label: 'Country', value: 'USA', required: true, order: 1 }),
    new DropdownQuestion({ key: 'shipCountry', label: 'Country', required: true, order: 3, value: 'USA',
                            options: countries.map(country => ({key: country.code,  value: country.name})),
    }),
    new TextboxQuestion({key: 'shipContactName', label: 'Contact Name', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'shipPhone', label: 'Phone', value: '', required: false, order: 1 }), // validate length
    new TextboxQuestion({key: 'shipEmail', label: 'email', value: '', required: false, order: 1 }), // validate email
    // validate address
    new TextboxQuestion({key: 'shipCompany_name', label: 'company_name', value: '', required: false, order: 1 }),
    new TextboxQuestion({key: 'shipStreet1', label: 'street1', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'shipCity', label: 'shipCity', value: '', required: true, order: 1 }),
    new DropdownQuestion({ key: 'shipState', label: 'State', required: true, order: 3,
        options: unitedStates.map(state => ({key: state.iso,  value: state.name})),
    }),
    // CheckBoxQuestion
    // new CheckBoxQuestion({key: 'shipType', label: 'shipType', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'shipTax_id', label: 'Tax_id', value: '', required: false, order: 1 }),
];

const shippingTypeQuestions = [
    new NumberInputQuestion({key: 'shipCost', label: 'Ship Cost', value: 1, required: true, order: 1, type: 'number' }),
    new DropdownQuestion({ key: 'shipType', label: 'Shipping Options', required: true, order: 3,
        options: shipTypes.map(method => ({key: method.type,  value: method.value})),
    }),
    new NumberInputQuestion({key: 'shipTime', label: 'Est Time', value: 1, required: true, order: 1, type: 'number' }),
];

export {
    shippingAddressQuestions,
    shippingTypeQuestions
 };
