import { Product } from '../_market-models/product';
import { requiredPublicProductData, requiredPublicProductDataTyped } from './product.details';
import { ConfirmDialogComponent } from 'app/UI/_components';
import { MatDialog } from '@angular/material';
import { AssetBalance } from 'app/stellar';

const validateNewQuantity = (curQuant: number, quantity: number): boolean => {
    if (curQuant === 0 || (curQuant - quantity) < 0) {
        return false;
    } else {
        return true;
    }
};

const areValidProductTypes = (object: any): boolean => {
    // todo: check if links are valid
    // check data types
    for (const attribute of requiredPublicProductDataTyped) {
        const key: string = attribute.key;
        const value: any = object[attribute.key];
        const type: string = attribute.type;

        // tODO: NEED TO CHECK FOR OBJECT TYPES ......
        if (!(object[key] && (typeof object[key] === type))) {
            console.log(attribute);
            return false;
        }
    }
    return true;
};

// const uploadThumbnailImage = (productID: string = 'new-prod-id23') => {
//     let dialog = new MatDialog(null, null, null, null, null, null, null)
//     const dialogRef = dialog.open(ConfirmDialogComponent, {
//         data: { productID: productID }
//     });
//     return dialogRef.afterClosed();
// };

// const handleNewProduct = (product: any) => {
//     // console.log('product');
//     // console.log(product);
//      const _product = <Product> {
//         productName: 'super fast GPU22222222',
//         productShortDescription: 'shawrty',
//         productLongDescription: 'looooooooooooong des',
//         fixedUSDAmount: 10,
//         quantity: 15,
//         productCategory: 'Electronics',
//         productPrices: [
//             new AssetBalance('7.00000', 'tycoin', 'Tycoins')
//         ],
//         productThumbnailLink: 'https://images10.newegg.com/productimage/14-487-290-01.jpg',
//         productSellerData: {
//             productSellerID: sessionStorage.getItem('user_doc_id'),
//             productSellerName: sessionStorage.getItem('user_name'),
//             productSellerPublicKey: sessionStorage.getItem('public_key')
//         }
//     };

//     // todo: TEST THESE ARENT EVER NULL!!!!!!
//     product.productPrices = [
//         new AssetBalance('7.00000', 'native', 'Lumens')
//     ];
//     product.productSellerData = {
//         productSellerID: sessionStorage.getItem('user_doc_id'),
//         productSellerName: sessionStorage.getItem('user_name') || '', // TODO: store user data in session storage!!!
//         productSellerPublicKey: sessionStorage.getItem('public_key')
//     };

//     if (!(product.productPrices &&
//           product.productSellerData.productSellerID &&
//         //   product.productSellerData.productSellerName
//           product.productSellerData.productSellerPublicKey && product.productThumbnailLink)) {
//             alert('invalid product error');
//             return;
//     }

//     const p = JSON.stringify(product);
//     this._productService.addProduct(p)
//                 .catch(err => console.log(err))
//                 .then(res => this.router.navigate(['/products', res]));
// }

export { validateNewQuantity, areValidProductTypes }; // uploadThumbnailImage, handleNewProduct
