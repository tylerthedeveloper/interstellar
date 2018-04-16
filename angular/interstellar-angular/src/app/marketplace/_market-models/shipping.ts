export class ShippingAddress {

    country = 'USA';
    contact_name: string;
    phone: string;
    email: string;
    company_name: string;
    street1: string;
    city: string;
    state: string;
    postal_code: string;
    type: string;
    tax_id: string;

}

export class ShippingInformation {

    shipCost: number;
    shipType: ShipType;
    shipService: string;
    trackingNumber: string;
    validShipService: boolean;
    isShipped: boolean;

}

export const enum ShipType {
    'ups_2nd_day_air' = 'ups_2nd_day_air',
    'ups_3_day_select' = 'ups_3_day_select',
    'ups_expedited' = 'ups_expedited',
    'ups_express' = 'ups_express',
    'ups_express_plus' = 'ups_express_plus',
    'ups_first_class_mail' = 'ups_first_class_mail',
    'ups_ground' = 'ups_ground',
    'ups_next_day_air' = 'ups_next_day_air',
    'ups_priority_mail' = 'ups_priority_mail',
    'ups_saver' = 'ups_saver',
    'ups_standard' = 'ups_standard',
    'ups_today_dedicated_courier' = 'ups_today_dedicated_courier',
    'ups_today_express' = 'ups_today_express',
    'ups_today_standard' = 'ups_today_standard'
}
