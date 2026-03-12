const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true, lowercase: true },
  phone:       { type: String, required: true, trim: true },
  location:    { type: String, required: true, trim: true },
  platform:    { type: String, required: true },
  handle:      { type: String, required: true, trim: true },
  profileUrl:  { type: String, required: true, trim: true },
  followers:   { type: String, required: true },
  niche:       { type: String, required: true },
  engagement:  { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  notes:       { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
