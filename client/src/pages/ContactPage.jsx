import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getContact } from '../api/contentApi.js';
import SectionTitle from '../components/SectionTitle.jsx';
import { riseIn, slideInLeft, slideInRight } from '../utils/motion.js';

const fallback = {
  address: 'Opposite Sunbeam International School, EACE, Mylasandra, Bengaluru, Karnataka - 560068',
  phones: ['9515022680'],
  whatsapp: '9515022680',
  email: 'manoharbasappagari18@gmail.com',
  mapEmbedUrl: 'https://www.google.com/maps?q=12.901401,77.620572&output=embed',
};

const ContactPage = () => {
  const [contact, setContact] = useState(fallback);
  const [form, setForm] = useState({ name: '', number: '', email: '', message: '' });

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

  const sendViaWhatsApp = (event) => {
    event.preventDefault();

    const text = `Hello EACE,%0A%0AName: ${encodeURIComponent(form.name)}%0ANumber: ${encodeURIComponent(
      form.number,
    )}%0AEmail: ${encodeURIComponent(form.email)}%0AMessage: ${encodeURIComponent(form.message)}`;

    window.open(`https://wa.me/91${contact.whatsapp}?text=${text}`, '_blank');
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
            <input
              type="email"
              required
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
