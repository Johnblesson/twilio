const express = require('express');
const { urlencoded } = require('body-parser');
const twilio = require('twilio');
const path = require('path'); // Import the 'path' module
require('dotenv').config();

const app = express();

// Twilio credentials
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// Create a Twilio client
const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send-whatsapp', (req, res) => {
  const { to, message } = req.body;

  // Use the Twilio client to send a WhatsApp message
  client.messages
    .create({
      body: message,
      from:'+18564573149',
      to:`${to}`
    })
    .then((message) => {
      console.log(`Message sent: ${message.sid}`);
      res.send('Message sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending message');
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
