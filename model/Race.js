const mongoose = require('mongoose');

const raceSchema = new mongoose.Schema({
  raceName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  raceNumber: {
    type: Number,
    required: true,
  },
  raceWinner: {
    type: String,
    required: true,
  },
  driverOfTheDay: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Race', raceSchema);
