const mongoose = require("mongoose");

const appointmentschema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});
const appointment = mongoose.model("appointment", appointmentschema);
module.exports = appointment;
