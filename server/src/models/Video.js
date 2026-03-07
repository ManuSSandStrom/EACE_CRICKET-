import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Video = mongoose.model('Video', videoSchema);
