import { Asset } from 'app/stellar/assets/asset';

export const stellarTermAssetsMapper1 = [
    {code: 'XLM', id: 'XLM-native'},
    {code: 'CNY', id: 'CNY-GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX'},
    {code: 'MOBI', id: 'MOBI-GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH'},
    {code: 'RMT', id: 'RMT-GCVWTTPADC5YB5AYDKJCTUYSCJ7RKPGE4HT75NIZOUM4L7VRTS5EKLFN'},
    {code: 'REPO', id: 'REPO-GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B'},
    {code: 'TARI', id: 'TARI-GD7UVDDJHJYKUXB4SJFIC6VJDQ4YADQCMRN3KLHJFV4H6NIUAEREVCO7'}
];

export const stellarTermAssetsMapper2 = {
    'XLM': 'XLM-native',
    'CNY': 'CNY-GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX',
    'MOBI': 'MOBI-GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH',
    'RMT': 'RMT-GCVWTTPADC5YB5AYDKJCTUYSCJ7RKPGE4HT75NIZOUM4L7VRTS5EKLFN',
    'REPO': 'REPO-GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B',
    'TARI': 'TARI-GD7UVDDJHJYKUXB4SJFIC6VJDQ4YADQCMRN3KLHJFV4H6NIUAEREVCO7'
};

// StellarSdk.Asset.native() ...
// StellarSdk.Asset(asset.code) ...
export const stellarTermAssets = [
    'XLM',
    'CNY',
    'MOBI',
    'RMT',
    'REPO',
    'TARI',
];

export const stellarTermAssets2: Array<Asset> = [
    {asset_type: 'native', coin_name: 'XLM-native'},
    {asset_type: 'CNY', coin_name: 'CNY-coin'},
    {asset_type: 'MOBI', coin_name: 'Mobius tokens'},
    {asset_type: 'RMT', coin_name: 'RMT-coins'},
    {asset_type: 'REPO', coin_name: 'REPO-coins'},
    {asset_type: 'TARI', coin_name: 'TARI-coins'}
];
