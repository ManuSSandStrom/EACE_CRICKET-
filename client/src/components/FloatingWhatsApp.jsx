import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import LeadModal from './LeadModal.jsx';
import { createLead } from '../api/contentApi.js';
import { buildLeadMessage, openWhatsApp } from '../utils/lead.js';

const FloatingWhatsApp = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (payload) => {
    await createLead({
      ...payload,
      type: 'whatsapp',
      source: 'floating_whatsapp',
    });

    const text = buildLeadMessage({
      ...payload,
      type: 'whatsapp',
    });
    openWhatsApp(text);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Enroll on WhatsApp"
        className="fixed bottom-24 right-4 z-[110] flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-xl shadow-green-500/30 transition hover:scale-110 sm:bottom-24 sm:right-6"
      >
        <FaWhatsapp />
      </button>

      <LeadModal
        open={open}
        title="WhatsApp Enquiry"
        subtitle="Share your details and we will confirm on WhatsApp."
        ctaLabel="Send to WhatsApp"
        onSubmit={handleSubmit}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default FloatingWhatsApp;
