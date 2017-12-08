var express = require('express');
var bodyParser = require('body-parser');

var birds = require('./routes/birds');

var app = express();

// use middleware example
app.use('/', (req, res, next) => {
    console.log('Request Url: ' + req.url);
    next();
});

// use static file example
app.use('/assets', express.static(__dirname+ '/public'));

// Set Templating engine
app.set('view engine', 'ejs');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.send(` <html>
                   <head>
                       <link href="assets/style.css" type=text/css rel="stylesheet">
                   </head>
                       <h1>Hello world</h1>
                   <body>
                   </body>
               </html>`);
});

// parameters example
app.get('/person/:id', (req, res) => {
    res.send("hello, " + 
    req.params.id);
});

// json result
app.get('/api', (req, res) => {
     res.json({
         firstname: 'shady',
         lastname: 'lastname'
     });
});

// Templating example 1
app.get('/template', (req, res) => {
    res.render('index');
});

// Templating and QueryString Example 
app.get('/template-person/:id', (req, res) => {
    res.render('person', {
        id: req.params.id,
        Qstr: req.query.qstr 
    });
});

// post example
app.post('/person', urlencodedParser, (req, res) => {
   res.send('Thank you!');
   console.log(req.body.firstname);
   console.log(req.body.lastname);
});

// post json example
app.post('/person-json', jsonParser, (req, res) => {
    console.log('Thank you for the JSON data!');
    console.log(req.body.firstname);
    console.log(req.body.lastname);
 });

// pattern eaxample
app.get(/.*fly$/, function (req, res) {
    res.send('/.*fly$/')
  });

// route handler example
app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    });

// router module example.
app.use('/birds', birds);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port`);
});