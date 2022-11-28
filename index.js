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

  // Get date in milliseconds and store it into a variable
  let dateNumber = +req.params.date
  console.log(dateNumber);
  console.log(typeof(dateNumber));

  // Get full date using the dateNumber variable
  let myDate = new Date(dateNumber);
  console.log(myDate);

  // Check if dateNumber is valid
  if (typeof(dateNumber) === "number") {

    console.log("valid input")
  } else {
    // If input date string is invalid
    res.json({error : "Invalid Date"});
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
