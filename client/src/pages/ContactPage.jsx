import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { createLead, getContact } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';
import { riseIn, slideInLeft, slideInRight } from '../utils/motion.js';
import { buildLeadMessage, openWhatsApp } from '../utils/lead.js';

const fallback = {
  address: 'Begur-Koppa Road, Yelenahalli, Bangalore - 560068',
  phones: ['8123149416'],
  whatsapp: '8123105849',
  email: 'Eace.cricket@gmail.com',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8348110298252!2d77.6209007!3d12.8539437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6be1569c05b1%3A0x1b663a1502e07cc6!2sEkalavya%20academy%20of%20cricket%20excellence(EACE))!5e0!3m2!1sen!2sin!4v1773562276745!5m2!1sen!2sin',
};

const ContactPage = () => {
  const [contact, setContact] = useState(fallback);
  const [form, setForm] = useState({ name: '', number: '', age: '', location: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getContact();
        if (data) setContact(data);
      } catch (_error) {
      }
    };

    load();
  }, []);

  const sendViaWhatsApp = async (event) => {
    event.preventDefault();
    setStatus('');

    const combinedMessage = `${form.message}${form.email ? `\nEmail: ${form.email}` : ''}`.trim();
    const payload = {
      name: form.name,
      phone: form.number,
      age: form.age,
      location: form.location,
      message: combinedMessage,
    };

    try {
      await createLead({
        ...payload,
        type: 'contact',
        source: 'contact_page',
      });

      const text = buildLeadMessage({ ...payload, type: 'contact' });
      openWhatsApp(text, `91${contact.whatsapp}`);
      setStatus('Submitted. Our team will connect with you shortly.');
      setForm({ name: '', number: '', age: '', location: '', email: '', message: '' });
    } catch (_error) {
      setStatus('Unable to submit right now. Please try again.');
    }
  };

  return (
    <motion.section variants={riseIn} initial="hidden" animate="show" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>Contact EACE</title>
      </Helmet>

      <SectionTitle
        eyebrow="Contact"
        title="Visit or Connect With EACE"
        subtitle="Speak directly with our academy team for registration, timings, and program guidance."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
          <article className="sports-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-lg text-royal">Address</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{contact.address}</p>
          </article>

          <article className="sports-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-lg text-royal">Phone</h3>
            {(contact.phones || []).map((phone) => (
              <a key={phone} href={`tel:+91${phone}`} className="mt-2 block text-sm text-muted transition hover:text-royal">
                +91 {phone}
              </a>
            ))}
          </article>

          <article className="sports-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-heading text-lg text-royal">Email</h3>
            <a href={`mailto:${contact.email}`} className="mt-2 inline-block text-sm text-muted transition hover:text-royal">
              {contact.email}
            </a>
          </article>

          <motion.form
            onSubmit={sendViaWhatsApp}
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="shine-card rounded-2xl border border-sportsBlue/20 bg-gradient-to-br from-cream to-[#E8EEF8] p-6 shadow-sm"
          >
            <h3 className="font-heading text-lg text-royal">Send via WhatsApp</h3>
            <p className="mt-1 text-sm text-muted">Share your details and send directly to EACE.</p>

            <input
              type="text"
              required
              placeholder="Name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-4 w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
            />
            <input
              type="tel"
              required
              placeholder="Number"
              value={form.number}
              onChange={(event) => setForm((prev) => ({ ...prev, number: event.target.value }))}
              className="mt-3 w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
            />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                type="number"
                min="5"
                required
                placeholder="Age"
                value={form.age}
                onChange={(event) => setForm((prev) => ({ ...prev, age: event.target.value }))}
                className="w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
              />
              <input
                type="text"
                required
                placeholder="Location"
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                className="w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-3 w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
            />
            <textarea
              rows={3}
              required
              placeholder="Message"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="mt-3 w-full rounded-lg border border-sportsBlue/25 bg-cream px-3 py-2 text-sm text-paper outline-none placeholder:text-muted transition focus:border-royal focus:ring-2 focus:ring-royal/20"
            />

            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gold mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold"
            >
              Send on WhatsApp
            </motion.button>
            {status ? <p className="mt-3 text-sm text-[#0B4192]">{status}</p> : null}
          </motion.form>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-sportsBlue/20 bg-cream shadow-sm"
        >
          <iframe
            title="EACE Location"
            src={contact.mapEmbedUrl}
            className="h-[680px] w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactPage;
