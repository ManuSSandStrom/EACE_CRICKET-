import { Router } from 'express';
import {
  getHomeContent,
  getGallery,
  getTestimonials,
  getVideos,
  getContact,
} from '../controllers/publicController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/home-content', asyncHandler(getHomeContent));
router.get('/gallery', asyncHandler(getGallery));
router.get('/testimonials', asyncHandler(getTestimonials));
router.get('/videos', asyncHandler(getVideos));
router.get('/contact', getContact);

export default router;
