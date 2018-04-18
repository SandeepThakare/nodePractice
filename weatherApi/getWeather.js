const request = require('request');

var currentWeather = (latitude, longitude, callback) => {

    console.log('Longitude - ', longitude);
    console.log('Latitude - ', latitude);

    request({
        url: `https://api.darksky.net/forecast/4560f43b6b2e94f3ead7662e73e6733b/${latitude},${longitude}`,
        json: true
    },(error, response, body) => {
        // console.log(body);
        
        if(error) {
            callback(JSON.stringify(error, undefined, 2));
        } else if(body.code === 400) {
            callback('Invalid request');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary
            });
        }
    });
}

module.exports = {
    currentWeather
};