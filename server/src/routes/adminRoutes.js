import { Router } from 'express';
import { authGuard } from '../middleware/authMiddleware.js';
import {
  upload,
  uploadGalleryImage,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createVideo,
  updateVideo,
  deleteVideo,
  updateHomeContent,
} from '../controllers/adminController.js';
import { getLeads, updateLead } from '../controllers/leadController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(authGuard);

router.post('/gallery/upload', upload.single('image'), uploadGalleryImage);
router.post('/gallery', asyncHandler(createGalleryItem));
router.put('/gallery/:id', asyncHandler(updateGalleryItem));
router.delete('/gallery/:id', asyncHandler(deleteGalleryItem));

router.post('/testimonials', asyncHandler(createTestimonial));
router.put('/testimonials/:id', asyncHandler(updateTestimonial));
router.delete('/testimonials/:id', asyncHandler(deleteTestimonial));

router.post('/videos', asyncHandler(createVideo));
router.put('/videos/:id', asyncHandler(updateVideo));
router.delete('/videos/:id', asyncHandler(deleteVideo));

router.put('/home-content', asyncHandler(updateHomeContent));

router.get('/leads', asyncHandler(getLeads));
router.patch('/leads/:id', asyncHandler(updateLead));

export default router;
