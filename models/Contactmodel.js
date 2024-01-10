const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String },
  message: { type: String },
}, { timestamps: true });

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;
