import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { EACE_LOGO_URL } from '../utils/branding.js';
import LeadModal from './LeadModal.jsx';
import { createLead } from '../api/contentApi.js';
import { buildLeadMessage, openWhatsApp } from '../utils/lead.js';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/plans', label: 'Plans' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/coaches', label: 'Coaches' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  const submitLead = async (payload) => {
    await createLead({
      ...payload,
      type: 'general',
      source: 'navbar_cta',
    });
    const text = buildLeadMessage({ ...payload, type: 'general' });
    openWhatsApp(text);
    setLeadOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled
          ? 'border-b border-[#D0D8E8] bg-white/95 shadow-[0_10px_22px_rgba(11,65,146,0.1)] backdrop-blur-xl'
          : 'border-b border-[#E0E8F4] bg-white/90 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center rounded-2xl bg-white p-1.5 shadow-[0_10px_22px_rgba(11,65,146,0.18)] ring-1 ring-[#D6E2F5]">
            <img
              src={EACE_LOGO_URL}
              alt="EACE Logo"
              className="h-16 w-16 object-contain md:h-[72px] md:w-[72px]"
              loading="lazy"
              decoding="async"
            />
          </span>
          <div>
            <p className="font-heading text-xl leading-tight text-[#0B4192]">Ekalavya Academy</p>
            <p className="font-subheading text-[11px] uppercase tracking-[0.18em] text-[#3A5A8C]">of Cricket Excellence</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link-sports ${isActive ? 'is-active text-[#0B4192]' : 'text-[#2C3E6B] hover:text-[#0B4192]'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setLeadOpen(true)}
            className="btn-gold rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
          >
            Join Academy
          </button>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#B8C9E8] bg-white text-xl text-[#0B4192] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#D0D8E8] bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm uppercase tracking-[0.1em] ${
                    isActive ? 'bg-[#EDF1F8] text-[#0B4192]' : 'text-[#2C3E6B] hover:bg-[#F0F4FA]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setLeadOpen(true);
              }}
              className="btn-gold mt-2 rounded-lg px-3 py-2 text-center text-sm font-semibold uppercase tracking-[0.12em]"
            >
              Join Academy
            </button>
          </div>
        </div>
      ) : null}

      <LeadModal
        open={leadOpen}
        title="Join EACE Academy"
        subtitle="Share your details and our team will confirm on WhatsApp."
        ctaLabel="Send Details"
        onSubmit={submitLead}
        onClose={() => setLeadOpen(false)}
      />
    </header>
  );
};

export default Navbar;
