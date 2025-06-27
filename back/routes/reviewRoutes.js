const express = require('express');
const router = express.Router();
const { addReview, getReviewsByPost, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/', addReview);
router.get('/:postId', getReviewsByPost);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
