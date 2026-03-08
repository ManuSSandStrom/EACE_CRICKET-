import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/918123105849?text=Hello,%20I%20want%20to%20enroll%20in%20Ekalavya%20Academy%20of%20Cricket%20Excellence."
      target="_blank"
      rel="noreferrer"
      aria-label="Enroll on WhatsApp"
      className="fixed bottom-24 right-4 z-[110] flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-xl shadow-green-500/30 transition hover:scale-110 sm:bottom-24 sm:right-6"
    >
      <FaWhatsapp />
    </a>
  );
};

export default FloatingWhatsApp;
