const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Movies', 'Electronics', 'Hotels', 'Vehicles', 'Restaurants'],
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
