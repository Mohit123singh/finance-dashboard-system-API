const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
     
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
    category: String,
    date: {
      type: Date,
      default: Date.now
    },
    notes: String,
    user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model('Record', recordSchema);