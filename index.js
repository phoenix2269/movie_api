const express = require('express'),
    morgan = require('morgan');
//    fs = require('fs'),
//    path = require('path');
const app = express();
// create a write stream (in append mode)
// a 'log.txt file is created in root directory
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('common'));
//app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something borke!');
});

app.get('/', (req, res) => {
    res.send('Top 10 Movies');
});

app.get('/movies', (req, res) => {
    res.json();
});

app.get('/documentation.html', (req, res) => {
    res.send('Top 10 Movies');
});

// Listener
app.listen(8080, () => {
    console.log('App is listening on port 8080.');
});