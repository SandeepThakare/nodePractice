// import { stat } from 'fs';

const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address fetch from api',
            string: true
        }
    })
    .help('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(url).then((result) => {

    if(result.data.status === 'ZERO_RESULTS') {
        throw new Error('No data asscociated with the given address');
    }
    // console.log(JSON.stringify(result.data, undefined, 2));     
    
    var latitude = result.data.results[0].geometry.location.lat;
    var longitude = result.data.results[0].geometry.location.lng;

    var weatherurl= `https://api.darksky.net/forecast/4560f43b6b2e94f3ead7662e73e6733b/${latitude},${longitude}`;
    
    axios.get(weatherurl).then((response) => {

        var temperature = response.data.currently.temperature;
        var summary = response.data.currently.summary;
        console.log(`Current Temprature is ${temperature}. And weather is ${summary}`);
    })

})
.catch((error) => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect with api service');
    } else {
        console.log(error.message);
    }
    // console.log(JSON.stringify(error, undefined, 2));
})


