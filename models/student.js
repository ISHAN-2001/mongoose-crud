const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  age: Number,
  address : String
});

module.exports = mongoose.model("Student",studentSchema);