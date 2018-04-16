const request = require('request');

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    console.log(`Encoded Address - ${encodedAddress}`);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        console.log(body);
        if (error) {
            console.log('Unable to fetch data - Error JSON ', JSON.stringify(error, null, 2));
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('No data found with this address');
        } else if (body.status === 'OK') {
            // console.log(JSON.stringify(body, undefined, 2));
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        } else {
            console.log('Daily quota exceeded')
        }
    })
}

module.exports = {
    geocodeAddress
}