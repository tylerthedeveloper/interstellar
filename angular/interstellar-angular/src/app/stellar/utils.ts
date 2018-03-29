import { StellarLumensMinimum, TyCoinMinimum } from 'app/core/_constants/quantities';
import { AssetBalance } from 'app/stellar';

const currencyAssetsMapper = {
    'native' : 'Lumens',
    'tycoin' : 'TyCoins'
};

const isValidSecretKey = (secretKey: string): string => {
    try {
        return StellarSdk.Keypair.fromSecret(secretKey).publicKey();
    } catch (e) {
        // alert("Account does not exist or key is invalid: \n " + e);
        return;
    }
};

// const isValidNewBalance = (currentBalance: number, outlay: string): boolean => {
//     // tslint:disable-next-line:radix
//     const _outlay = parseInt(outlay);
//     const newBalance = (currentBalance - _outlay);
//     return newBalance > 0 && newBalance > StellarLumensMinimum;
// };

const calcTotalPurchaseAmount = (assetAmount: string, purchaseQuantity: number): number => {
    return (parseInt(assetAmount, 10) * purchaseQuantity);
};

const calcTotalsForMultipleAssets = (assets: AssetBalance[]): AssetBalance[] => {
    const updatedAssets = new Array<AssetBalance>();
    assets.forEach(asset => {
        if (!updatedAssets.find(CIT => CIT.asset_type === asset.asset_type)) {
            updatedAssets.push(asset);
        } else {
            const idx = updatedAssets.findIndex(CIT => CIT.asset_type === asset.asset_type);
            const curAssAmount = updatedAssets[idx].balance;
            const newAssAmount = (Number(curAssAmount) + Number(asset.balance));
            updatedAssets[idx] = {  asset_type: asset.asset_type, balance: String(newAssAmount)};
        }
    });
    return updatedAssets;
};

const calcDifferenceForMultipleAssets = (balances: AssetBalance[], assetPriceTotals: AssetBalance[]): AssetBalance[] => {
    const updatedAssets = new Array<AssetBalance>();
    assetPriceTotals.forEach(asset => {
        const idx = updatedAssets.findIndex(CIT => CIT.asset_type === asset.asset_type);
        const curAssAmount = updatedAssets[idx].balance;
        const newAssAmount = (Number(curAssAmount) - Number(asset.balance));
        updatedAssets[idx] = {  asset_type: asset.asset_type, balance: String(newAssAmount)};
    });
    return updatedAssets;
};

const isValidNewBalance = (assetType: string, currentBalance: number, totalAssetAmount: number): boolean => {
    const newBalance = (currentBalance - totalAssetAmount);
    if (newBalance >= 0) {
        if (assetType === 'native') {
            return (newBalance > StellarLumensMinimum);
        } else if (assetType === 'tycoin') {
            return (newBalance > TyCoinMinimum);
        }
        return true;
    }
    return false;
};

const updateBalance = (balanceArray: Array<AssetBalance>, asset: AssetBalance): void => {
    const index = balanceArray.findIndex(bal => bal.asset_type === asset.asset_type);
    const newbal = parseInt(balanceArray[index].balance, 10) - parseInt(asset.balance, 10);
    balanceArray[index].balance = String(newbal);
};

const getBalanceforAsset = (balanceArray: Array<AssetBalance>, assetType: string): number => {
    const index = balanceArray.findIndex(bal => bal.asset_type === assetType);
    return parseInt(balanceArray[index].balance, 10);
};

export { isValidSecretKey, currencyAssetsMapper, getBalanceforAsset,
        calcTotalPurchaseAmount, updateBalance, isValidNewBalance,
        StellarLumensMinimum, TyCoinMinimum, calcTotalsForMultipleAssets,
        calcDifferenceForMultipleAssets
};
