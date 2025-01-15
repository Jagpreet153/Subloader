const express = require('express');
const router = express.Router();
const { uploadVideo, uploadCaptionVideo } = require('../controllers/uploadVideo');

router.post('/uploadVideo', uploadVideo);  // No need for middleware here anymore
router.put('/uploadCaptionVideo/:id', uploadCaptionVideo);  // No need for middleware here anymore

module.exports = router;