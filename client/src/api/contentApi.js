import api from './http.js';

export const getHomeContent = async () => {
  const { data } = await api.get('/public/home-content');
  return data;
};

export const getGallery = async (category = 'All') => {
  const { data } = await api.get('/public/gallery', { params: { category } });
  return data;
};

export const getTestimonials = async () => {
  const { data } = await api.get('/public/testimonials');
  return data;
};

export const getVideos = async () => {
  const { data } = await api.get('/public/videos');
  return data;
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
