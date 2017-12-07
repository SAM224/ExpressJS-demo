var express = require('express');

var app = express();

app.get('/', (req, res) => {
     res.send('Hello world');
});

app.get('/api', (req, res) => {
     res.json({
         firstname: 'shady',
         lastname: 'lastname'
     });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port`);
});