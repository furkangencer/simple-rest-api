let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Record = new Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  createdAt: {
    type: Date
  },
  counts: {
    type: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Record', Record);