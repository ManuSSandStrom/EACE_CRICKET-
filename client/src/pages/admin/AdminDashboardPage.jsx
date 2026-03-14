import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  createGalleryItem,
  createTestimonial,
  createVideo,
  deleteGalleryItem,
  deleteTestimonial,
  deleteVideo,
  getLeads,
  getGallery,
  getHomeContent,
  getTestimonials,
  getVideos,
  updateLead,
  updateHomeContent,
  uploadGalleryImage,
} from '../../api/contentApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const categories = ['Matches', 'Practice', 'Events', 'Tournaments'];
const leadTabs = [
  { id: 'all', label: 'All Leads' },
  { id: 'new_student', label: 'New Students' },
  { id: 'plan', label: 'Plan Enquiries' },
  { id: 'trial', label: 'Free Trials' },
  { id: 'school', label: 'School Enquiries' },
  { id: 'contact', label: 'Contacted' },
  { id: 'whatsapp', label: 'WhatsApp' },
];

const leadTypeLabel = {
  new_student: 'New Student',
  plan: 'Plan Enquiry',
  trial: 'Free Trial',
  school: 'School Enquiry',
  contact: 'Contact Form',
  whatsapp: 'WhatsApp',
  general: 'General',
};

const leadStatusStyles = {
  new: 'bg-[#E8EEF8] text-[#0B4192]',
  contacted: 'bg-[#FFF4E1] text-[#8A5A00]',
  verified: 'bg-[#E6F7ED] text-[#1D6B4F]',
  closed: 'bg-[#F2F4F8] text-[#6B7280]',
};

const AdminDashboardPage = () => {
  const { user, signOut } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [videos, setVideos] = useState([]);
  const [homeData, setHomeData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [leadFilter, setLeadFilter] = useState('all');
  const [leadStatus, setLeadStatus] = useState('all');
  const [leadQuery, setLeadQuery] = useState('');

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

  const leadCounts = useMemo(() => {
    return leads.reduce(
      (acc, lead) => {
        acc.all += 1;
        acc[lead.type] = (acc[lead.type] || 0) + 1;
        return acc;
      },
      { all: 0 },
    );
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const query = leadQuery.trim().toLowerCase();
    return leads.filter((lead) => {
      if (leadFilter !== 'all' && lead.type !== leadFilter) return false;
      if (leadStatus !== 'all' && lead.status !== leadStatus) return false;
      if (!query) return true;
      const haystack = `${lead.name} ${lead.phone} ${lead.location} ${lead.planName} ${lead.message}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [leads, leadFilter, leadStatus, leadQuery]);

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString();
  };

  const load = async () => {
    const [galleryData, testimonialsData, videosData, homeContent, leadData] = await Promise.all([
      getGallery('All'),
      getTestimonials(),
      getVideos(),
      getHomeContent(),
      getLeads(),
    ]);

    setGallery(galleryData || []);
    setTestimonials(testimonialsData || []);
    setVideos(videosData || []);
    setLeads(leadData || []);

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

  const updateLeadStatus = async (id, payload) => {
    try {
      const updated = await updateLead(id, payload);
      setLeads((prev) => prev.map((lead) => (lead._id === id ? updated : lead)));
    } catch (_error) {
      setStatus('Failed to update lead.');
    }
  };

  return (
    <section className="min-h-screen bg-[#F7F9FD]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
      <Helmet>
        <title>Admin Dashboard | EACE</title>
      </Helmet>

      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#790000]">Admin</p>
          <h1 className="text-3xl font-bold text-[#0B4192]">Welcome {user?.name || 'EACE Admin'}</h1>
        </div>
        <button
          onClick={signOut}
          className="rounded-lg border border-[#D9E2F2] px-4 py-2 text-sm font-semibold text-[#0B4192] transition hover:border-[#0B4192]"
        >
          Logout
        </button>
      </header>

      {status ? <p className="mb-6 text-sm text-[#3A5A8C]">{status}</p> : null}

      <section className="mb-10 rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_18px_40px_rgba(9,32,70,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#790000]">Leads</p>
            <h2 className="text-2xl font-bold text-[#0B4192]">Lead Management</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={leadQuery}
              onChange={(event) => setLeadQuery(event.target.value)}
              placeholder="Search name, phone, plan..."
              className="w-56 rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            />
            <select
              value={leadStatus}
              onChange={(event) => setLeadStatus(event.target.value)}
              className="rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="verified">Verified</option>
              <option value="closed">Closed</option>
            </select>
            <button
              type="button"
              onClick={load}
              className="rounded-lg border border-[#D9E2F2] px-3 py-2 text-sm font-semibold text-[#0B4192] transition hover:border-[#0B4192]"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {leadTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setLeadFilter(tab.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                leadFilter === tab.id
                  ? 'border-[#0B4192] bg-[#0B4192] text-white'
                  : 'border-[#D9E2F2] text-[#3A5A8C] hover:border-[#0B4192] hover:text-[#0B4192]'
              }`}
            >
              {tab.label}
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                {leadCounts[tab.id] || 0}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filteredLeads.length ? (
            filteredLeads.map((lead) => (
              <article key={lead._id} className="rounded-xl border border-[#E0E8F4] bg-[#FDFEFF] p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[#0B4192]">{lead.name}</p>
                    <p className="text-xs text-[#3A5A8C]">
                      {leadTypeLabel[lead.type] || 'Lead'}
                      {lead.planName ? ` • ${lead.planName}` : ''}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${leadStatusStyles[lead.status] || leadStatusStyles.new}`}>
                    {lead.status || 'new'}
                  </span>
                </div>

                <div className="mt-3 grid gap-1 text-sm text-[#2C3E6B]">
                  <p>Phone: {lead.phone}</p>
                  <p>Age: {lead.age || '--'}</p>
                  <p>Location: {lead.location || '--'}</p>
                </div>

                {lead.message ? (
                  <p className="mt-3 text-xs text-[#3A5A8C]">Message: {lead.message}</p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => updateLeadStatus(lead._id, { status: 'contacted' })}
                    className="rounded-full border border-[#D9E2F2] px-3 py-1 text-[11px] font-semibold text-[#0B4192] hover:border-[#0B4192]"
                  >
                    Mark Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLeadStatus(lead._id, { verified: true })}
                    className="rounded-full border border-[#D9E2F2] px-3 py-1 text-[11px] font-semibold text-[#1D6B4F] hover:border-[#1D6B4F]"
                  >
                    Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLeadStatus(lead._id, { status: 'closed' })}
                    className="rounded-full border border-[#D9E2F2] px-3 py-1 text-[11px] font-semibold text-[#6B7280] hover:border-[#6B7280]"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-[#8896B3]">Submitted {formatDate(lead.createdAt)}</p>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-[#D9E2F2] bg-[#F9FBFF] p-6 text-sm text-[#3A5A8C]">
              No leads yet. New enquiries will appear here.
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={saveHome} className="rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_18px_40px_rgba(9,32,70,0.12)]">
          <h2 className="text-xl font-semibold text-[#0B4192]">Homepage Content</h2>
          <label className="mt-4 block text-sm">Hero Heading</label>
          <input
            value={homeForm.heroHeadline}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, heroHeadline: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
          />
          <label className="mt-4 block text-sm">Hero Subheading</label>
          <input
            value={homeForm.heroSubheading}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, heroSubheading: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
          />
          <label className="mt-4 block text-sm">Programs (one per line)</label>
          <textarea
            rows={5}
            value={homeForm.programsText}
            onChange={(event) => setHomeForm((prev) => ({ ...prev, programsText: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
          />
          <button className="mt-4 rounded-md bg-[#0B4192] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Save Homepage</button>
        </form>

        <form onSubmit={addGallery} className="rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_18px_40px_rgba(9,32,70,0.12)]">
          <h2 className="text-xl font-semibold text-[#0B4192]">Upload Gallery Item</h2>
          <label className="mt-4 block text-sm">Title</label>
          <input
            value={galleryForm.title}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, title: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            required
          />
          <label className="mt-4 block text-sm">Category</label>
          <select
            value={galleryForm.category}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, category: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
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
          <p className="my-2 text-center text-xs text-[#93A4C2]">or</p>
          <label className="block text-sm">Direct Image URL</label>
          <input
            value={galleryForm.imageUrl}
            onChange={(event) => setGalleryForm((prev) => ({ ...prev, imageUrl: event.target.value }))}
            className="mt-1 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            placeholder="https://..."
          />
          <button className="mt-4 rounded-md bg-[#0B4192] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Add Gallery Item</button>
        </form>

        <form onSubmit={addTestimonial} className="rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_18px_40px_rgba(9,32,70,0.12)]">
          <h2 className="text-xl font-semibold text-[#0B4192]">Add Testimonial</h2>
          <input
            value={testimonialForm.name}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Name"
            className="mt-4 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            required
          />
          <input
            value={testimonialForm.role}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, role: event.target.value }))}
            placeholder="Role"
            className="mt-3 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
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
              className="w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
              required
            />
            <input
              value={testimonialForm.avatarUrl}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, avatarUrl: event.target.value }))}
              placeholder="Avatar image URL (optional)"
              className="w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            />
          </div>
          <textarea
            rows={4}
            value={testimonialForm.message}
            onChange={(event) => setTestimonialForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Message"
            className="mt-3 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            required
          />
          <button className="mt-4 rounded-md bg-[#0B4192] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Add Testimonial</button>
        </form>

        <form onSubmit={addVideo} className="rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_18px_40px_rgba(9,32,70,0.12)]">
          <h2 className="text-xl font-semibold text-[#0B4192]">Add YouTube Video</h2>
          <input
            value={videoForm.title}
            onChange={(event) => setVideoForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Video title"
            className="mt-4 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
            required
          />
          <input
            value={videoForm.youtubeUrl}
            onChange={(event) => setVideoForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))}
            placeholder="YouTube URL"
            className="mt-3 w-full rounded-md border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
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
          <button className="mt-4 rounded-md bg-[#0B4192] px-4 py-2 text-sm font-semibold text-white hover:brightness-110">Add Video</button>
        </form>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#D9E2F2] bg-white p-5 shadow-[0_16px_32px_rgba(9,32,70,0.1)]">
          <h3 className="text-lg font-semibold text-[#0B4192]">Gallery Items</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {gallery.map((item) => (
              <div key={item._id} className="rounded-lg border border-[#E0E8F4] p-3 text-sm">
                <p className="font-semibold text-[#0B4192]">{item.title}</p>
                <p className="text-xs text-[#93A4C2]">{item.category}</p>
                <button
                  onClick={() => deleteGalleryItem(item._id).then(load)}
                  className="mt-2 text-xs text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#D9E2F2] bg-white p-5 shadow-[0_16px_32px_rgba(9,32,70,0.1)]">
          <h3 className="text-lg font-semibold text-[#0B4192]">Testimonials</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {testimonials.map((item) => (
              <div key={item._id} className="rounded-lg border border-[#E0E8F4] p-3 text-sm">
                <p className="font-semibold text-[#0B4192]">{item.name}</p>
                <p className="text-xs text-[#93A4C2]">{item.role}</p>
                <p className="text-xs text-[#93A4C2]">Rating: {item.rating || 5}</p>
                <button
                  onClick={() => deleteTestimonial(item._id).then(load)}
                  className="mt-2 text-xs text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#D9E2F2] bg-white p-5 shadow-[0_16px_32px_rgba(9,32,70,0.1)]">
          <h3 className="text-lg font-semibold text-[#0B4192]">Videos</h3>
          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
            {videos.map((item) => (
              <div key={item._id} className="rounded-lg border border-[#E0E8F4] p-3 text-sm">
                <p className="font-semibold text-[#0B4192]">{item.title}</p>
                <p className="text-xs text-[#93A4C2]">{item.featured ? 'Featured' : 'Standard'}</p>
                <button
                  onClick={() => deleteVideo(item._id).then(load)}
                  className="mt-2 text-xs text-red-500 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </article>
      </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
