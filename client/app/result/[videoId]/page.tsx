"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface VideoResponse {
  data: {
    videoId?: string;
    file_url?: string;
    caption_url?: string;  
  };
}

interface PageProps {
  params: Promise<{ videoId: string }>;
}

const VideoIdPage = ({ params }: PageProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideoDetails() {
      try {
        // Await the params promise to get the videoId
        const resolvedParams = await params;
        
        // Fetch video details using the resolved videoId
        const response = await axios.put<VideoResponse>(
          `http://localhost:3002/api/v2/uploadCaptionVideo/${resolvedParams.videoId}`
        );

        // Set the caption URL if the response is successful
        if (response.data && response.data.data.caption_url) {
          setVideoUrl(response.data.data.caption_url);
        } else {
          throw new Error("Caption URL not found.");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || "Failed to load video details.");
        } else {
          setError("Failed to load video details.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVideoDetails();
  }, [params]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-blue-600 font-medium text-lg">
            Processing your video, please wait...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-500 font-semibold text-lg">{`Error: ${error}`}</p>
      </div>
    );
  }

  // Render the video
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Captioned Video</h1>
      {videoUrl ? (
        <div className="w-full max-w-2xl">
          <div className="relative shadow-lg rounded-lg overflow-hidden">
            <video controls className="w-full h-auto rounded-md">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 text-center">
              🎉 Your captioned video is ready! Feel free to download or share.
            </p>
            <p className="text-gray-700 text-center">
              Feel free to share 🥳
              <span>{videoUrl}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No captioned video available</p>
      )}
    </div>
  );
};

export default VideoIdPage;