# Subloader

This application allows users to upload videos, automatically generate captions for them, and download the captioned video. It uses Next.js for the frontend, Node.js for the backend, MongoDB for database management, Cloudinary and Uploadcare for video uploads, and the Replicate API for video captioning.

---

## Features

- **Upload Videos**: Users can upload videos via Cloudinary or Uploadcare.
- **Generate Captions**: Once the video is uploaded, the system uses Replicate API to generate captions for the video.
- **Database Integration**: The app stores video metadata (including the Cloudinary URL) in MongoDB.
- **Video Playback**: After captioning, users can preview the video with captions.
- **Convert Video**: Users can click a "Convert" button after upload to generate captioned videos.

---

## Tech Stack

- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: MongoDB
- **Video Upload Services**: Cloudinary, Uploadcare
- **Caption Generation**: Replicate API
- **Deployment**: [Deployment Options (e.g., Vercel, Heroku, etc.)]

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jagpreet153/Subloader.git
cd video-caption-generator
```
### 2. Install dependencies(Frontend)
```bash
cd client
npm install
```

### 3. Install dependencies(Backend)
```bash
cd server
npm install
```

### 4. Environment variables(Frontend)
```bash
NEXT_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_REPLICATE_API_TOKEN
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
```

### 5. Environment variables(Backend)
```bash
PORT
DATABASE_URL 
CLOUD_NAME
API_KEY
API_SECRET
REPLICATE_API_TOKEN
```
### 6. Start frontend
```bash
cd client
npm run dev
```
### 7. Start backend
```bash
cd server
npm run dev
```








