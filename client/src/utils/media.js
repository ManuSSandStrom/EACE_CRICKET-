const CLOUDINARY_IMAGE_SEGMENT = '/image/upload/';

export const optimizeCloudinaryImage = (url, width = 1200) => {
  if (typeof url !== 'string') return '';

  const source = url.trim();
  if (!source) return '';

  if (!source.includes(CLOUDINARY_IMAGE_SEGMENT)) return source;
  if (source.includes('/image/upload/f_')) return source;

  return source.replace(
    CLOUDINARY_IMAGE_SEGMENT,
    `/image/upload/f_auto,q_auto,w_${width},c_limit/`,
  );
};
