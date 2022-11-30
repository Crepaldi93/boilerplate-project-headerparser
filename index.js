// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Respond to requests at /api/:date?
app.get('/api/:date?', function (req, res) {
  // Check if input is a valid date
  if (Date.parse(req.params.date)) {
    let dateInMilliseconds = Date.parse(req.params.date);
    let myDate = new Date(dateInMilliseconds);
    let myDateString = myDate.toGMTString();
    
    // Respond if input is a valid date
    res.json({unix: dateInMilliseconds, utc: myDateString})
  
  // Check if input is a number  
  } else if (!isNaN(req.params.date)) {
    let dateInMilliseconds = +req.params.date;
    let myDate = new Date(dateInMilliseconds);
    let myDateString = myDate.toGMTString();

    // Respond if input is a number
    res.json({unix: dateInMilliseconds, utc: myDateString})
  
    // Check if date provided is empty
  } else if (!req.params.date) {
    let currentDate = new Date();
    let dateInMilliseconds = Date.parse(currentDate);
    let myDateString = currentDate.toGMTString();

    // Respond if input is an empty date
    res.json({unix: dateInMilliseconds, utc: myDateString})
  
    // Input is invalid
  } else {
    res.json({error: "Invalid Date"})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
