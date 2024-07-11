const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); //import all the .env data

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Determine the public path based on the environment
const publicPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../public_html') //use speicfic path for production
    : path.join(__dirname, '../client/dist'); // or use local dev path

// Serve static files from the determined public path
app.use(express.static(publicPath));

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { senderEmail, subject, message } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `From: ${senderEmail}\n\n${message}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Email sent successfully'); // Explicitly set status 200 for successful requests
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

// Catch-all route to serve the frontend application
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Listen on '0.0.0.0' to accept connections from any IP address (useful for both development and production)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
