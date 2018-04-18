// import { appendFile } from 'fs';

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getDateInMili', () => {
    return new Date(); 
});

hbs.registerHelper('toUp', (text) => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `User Requested ${now} for method ${req.method} and for "${req.path}" path ....`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err) {
            console.log(err);
        }
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        title: 'Maintenance Page',
        day: 15
    })
});

app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res) => {
    res.send('Hello there !!!');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Request can not be full filled'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
        year: new Date().getUTCDay()
    })
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        year: new Date().getFullYear(),
        name: 'Developer'
    })
});

app.listen(3000);