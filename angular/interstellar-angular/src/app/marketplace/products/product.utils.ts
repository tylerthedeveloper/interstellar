const validateNewQuantity = (curQuant: number, quantity: number): boolean => {
    if (curQuant === 0 || (curQuant - quantity) < 0) {
        return false;
    } else {
        return true;
    }
};

export { validateNewQuantity };
