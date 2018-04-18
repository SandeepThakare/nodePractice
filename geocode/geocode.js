const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    console.log(`Encoded Address - ${encodedAddress}`);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        console.log(body);
        if (error) {
            callback('Unable to fetch data - Error JSON ');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('No data found with this address');
        } else if (body.status === 'OK') {
            // console.log(JSON.stringify(body, undefined, 2));
            callback(null, {
                'address': body.results[0].formatted_address,
                'latitude': body.results[0].geometry.location.lat,
                'longitude': body.results[0].geometry.location.lng
            })
            // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        } else {
            callback('Daily quota exceeded');
        }
    })
}

module.exports = {
    geocodeAddress
}