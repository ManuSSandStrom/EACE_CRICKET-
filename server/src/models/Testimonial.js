import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatarUrl: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
