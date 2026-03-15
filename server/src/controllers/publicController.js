import { GalleryItem } from '../models/GalleryItem.js';
import { Testimonial } from '../models/Testimonial.js';
import { Video } from '../models/Video.js';
import { SiteContent } from '../models/SiteContent.js';

const defaultHomeData = {
  heroHeadline: 'Train Like a Champion. Perform Like a Legend.',
  heroSubheading: 'Karnataka State Cricket Association Affiliated Academy',
  stats: [
    { label: 'Students Trained', value: 1200 },
    { label: 'State Selections', value: 90 },
    { label: 'Certified Coaches', value: 12 },
    { label: 'Years of Excellence', value: 10 },
  ],
  programs: [
    'Foundation Cricket Program',
    'Advanced Skill Development',
    'Elite Match Simulation',
    'Strength & Conditioning',
  ],
  coaches: [
    { name: 'Coach Arjun Rao', expertise: 'Batting Excellence' },
    { name: 'Coach Vivek Sharma', expertise: 'Fast Bowling Unit' },
    { name: 'Coach Manish R', expertise: 'Spin & Tactical Control' },
  ],
  facilities: [
    'International standard turf wickets',
    'Video analytics bays',
    'High performance fitness zone',
    'Floodlit net sessions',
  ],
};

const getOrCreateHomeContent = async () => {
  let homeContent = await SiteContent.findOne({ key: 'homepage' });
  if (!homeContent) {
    homeContent = await SiteContent.create({ key: 'homepage', data: defaultHomeData });
  }
  return homeContent;
};

const categoryRegexMap = {
  matches: /^match/i,
  practice: /^practice/i,
  events: /^event/i,
  tournaments: /^tournam?e?n?t(s)?/i,
};

const resolveCategoryFilter = (rawCategory) => {
  const value = String(rawCategory || '').trim().toLowerCase();
  if (!value || value === 'all') return null;

  if (value.startsWith('match')) return categoryRegexMap.matches;
  if (value.startsWith('practice')) return categoryRegexMap.practice;
  if (value.startsWith('event')) return categoryRegexMap.events;
  if (value.startsWith('tournament') || value.startsWith('tournamenst')) return categoryRegexMap.tournaments;

  return null;
};

export const getHomeContent = async (_req, res) => {
  const content = await getOrCreateHomeContent();
  res.json(content.data);
};

export const getGallery = async (req, res) => {
  const categoryRegex = resolveCategoryFilter(req.query.category);
  const filter = categoryRegex ? { category: { $regex: categoryRegex } } : {};
  const gallery = await GalleryItem.find(filter).sort({ createdAt: -1 });
  res.json(gallery);
};

export const getTestimonials = async (_req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
};

export const getVideos = async (_req, res) => {
  const videos = await Video.find().sort({ featured: -1, createdAt: -1 });
  res.json(videos);
};

export const getContact = (_req, res) => {
  const contactPhone = process.env.CONTACT_PHONE || '8123149416';
  const contactEmail = process.env.CONTACT_EMAIL || 'manoharbasappagari18@gmail.com';

  res.json({
    address: 'Begur-Koppa Road, Yelenahalli, Bangalore - 560068',
    phones: [contactPhone],
    whatsapp: contactPhone,
    email: contactEmail,
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8348110298252!2d77.6209007!3d12.8539437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6be1569c05b1%3A0x1b663a1502e07cc6!2sEkalavya%20academy%20of%20cricket%20excellence(EACE))!5e0!3m2!1sen!2sin!4v1773562276745!5m2!1sen!2sin',
  });
};
