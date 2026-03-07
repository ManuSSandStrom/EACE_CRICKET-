import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Matches', 'Practice', 'Events', 'Tournaments'],
      required: true,
    },
    imageUrl: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true },
);

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
