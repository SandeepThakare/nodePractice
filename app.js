// import { stat } from 'fs';

const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const getWeather = require('./weatherApi/getWeather');

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

geocode.geocodeAddress(argv.address, (error, result) => {
    if (error) {
        console.log(`Can not complete the request. Error JSON: ${JSON.stringify(error, undefined, 2)}`);
    } else {
        console.log(JSON.stringify(result, undefined, 2));
        console.log(result.longitude);
        getWeather.currentWeather(result.latitude, result.longitude, (err, response) => {

            if (err) {
                console.log(`Can not complete the request. Error JSON: ${JSON.stringify(err, undefined, 2)}`);
            } else {
                console.log(result.address);
                console.log(`Current Temprature ${response.temperature} and it is ${response.summary}`);
            }response
        })
    }
});

console.log(argv);

