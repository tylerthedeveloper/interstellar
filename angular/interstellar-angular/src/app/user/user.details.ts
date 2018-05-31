import { TextboxQuestion, NumberInputQuestion, CheckBoxGroupQuestion } from '../shared/forms/form-element';
import { stellarTermAssets2 } from 'app/stellar/stellar-term/asset.mappers';

const requiredPublicUserDataTyped: Array<{ key: string, type: string}> = [
    // { key: 'productName', type: 'string'},
    // { key: 'productShortDescription', type: 'string'},
    // { key: 'fixedUSDAmount', type: 'number'},
    // { key: 'quantity', type: 'number'},
    // { key: 'productCategory', type: 'string'},
];

const requiredPublicProfileData = [
    'userName',
    'fullName',
    'email',
];

const optionalPublicUserData = [
    'address',
    'profilePicture',
    'birthdate',
    'age'
];

// TODO: https://embed.plnkr.co/plunk/QcCN2I -----> FORM ARRAY

// https://github.com/philipphalder/angular2-dynamic-forms-advanced/blob/master/src/app/services/question-control.service.ts
// https://github.com/philipphalder/angular2-dynamic-forms-advanced/blob/master/src/app/components/dynamic-form/dynamic-form.component.ts
// https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2

const userFormData = [
    new TextboxQuestion({key: 'userName', label: 'Username', value: '', required: true, order: 1 }),
    new TextboxQuestion({key: 'fullName', label: 'Full name', required: true, order: 1 }),
    new TextboxQuestion({key: 'email', label: 'email', value: '', required: false, order: 1 }),
    new CheckBoxGroupQuestion({
        key: 'acceptedAssets',
        label: 'Accepted Assets',
        // options: stellarAssetsMapper2.map(asset => ({key: asset.asset_type,  value: asset.coin_name})),
        options: stellarTermAssets2.map(asset => {
            if (asset.asset_type === 'XLM' || asset.asset_type === 'native') {
                // console.log(asset);
                // FIXME: DO WE HAVE TO ENFORCE XLM???
                // console.log('I AM XLM')
                return { key: asset.asset_type,  value: asset.coin_name, disabled: true, checked: true };
            } else {
                return { key: asset.asset_type,  value: asset.coin_name, checked: false };
            }
        }),
        order: 4}),
    new NumberInputQuestion({key: 'age', label: 'Age', type : 'number', value: 1, required: false, order: 1 }),
];

export {
    requiredPublicUserDataTyped, requiredPublicProfileData,
    optionalPublicUserData, userFormData
};
