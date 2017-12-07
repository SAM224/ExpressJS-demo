var express = require('express');
var birds = require('./routes/birds')

var app = express();


app.use('/assets', express.static(__dirname+ '/public'));

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