const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
