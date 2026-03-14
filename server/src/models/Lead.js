import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    age: { type: Number },
    location: { type: String, trim: true, default: '' },
    type: {
      type: String,
      enum: ['new_student', 'plan', 'trial', 'school', 'contact', 'whatsapp', 'general'],
      default: 'general',
    },
    source: { type: String, trim: true, default: '' },
    planId: { type: String, trim: true, default: '' },
    planName: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'verified', 'closed'],
      default: 'new',
    },
    verified: { type: Boolean, default: false },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
);

leadSchema.index({ type: 1, status: 1, createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);
