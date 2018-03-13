import { AccountBalance } from './account/account-balance';
import { StellarLumensMinimum, TyCoinMinimum } from 'app/core/_constants/quantities';

const currencyAssetsMapper = { 
    "native" : "Lumens",
    "tycoin" : "TyCoins"
}

const isValidSecretKey = (secretKey : string) : string => {
    try {
        return StellarSdk.Keypair.fromSecret(secretKey).publicKey();
    } catch (e) {
        //alert("Account does not exist or key is invalid: \n " + e);
        return;
    }
}

const isValidNewBalance = (currentBalance: number, outlay: string) : boolean => {
    let _outlay = parseInt(outlay);
    let newBalance = (currentBalance - _outlay); 
    return newBalance > 0 && newBalance > StellarLumensMinimum;
}

const isValidNewBalance2 = (assetType: string, currentBalance: number, outlay: number) : boolean => {
    // let _outlay = parseInt(outlay);
    let newBalance = (currentBalance - outlay);
    if (newBalance >= 0) {
        if (assetType === "native") return (newBalance > StellarLumensMinimum)
        else if (assetType === "tycoin") return (newBalance > TyCoinMinimum)
        return true;
    }
    return false;
}

const updateBalance = (balanceArray: Array<AccountBalance>, assetType: string, amount: string): void => {
    let index = balanceArray.findIndex(bal => bal.asset_type === assetType);
    let newbal = parseInt(balanceArray[index].balance) - parseInt(amount);
    balanceArray[index].balance = String(newbal);
}

const getBalanceforAsset = (balanceArray: Array<AccountBalance>, assetType: string): number => {
    let index = balanceArray.findIndex(bal => bal.asset_type === assetType);
    return parseInt(balanceArray[index].balance);
}

export { isValidSecretKey, currencyAssetsMapper, getBalanceforAsset, updateBalance, isValidNewBalance, isValidNewBalance2, StellarLumensMinimum }
