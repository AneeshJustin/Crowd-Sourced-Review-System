const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { postId, rating, comment } = req.body;
    const review = new Review({ postId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByPost = async (req, res) => {
  const reviews = await Review.find({ postId: req.params.postId }).sort({ createdAt: -1 });
  res.json(reviews);
};

exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.findByIdAndUpdate(req.params.id, { rating, comment }, { new: true });
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review deleted' });
};
