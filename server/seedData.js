import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env 
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import { GalleryItem } from './src/models/GalleryItem.js';
import { Video } from './src/models/Video.js';

const formatUrl = url => url.replace(/\.heic$/i, '.jpg');

const seedGallery = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing
    await GalleryItem.deleteMany({});
    await Video.deleteMany({});
    console.log('Cleared existing gallery and video data');

    const matchImages = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983590/20250112_080800_wy4o03.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20251007-WA0062.jpg_posje4.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/20250120_075913_bbzplc.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20250514-WA0018.jpg_vwivci.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251228-WA0018.jpg_f6fiae.jpg"
    ];

    const eventImages = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251004-WA0107.jpg_cf5ole.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250112_080002_ibkk6a.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250131_181446_kod0mu.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983582/20250115_104502_etdidx.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250428_142449_mdlyzp.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20250630_180140_qeldst.heic",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983562/VID-20250603-WA0019_c72hkl.mp4"
    ];

    const netPracticeImages = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983578/20241122_181744.jpg_y5xwvc.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983579/20250212_184753_attre2.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/WhatsApp_Image_2026-03-08_at_8.29.57_PM_yd2zyx.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250620_170140_edif9u.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983573/20241122_181409.jpg_pcoaxl.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20250812_194415_dbth4l.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20241122_180325.jpg_pw9vgs.jpg"
    ];

    const practiceImages = netPracticeImages.slice(0, 4);
    const tournamentImages = netPracticeImages.slice(4);

    const youtubeList = [
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983657/20251006_185248_ltmxs4.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983562/VID-20250603-WA0019_c72hkl.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983595/20250807_200413_wtrqeg.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983602/20251006_185341_1_s4lwin.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983616/20250624_181349_jn8myn.mp4"
    ];

    const galleryData = [
      ...matchImages.map((url, i) => ({
        title: `Match Moment ${i + 1}`,
        category: 'Matches',
        imageUrl: formatUrl(url),
      })),
      ...practiceImages.map((url, i) => ({
        title: `Practice Session ${i + 1}`,
        category: 'Practice',
        imageUrl: formatUrl(url),
      })),
      ...eventImages.map((url, i) => ({
        title: `Event Highlight ${i + 1}`,
        category: 'Events',
        imageUrl: formatUrl(url),
      })),
      ...tournamentImages.map((url, i) => ({
        title: `Tournament Net Session ${i + 1}`,
        category: 'Tournaments',
        imageUrl: formatUrl(url),
      })),
      {
        title: 'Sri Sai School Campus',
        category: 'School',
        imageUrl: formatUrl("https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/Sri_sai_school_image_bd7pqw.jpg"),
      }
    ];

    await GalleryItem.insertMany(galleryData);

    const videoData = youtubeList.map((url, i) => ({
      title: i === 0 ? 'Featured EACE Showcase' : `Match Highlight ${i}`,
      youtubeUrl: url,
      featured: i === 0,
    }));

    await Video.insertMany(videoData);
    
    console.log('Successfully seeded database!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedGallery();
