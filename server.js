const express = require('express');
const bodyParser = require('body-parser');
var ipaddr = require('ipaddr.js');

const {mongoose} = require('./db/mongoose');
const {Message} = require('./models/message_format.js');

var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/sendmessage', (req, res) => {

  const ip_temp = ipaddr.parse(req.connection.remoteAddress);
  const ip = ipaddr.fromByteArray(ip_temp).toString();

  const text = req.body.message;

  var message = new Message({
    content: text,
    source_ip: ip,
  });

  message.timeStamp = message._id.getTimestamp().toISOString();

  // console.log(message);

  message.save().then((result) => {
    // res.send(result);
  }, (err) => {
    res.send(err);
  });

  // console.log(message.content, message.source_ip, message._id.getTimestamp());

  // res.send({ip, message});
});

app.get('/getmessages', (req, res) => {

  Message.find().then((messages) => {
    res.send(messages);
  }, (err) => {
    res.status(400).send(e);
  });
});

app.post('/deletemessages', (req, res) => {

  Message.deleteMany().then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
});


app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {app};
