// const subscribeModel = require('../models/subscribeModel'); // Import the model
// const nodemailer = require('nodemailer'); // Import Nodemailer

// // Controller to handle email subscription
// exports.subscribeEmail = async (req, res) => {
//   const { email } = req.body; // Get email from the request body

//   try {
//     // Call the model to insert the email into the database
//     const result = await subscribeModel.addSubscription(email);

//     // Send a confirmation email to the subscriber
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail', // Use your email provider (e.g., Gmail, Outlook)
//       auth: {
//         user: process.env.EMAIL_USER, // Your email address
//         pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Sender's email address
//       to: email, // Recipient's email address
//       subject: 'Thank you for subscribing!',
//       html: `
//         <div style="display: flex;flex-direction: row;justify-content: center;">
//     <div style="background:linear-gradient(45deg,#66CC66,#17BE81);padding: 10px;border-radius: 10px;max-width: 500px;">
//        <p style="font-size: 20px;border-bottom:2px solid #fff"><b>Thank you for subscribing to our newsletter!</b><p> 
//        <p>We are delighted to have you as part of our community.</p>
//        <p>We’re committed to delivering valuable information that supports your goals and keeps you informed.</p>
//        <p>We look forward to connecting with you.</p>
//     </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     // Respond with success if the email was successfully inserted and email sent
//     return res.status(200).json({ message: 'Subscription successful and email sent', result });
//   } catch (error) {
//     // Handle errors and respond with a failure message
//     return res.status(500).json({ message: 'Error storing email or sending email', error });
//   }
// };



const subscribeModel = require('../models/subscribeModel');
const nodemailer = require('nodemailer');

// Subscribe to email
exports.subscribeEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await subscribeModel.addSubscription(email);

    // Send a confirmation email to the subscriber
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for subscribing!',
      html: `
        <div style="display: flex;flex-direction: row;justify-content: center;">
    <div style="background-color: #17BE81;padding: 10px;border-radius: 10px;max-width: 500px;">
       <p style="font-size: 20px;border-bottom:2px solid #fff"><b>Thank you for subscribing to our newsletter!</b><p> 
       <p>We are delighted to have you as part of our community.</p>
       <p>We’re committed to delivering valuable information that supports your goals and keeps you informed.</p>
       <p>We look forward to connecting with you.</p>
    </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Subscription successful and email sent', result });
  } catch (error) {
    return res.status(500).json({ message: 'Error storing email or sending email', error });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscribeModel.getAllSubscriptions();
    return res.status(200).json({ message: 'Subscriptions retrieved successfully', subscriptions });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving subscriptions', error });
  }
};

// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await subscribeModel.getSubscriptionById(id);

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    return res.status(200).json({ message: 'Subscription retrieved successfully', subscription });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving subscription', error });
  }
};