// import { stat } from 'fs';

const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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

    var geocodeResponse = geocode.geocodeAddress(argv.address);

console.log(argv);

