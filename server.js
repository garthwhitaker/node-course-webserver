

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('viewengine', 'hbs');

//middleware
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append file.');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: 'Maintenance',
//         welcomeMessage: 'Site is currently undergoing maintenance.'
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
    response.render('index.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'This is my home page.'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        description: 'This is an about page.'

    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        description: 'This is a projects page.'

    });
});

app.get('/bad', (req, res) => {

    res.send({
        error: 'Unable to meet your request.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});