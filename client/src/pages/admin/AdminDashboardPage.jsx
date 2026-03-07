import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  createGalleryItem,
  createTestimonial,
  createVideo,
  deleteGalleryItem,
  deleteTestimonial,
  deleteVideo,
  getGallery,
  getHomeContent,
  getTestimonials,
  getVideos,
  updateHomeContent,
  uploadGalleryImage,
} from '../../api/contentApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const categories = ['Matches', 'Practice', 'Events', 'Tournaments'];

const AdminDashboardPage = () => {
  const { user, signOut } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [videos, setVideos] = useState([]);
  const [homeData, setHomeData] = useState(null);

  const [galleryForm, setGalleryForm] = useState({ title: '', category: categories[0], imageUrl: '' });
  const [galleryImage, setGalleryImage] = useState(null);

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    message: '',
    rating: 5,
    avatarUrl: '',
  });
  const [videoForm, setVideoForm] = useState({ title: '', youtubeUrl: '', featured: false });

  const [homeForm, setHomeForm] = useState({ heroHeadline: '', heroSubheading: '', programsText: '' });
  const [status, setStatus] = useState('');

  const programs = useMemo(
    () =>
      homeForm.programsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    [homeForm.programsText],
  );

  const load = async () => {
    const [galleryData, testimonialsData, videosData, homeContent] = await Promise.all([
      getGallery('All'),
      getTestimonials(),
      getVideos(),
      getHomeContent(),
    ]);

    setGallery(galleryData || []);
    setTestimonials(testimonialsData || []);
    setVideos(videosData || []);

    if (homeContent) {
      setHomeData(homeContent);
      setHomeForm({
        heroHeadline: homeContent.heroHeadline || '',
        heroSubheading: homeContent.heroSubheading || '',
        programsText: (homeContent.programs || []).join('\n'),
      });
    }
  };

  useEffect(() => {
    load().catch(() => setStatus('Unable to load admin data.'));
  }, []);

  const addGallery = async (event) => {
    event.preventDefault();
    setStatus('Saving gallery item...');

    try {
      let imageUrl = galleryForm.imageUrl;

      if (galleryImage) {
        imageUrl = await uploadGalleryImage(galleryImage);
      }

      await createGalleryItem({ ...galleryForm, imageUrl });
      setGalleryForm({ title: '', category: categories[0], imageUrl: '' });
      setGalleryImage(null);
      await load();
      setStatus('Gallery item saved.');
    } catch (_error) {
      setStatus('Failed to save gallery item.');
    }
  };

  const addTestimonial = async (event) => {
    event.preventDefault();
    setStatus('Saving testimonial...');
    try {
      await createTestimonial({
        ...testimonialForm,
        rating: Number(testimonialForm.rating) || 5,
      });
      setTestimonialForm({ name: '', role: '', message: '', rating: 5, avatarUrl: '' });
      await load();
      setStatus('Testimonial saved.');
    } catch (_error) {
      setStatus('Failed to save testimonial.');
    }
  };

  const addVideo = async (event) => {
    event.preventDefault();
    setStatus('Saving video...');
    try {
      await createVideo(videoForm);
      setVideoForm({ title: '', youtubeUrl: '', featured: false });
      await load();
      setStatus('Video saved.');
    } catch (_error) {
      setStatus('Failed to save video.');
    }
  };

  const saveHome = async (event) => {
    event.preventDefault();
    setStatus('Updating homepage content...');

    try {
      const payload = {
        ...(homeData || {}),
        heroHeadline: homeForm.heroHeadline,
        heroSubheading: homeForm.heroSubheading,
        programs,
      };

      const updated = await updateHomeContent(payload);
      setHomeData(updated);
      setStatus('Homepage content updated.');
    } catch (_error) {
      setStatus('Failed to update homepage content.');
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
      <Helmet>
        <title>Admin Dashboard | EACE</title>
      </Helmet>

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Admin</p>
          <h1 className="text-3xl font-bold">Welcome {user?.name || 'EACE Admin'}</h1>
        </div>
        <button onClick={signOut} className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:border-gold">
          Logout
        </button>
      </header>

      {status ? <p className="mb-6 text-sm text-slate-300">{status}</p> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={saveHome} className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gold">Homepage Content</h2>
          <label className="mt-4 block text-sm">Hero Heading</label>
          <input
            value={homeForm.heroHeadline}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, heroHeadline: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
          />
          <label className="mt-4 block text-sm">Hero Subheading</label>
          <input
            value={homeForm.heroSubheading}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, heroSubheading: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
          />
          <label className="mt-4 block text-sm">Programs (one per line)</label>
          <textarea
            rows={5}
            value={homeForm.programsText}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, programsText: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
          />
          <button className="mt-4 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-slate-900">Save Homepage</button>
        </form>

        <form onSubmit={addGallery} className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gold">Upload Gallery Item</h2>
          <label className="mt-4 block text-sm">Title</label>
          <input
            value={galleryForm.title}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, title: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <label className="mt-4 block text-sm">Category</label>
          <select
            value={galleryForm.category}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, category: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
          <label className="mt-4 block text-sm">Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setGalleryImage(event.target.files?.[0] || null)}
            className="mt-1 block w-full text-xs"
          />
          <p className="my-2 text-center text-xs text-slate-400">or</p>
          <label className="block text-sm">Direct Image URL</label>
          <input
            value={galleryForm.imageUrl}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
            className="mt-1 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <button className="mt-4 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-slate-900">Add Gallery Item</button>
        </form>

        <form onSubmit={addTestimonial} className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gold">Add Testimonial</h2>
          <input
            value={testimonialForm.name}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Name"
            className="mt-4 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <input
            value={testimonialForm.role}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, role: event.target.value }))}
            placeholder="Role"
            className="mt-3 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={testimonialForm.rating}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, rating: event.target.value }))}
              placeholder="Rating (1 to 5)"
              className="w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
              required
            />
            <input
              value={testimonialForm.avatarUrl}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, avatarUrl: event.target.value }))}
              placeholder="Avatar image URL (optional)"
              className="w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            />
          </div>
          <textarea
            rows={4}
            value={testimonialForm.message}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Message"
            className="mt-3 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <button className="mt-4 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-slate-900">Add Testimonial</button>
        </form>

        <form onSubmit={addVideo} className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gold">Add YouTube Video</h2>
          <input
            value={videoForm.title}
            onChange={(event) => setVideoForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Video title"
            className="mt-4 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <input
            value={videoForm.youtubeUrl}
            onChange={(event) => setVideoForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))}
            placeholder="YouTube URL"
            className="mt-3 w-full rounded-md border border-white/15 bg-slate-900/70 px-3 py-2 text-sm"
            required
          />
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={videoForm.featured}
              onChange={(event) => setVideoForm((prev) => ({ ...prev, featured: event.target.checked }))}
            />
            Mark as featured
          </label>
          <button className="mt-4 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-slate-900">Add Video</button>
        </form>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Gallery Items</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {gallery.map((item) => (
              <div key={item._id} className="rounded-lg border border-white/10 p-3 text-sm">
                <p>{item.title}</p>
                <p className="text-xs text-slate-400">{item.category}</p>
                <button
                  onClick={() => deleteGalleryItem(item._id).then(load)}
                  className="mt-2 text-xs text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Testimonials</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {testimonials.map((item) => (
              <div key={item._id} className="rounded-lg border border-white/10 p-3 text-sm">
                <p>{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
                <p className="text-xs text-slate-400">Rating: {item.rating || 5}</p>
                <button
                  onClick={() => deleteTestimonial(item._id).then(load)}
                  className="mt-2 text-xs text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="glass rounded-2xl p-5">
          <h3 className="text-lg font-semibold">Videos</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {videos.map((item) => (
              <div key={item._id} className="rounded-lg border border-white/10 p-3 text-sm">
                <p>{item.title}</p>
                <p className="text-xs text-slate-400">{item.featured ? 'Featured' : 'Standard'}</p>
                <button
                  onClick={() => deleteVideo(item._id).then(load)}
                  className="mt-2 text-xs text-red-300 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
