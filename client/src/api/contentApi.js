import api from './http.js';

export const getHomeContent = async () => {
  const { data } = await api.get('/public/home-content');
  return data;
};

export const getGallery = async (category = 'All') => {
  const horizontalImages = [
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983590/20250112_080800_wy4o03.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20251007-WA0062.jpg_posje4.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/20250120_075913_bbzplc.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983586/IMG-20250514-WA0018.jpg_vwivci.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251228-WA0018.jpg_f6fiae.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251004-WA0107.jpg_cf5ole.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250112_080002_ibkk6a.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/20250131_181446_kod0mu.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983582/20250115_104502_etdidx.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250428_142449_mdlyzp.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20250630_180140_qeldst.jpg",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983562/VID-20250603-WA0019_c72hkl.mp4"
  ];
  const netPractice = [
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983578/20241122_181744.jpg_y5xwvc.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983579/20250212_184753_attre2.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983583/WhatsApp_Image_2026-03-08_at_8.29.57_PM_yd2zyx.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983577/20250620_170140_edif9u.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983573/20241122_181409.jpg_pcoaxl.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20250812_194415_dbth4l.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983570/20241122_180325.jpg_pw9vgs.jpg"
  ];
  const instaImages = [
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983627/20250626_090239_pdbdzr.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983655/20250131_181911_qcqwvo.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983662/20251028_181703_fcl1oq.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983632/20241128_182310_gzfiwo.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983620/20250624_181326_f1rv8h.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983606/20241128_182059_n7jmz0.mp4",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983581/20250120_093312_0_viaofp.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983585/IMG-20251230-WA0055.jpg_rlrw9z.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983584/20250620_170147_o4x6hf.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20241122_175017.jpg_nvelni.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983574/20250812_194421_iuofre.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983571/20241214_112403.jpg_s5opyo.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983568/20250513_194840_bpgbul.jpg",
    "https://res.cloudinary.com/dt37ji5yp/image/upload/v1772983567/20250112_080036_ltwivm.jpg"
  ];
  
  const galleryData = [
    ...horizontalImages.map((url, i) => ({ _id: `match-${i}`, title: `Match Moment ${i + 1}`, category: 'Matches', imageUrl: url })),
    ...netPractice.map((url, i) => ({ _id: `prac-${i}`, title: `Practice ${i + 1}`, category: 'Practice', imageUrl: url })),
    ...instaImages.map((url, i) => ({ _id: `eve-${i}`, title: `Event ${i + 1}`, category: 'Events', imageUrl: url }))
  ];

  if (category === 'All') return galleryData;
  return galleryData.filter(d => d.category === category);
};

export const getTestimonials = async () => {
  const { data } = await api.get('/public/testimonials');
  return data;
};

export const getVideos = async () => {
  const youtubeList = [
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983657/20251006_185248_ltmxs4.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983562/VID-20250603-WA0019_c72hkl.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983595/20250807_200413_wtrqeg.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983602/20251006_185341_1_s4lwin.mp4",
    "https://res.cloudinary.com/dt37ji5yp/video/upload/v1772983616/20250624_181349_jn8myn.mp4"
  ];
  
  return youtubeList.map((url, i) => ({
    _id: `vid-${i}`,
    title: i === 0 ? 'Featured Showcase Match' : `Highlight Clip ${i}`,
    youtubeUrl: url,
    featured: i === 0,
  }));
};

export const getContact = async () => {
  const { data } = await api.get('/public/contact');
  return data;
};

export const askAssistant = async (message) => {
  const { data } = await api.post('/assistant/chat', { message });
  return data.reply;
};

export const loginAdmin = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const uploadGalleryImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post('/admin/gallery/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.imageUrl;
};

export const createGalleryItem = async (payload) => {
  const { data } = await api.post('/admin/gallery', payload);
  return data;
};

export const deleteGalleryItem = async (id) => {
  await api.delete(`/admin/gallery/${id}`);
};

export const createTestimonial = async (payload) => {
  const { data } = await api.post('/admin/testimonials', payload);
  return data;
};

export const deleteTestimonial = async (id) => {
  await api.delete(`/admin/testimonials/${id}`);
};

export const createVideo = async (payload) => {
  const { data } = await api.post('/admin/videos', payload);
  return data;
};

export const deleteVideo = async (id) => {
  await api.delete(`/admin/videos/${id}`);
};

export const updateHomeContent = async (payload) => {
  const { data } = await api.put('/admin/home-content', payload);
  return data;
};
