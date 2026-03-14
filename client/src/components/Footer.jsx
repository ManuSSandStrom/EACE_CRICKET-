import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { EACE_LOGO_URL } from '../utils/branding.js';
import LeadModal from './LeadModal.jsx';
import { createLead } from '../api/contentApi.js';
import { buildLeadMessage, openWhatsApp } from '../utils/lead.js';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/plans', label: 'Plans & Pricing' },
  { to: '/calendar', label: 'Cricket Calendar' },
  { to: '/coaches', label: 'Coaches' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => {
  const [leadOpen, setLeadOpen] = useState(false);

  const submitLead = async (payload) => {
    await createLead({
      ...payload,
      type: 'whatsapp',
      source: 'footer_whatsapp',
    });
    const text = buildLeadMessage({ ...payload, type: 'whatsapp' });
    openWhatsApp(text);
    setLeadOpen(false);
  };

  return (
    <footer className="border-t border-[#D0D8E8] bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div>
          <img
            src={EACE_LOGO_URL}
            alt="EACE Logo"
            className="mb-4 h-16 w-16 object-contain"
            loading="lazy"
            decoding="async"
          />
          <h3 className="font-heading text-4xl text-[#0B4192]">Ekalavya Academy of Cricket Excellence</h3>
          <p className="mt-3 max-w-md text-sm text-[#2C3E6B]">
            Elite cricket training ecosystem designed to build disciplined, high-performing athletes.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8C9E8] text-[#0B4192] transition hover:border-[#0B4192] hover:text-[#062D6B]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8C9E8] text-[#0B4192] transition hover:border-[#0B4192] hover:text-[#062D6B]"
            >
              <FaYoutube />
            </a>
            <button
              type="button"
              onClick={() => setLeadOpen(true)}
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8C9E8] text-[#0B4192] transition hover:border-[#0B4192] hover:text-[#062D6B]"
            >
              <FaWhatsapp />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-3xl text-[#0B4192]">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-sm text-[#2C3E6B] transition hover:text-[#0B4192]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-3xl text-[#0B4192]">Contact</h4>
          <p className="mt-3 text-sm text-[#2C3E6B]">+91 8123149416</p>
          <p className="text-sm text-[#2C3E6B]">Eace.cricket@gmail.com</p>
          <p className="mt-2 text-sm text-[#2C3E6B]">
            Begur-Koppa Road, Yelenahalli, Bangalore - 560068
          </p>
        </div>

        <div>
          <h4 className="font-heading text-3xl text-[#0B4192]">Location</h4>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#B8C9E8]">
            <iframe
              title="EACE Map"
              src="https://www.google.com/maps?q=12.901401,77.620572&output=embed"
              className="h-40 w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-[#D0D8E8] py-4 text-center text-xs text-[#3A5A8C]">
        Copyright {new Date().getFullYear()} EACE. All rights reserved.
      </div>

      <LeadModal
        open={leadOpen}
        title="WhatsApp Enquiry"
        subtitle="Share your details and we will confirm on WhatsApp."
        ctaLabel="Send Details"
        onSubmit={submitLead}
        onClose={() => setLeadOpen(false)}
      />
    </footer>
  );
};

export default Footer;
