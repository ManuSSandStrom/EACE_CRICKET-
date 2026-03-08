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

    const horizontalImages = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983590/20250112_080800_wy4o03.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20251007-WA0062.jpg_posje4.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/20250120_075913_bbzplc.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20250514-WA0018.jpg_vwivci.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251228-WA0018.jpg_f6fiae.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251004-WA0107.jpg_cf5ole.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250112_080002_ibkk6a.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250131_181446_kod0mu.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983582/20250115_104502_etdidx.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250428_142449_mdlyzp.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20250630_180140_qeldst.heic"
    ];

    const netPractice = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983578/20241122_181744.jpg_y5xwvc.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983579/20250212_184753_attre2.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/WhatsApp_Image_2026-03-08_at_8.29.57_PM_yd2zyx.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250620_170140_edif9u.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983573/20241122_181409.jpg_pcoaxl.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20250812_194415_dbth4l.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20241122_180325.jpg_pw9vgs.jpg"
    ];

    const instaImages = [
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983581/20250120_093312_0_viaofp.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251230-WA0055.jpg_rlrw9z.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983584/20250620_170147_o4x6hf.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20241122_175017.jpg_nvelni.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20250812_194421_iuofre.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983571/20241214_112403.jpg_s5opyo.jpg",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983568/20250513_194840_bpgbul.heic",
      "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983567/20250112_080036_ltwivm.heic"
    ];

    const instaVideos = [
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983627/20250626_090239_pdbdzr.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983655/20250131_181911_qcqwvo.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983662/20251028_181703_fcl1oq.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983632/20241128_182310_gzfiwo.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983620/20250624_181326_f1rv8h.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983606/20241128_182059_n7jmz0.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983460/20250624_181326_exfrhf.mp4"
    ];

    const youtubeList = [
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983657/20251006_185248_ltmxs4.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983562/VID-20250603-WA0019_c72hkl.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983595/20250807_200413_wtrqeg.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983602/20251006_185341_1_s4lwin.mp4",
      "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983616/20250624_181349_jn8myn.mp4"
    ];

    const galleryData = [
      ...horizontalImages.map((url, i) => ({
        title: `Match Moment ${i + 1}`,
        category: 'Matches',
        imageUrl: formatUrl(url),
      })),
      ...netPractice.map((url, i) => ({
        title: `Net Practice ${i + 1}`,
        category: 'Practice',
        imageUrl: formatUrl(url),
      })),
      ...instaImages.map((url, i) => ({
        title: `Insta Highlight ${i + 1}`,
        category: 'Events',
        imageUrl: formatUrl(url),
      })),
      ...instaVideos.map((url, i) => ({
          title: `Action Reel ${i + 1}`,
          category: 'Events',
          imageUrl: formatUrl(url),
      }))
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
