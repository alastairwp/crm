const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: String,
  organisation: String,
  department: String,
  email: String,
  phoneWork: String,
  phoneMobile: String,
});

module.exports = mongoose.model("Person", personSchema);
