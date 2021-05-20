const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  jobTitle: String,
  role: String,
  organisation: String,
  department: String,
  email: String,
  phoneWork: String,
  phoneMobile: String,
  location: String,
});

module.exports = mongoose.model("Person", personSchema);
