export const toEmbedUrl = (url) => {
  if (!url) return '';

  if (url.includes('youtube.com/embed/')) {
    return url;
  }

  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);

  if (!match) return url;

  return `https://www.youtube.com/embed/${match[1]}`;
};
