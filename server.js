const express = require('express');
const app = express();
const HTTP_PORT = 8080;

const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


// Simple storage server side of the data
const quoteData = [
  {
    author: 'JK Rowling',
    quote: 'It takes a great deal of courage to stand up to your enemies, but even more to stand up to your friends.',
  },
  {
    author: 'Malala Yousafzai',
    quote: 'We realize the importance of our voices only when we are silenced.',
  },
  {
    author: 'Alice Walker',
    quote: 'The most common way people give up their power is by thinking they don’t have any.',
  },
]

// Get the Quote Data
app.get('/quotes', function (req, res) {
  res.send({
    success: true,
    quotes: quoteData,
  });
});


// Add New Quotes
app.post('/addQuotes', function (req, res) {
  quoteData.push(req.body);

  res.send({
    success: true,
    quotes: quoteData,
  });
});

app.listen(HTTP_PORT);
console.log('Listening on port: ' + HTTP_PORT + ' -- Open http://localhost:' + HTTP_PORT);
