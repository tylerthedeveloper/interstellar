
1. create label
2. add tracking number to the order -> transaction group
3. display on order page after API treacking request ...
	-> say if is shipped or not

-------
after add to cart go to all products
handle error for stellar payment
handle navigation for sub categories
add and product edit form
profile edit form
filters

// https://docs.postmen.com/ups.html


var request = require("request");
	var options = {
		method: 'POST',
	    url: 'https://sandbox-api.postmen.com/v3/rates',
	    headers: {
			'content-type': 'application/json',
	        'postmen-api-key': '8fc7966b-679b-4a57-911d-c5a663229c9e'
		},
	    body: '{"async":false,"shipper_accounts":[{"id":"00000000-0000-0000-0000-000000000000"}],"is_document":false,"shipment":{"ship_from":{"contact_name":"Elmira Zulauf","company_name":"Kemmer-Gerhold","street1":"662 Flatley Manors","country":"HKG","type":"business"},"ship_to":{"contact_name":"Dr. Moises Corwin","phone":"1-140-225-6410","email":"Giovanna42@yahoo.com","street1":"28292 Daugherty Orchard","city":"Beverly Hills","postal_code":"90209","state":"CA","country":"USA","type":"residential"},"parcels":[{"description":"Food XS","box_type":"custom","weight":{"value":2,"unit":"kg"},"dimension":{"width":20,"height":40,"depth":40,"unit":"cm"},"items":[{"description":"Food Bar","origin_country":"USA","quantity":2,"price":{"amount":3,"currency":"USD"},"weight":{"value":0.6,"unit":"kg"},"sku":"imac2014"}]}]}}'
	};
	
	request(options, function (error, response, body) {
	    if (error) throw new Error(error);
	    console.log(body);
	});



	///https://docs.postmen.com/ups.html