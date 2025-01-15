'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'video/mp4') {
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size exceeds 100MB limit');
        setFile(null);
        setPreviewUrl('');
        return;
      }
      setFile(selectedFile);
      setError('');
      setUploadedVideo(null);
      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setError('Please select a valid MP4 video file');
      setFile(null);
      setPreviewUrl('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    if (caption.trim()) {
      formData.append('caption', caption.trim());
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v2/uploadVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      setUploadedVideo(response.data.video);


      
      // Clear the form
      setFile(null);
      setPreviewUrl('');
      setCaption('');
      
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to upload video';
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleUpload} className="space-y-4">
        {/* File Input */}
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <label className="block">
            <span className="sr-only">Choose MP4 video file</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              accept="video/mp4"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">Maximum file size: 100MB</p>
        </div>

        {/* Caption Input */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
            Caption (optional)
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm
              p-2 border"
            placeholder="Add a caption for your video"
            disabled={uploading}
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mt-4">
            <video
              className="w-full rounded-lg"
              src={previewUrl}
              controls
            />
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="w-full">
            <div className="bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">{uploadProgress}%</p>
          </div>
        )}

        {/* Upload Success */}
        {uploadedVideo && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-600 font-medium">Upload successful!</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Video ID: {uploadedVideo.id}</p>
              <p className="break-all">URL: {uploadedVideo.file_url}</p>
              {uploadedVideo.caption && (
                <p>Caption: {uploadedVideo.caption}</p>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${!file || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;