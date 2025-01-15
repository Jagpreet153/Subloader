const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Video = require('../models/videos');

require("dotenv").config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Create the storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'videos',
      resource_type: 'video',
      allowed_formats: ['mp4'],
    }
});

// Create multer upload instance - notice the field name 'video'
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
}).single('file');  // IMPORTANT: The field name must be 'video'

const uploadVideo = async (req, res) => {
    // Wrap multer in a promise to handle errors better
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const video = new Video({
            file_url: req.file.path,
            caption: req.body.caption || null
        });

        await video.save();

        res.status(200).json({
            message: 'Video uploaded successfully',
            video: {
                id: video._id,
                file_url: video.file_url,
                caption: video.caption
            }
        });

    } catch (error) {
        console.error('Error uploading video:', error);
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: `Upload error: ${error.message}` });
        }
        res.status(500).json({ error: 'Failed to upload video' });
    }
};

const uploadCaptionVideo = async (req, res) => {
    // Wrap multer in a promise to handle errors better
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });

        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const videoId = req.params.id;

        // Validate if video exists
        const existingVideo = await Video.findById(videoId);
        if (!existingVideo) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Update the caption
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            {
                caption: req.file ? req.file.path : null
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedVideo
        });

    } catch (error) {
        console.error('Error uploading video:', error);
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: `Upload error: ${error.message}` });
        }
        res.status(500).json({ error: 'Failed to upload video' });
    }
};

module.exports = { uploadVideo, uploadCaptionVideo };