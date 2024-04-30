const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');
const routes = require('./routes/payment');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const stripeClient = stripe(stripeSecretKey);

app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
