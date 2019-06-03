const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/sendmessage', (req, res) => {

  const ip = req.connection.remoteAddress;
  var message = req.body;

  res.send({ip, message});
});

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// });

app.get('/getMessage', (request, response) => {
  res
});


app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {app};
