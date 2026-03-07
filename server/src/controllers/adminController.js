import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { GalleryItem } from '../models/GalleryItem.js';
import { Testimonial } from '../models/Testimonial.js';
import { Video } from '../models/Video.js';
import { SiteContent } from '../models/SiteContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage });

export const uploadGalleryImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image is required' });
  }

  return res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
};

export const createGalleryItem = async (req, res) => {
  const item = await GalleryItem.create(req.body);
  res.status(201).json(item);
};

export const updateGalleryItem = async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  return res.json(item);
};

export const deleteGalleryItem = async (req, res) => {
  const item = await GalleryItem.findByIdAndDelete(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  return res.json({ message: 'Deleted' });
};

export const createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  return res.json(testimonial);
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ message: 'Testimonial not found' });
  }
  return res.json({ message: 'Deleted' });
};

export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
};

export const updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  return res.json(video);
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  return res.json({ message: 'Deleted' });
};

export const updateHomeContent = async (req, res) => {
  const content = await SiteContent.findOneAndUpdate(
    { key: 'homepage' },
    { data: req.body },
    { upsert: true, new: true },
  );

  res.json(content.data);
};
