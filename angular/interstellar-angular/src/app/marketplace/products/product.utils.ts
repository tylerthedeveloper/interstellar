import { Product } from "../_market-models/product";

const validateNewQuantity = (curQuant: number, quantity: number): boolean => {
    // let curQuant = product.quantity;
    if (curQuant === 0 || (curQuant-quantity) < 0) return false;
    else if ((curQuant-quantity) === 0) return true;
}

export { validateNewQuantity }