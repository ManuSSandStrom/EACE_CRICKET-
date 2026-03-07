import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const SiteContent = mongoose.model('SiteContent', siteContentSchema);
