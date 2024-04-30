const User = require('../models/User');

exports.charge = async (req, res) => {
  const { name, address, email, amount } = req.body;

  try {
    // Save user information to the database
    const user = new User({
      name,
      address,
      email,
      amount,
    });
    await user.save();

    // Process payment using Stripe
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      description: 'Payment for order',
    });

    // Handle successful payment
    res.status(200).json({ success: true, message: 'Payment successful', paymentIntent });
  } catch (error) {
    // Handle payment failure
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
};
