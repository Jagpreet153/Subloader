const cloudinary = require("cloudinary").v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Replicate = require('replicate')
const Video = require('../models/videos');
const { writeFile, unlink, mkdir } = require('fs').promises;
const fs = require('fs');
const path = require('path');
const axios = require('axios'); 


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
    let tempFilePath = null;
    
    try {
        const videoId = req.params.id;

        const existingVideo = await Video.findById(videoId);
        if (!existingVideo) {
            return res.status(404).json({ error: "Video not found" });
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const input = {
            video_file_input: existingVideo.file_url,
        };
        console.log("Input video URL:", existingVideo.file_url);

        const output = await replicate.run(
            "fictions-ai/autocaption:18a45ff0d95feb4449d192bbdc06b4a6df168fa33def76dfc51b78ae224b599b",
            { input }
        );

        console.log("Replicate Output:", output);

        const tempDir = path.join(process.cwd(), 'tmp', 'captions');
        await mkdir(tempDir, { recursive: true });

        if (Array.isArray(output) && output.length > 0) {
            // Download the file from the URL
            const response = await axios({
                method: 'get',
                url: output[0],
                responseType: 'arraybuffer'
            });

            tempFilePath = path.join(tempDir, 'output.mp4');
            
            // Write the downloaded file
            await writeFile(tempFilePath, response.data);
            console.log("File written successfully");

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "video",
                folder: "captions",
            });

            // Update video document
            const updatedVideo = await Video.findByIdAndUpdate(
                videoId,
                { caption_url: result.secure_url },
                { new: true, runValidators: true }
            );

            // Clean up
            await unlink(tempFilePath);

            return res.status(200).json({
                success: true,
                data: updatedVideo,
            });
        }

    } catch (error) {
        console.error("Error processing video with Replicate:", error);
        
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                await unlink(tempFilePath);
            } catch (unlinkError) {
                console.error("Error deleting temporary file:", unlinkError);
            }
        }
        
        return res.status(500).json({
            success: false,
            message: "Failed to process video with Replicate",
            error: error.message
        });
    }
};


module.exports = { uploadVideo, uploadCaptionVideo };