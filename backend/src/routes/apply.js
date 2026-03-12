const router = require('express').Router();
const nodemailer = require('nodemailer');
const Application = require('../models/Application');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

router.post('/', async (req, res) => {
  try {
    const app = await Application.create(req.body);

    // Notify admin
    transporter.sendMail({
      from: `"CollabYou" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Application — ${app.fullName} (${app.platform})`,
      html: `
        <h2>New Creator Application</h2>
        <p><b>Name:</b> ${app.fullName}</p>
        <p><b>Email:</b> ${app.email}</p>
        <p><b>Phone:</b> ${app.phone}</p>
        <p><b>Location:</b> ${app.location}</p>
        <p><b>Platform:</b> ${app.platform} — ${app.handle}</p>
        <p><b>Profile:</b> <a href="${app.profileUrl}">${app.profileUrl}</a></p>
        <p><b>Followers:</b> ${app.followers}</p>
        <p><b>Niche:</b> ${app.niche}</p>
        <p><b>Engagement:</b> ${app.engagement}</p>
      `
    }).catch(err => console.error('Email error:', err.message));

    // Confirm to applicant
    transporter.sendMail({
      from: `"CollabYou" <${process.env.SMTP_USER}>`,
      to: app.email,
      subject: 'Application Received — CollabYou',
      html: `
        <h2>Hi ${app.fullName},</h2>
        <p>We've received your application to the CollabYou Creator Network.</p>
        <p>Our team will review your profile and get back to you within <b>48 hours</b>.</p>
        <br/>
        <p>— The CollabYou Team</p>
      `
    }).catch(err => console.error('Email error:', err.message));

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
