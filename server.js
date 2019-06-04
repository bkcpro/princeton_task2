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

  const ip = '::ffff:10.52.13.4';

  let ipv4 = ip.match(/^([0-9A-Fa-f]{0,4}:){2,7}([0-9A-Fa-f]{1,4}$|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})$/);

  console.log(ip.match(/\b::ffff:\s+\K\S+/g));

  const text = req.body.message;

  var message = new Message({
    content: text,
    source_ip: ipv4[2],
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

app.post('/getmessages', (req, res) => {

  let limit = Number(req.body.limit);
  let page = Number(req.body.page);

  console.log(req.body);

  console.log(page, typeof page, limit, typeof limit);

  if(limit>100) limit = 100;

  Message.find().skip((page-1)*100).limit(limit).then((messages) => {
    res.send(messages);
  }, (err) => {
    res.status(400).send(err);
  });


  // Message.find().then((messages) => {
  //   res.send(messages);
  // }, (err) => {
  //   res.status(400).send(err);
  // });
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
