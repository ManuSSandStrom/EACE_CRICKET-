import { useEffect, useState } from 'react';
import LeadModal from './LeadModal.jsx';
import { createLead } from '../api/contentApi.js';

const DISMISS_KEY = 'eace_lead_dismissed_at';
const CAPTURED_KEY = 'eace_lead_captured';

const shouldShowPopup = () => {
  if (localStorage.getItem(CAPTURED_KEY) === 'true') return false;

  const dismissedAt = localStorage.getItem(DISMISS_KEY);
  if (!dismissedAt) return true;

  const dismissedTime = Number(dismissedAt);
  if (!Number.isFinite(dismissedTime)) return true;

  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - dismissedTime > sevenDays;
};

const EntryLeadPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!shouldShowPopup()) return;
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (payload) => {
    await createLead({
      ...payload,
      type: 'new_student',
      source: 'entry_popup',
    });
    localStorage.setItem(CAPTURED_KEY, 'true');
    setOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setOpen(false);
  };

  return (
    <LeadModal
      open={open}
      title="Begin Your Cricket Journey"
      subtitle="Share a few details so our team can guide you with the right training plan."
      ctaLabel="Save Details"
      onSubmit={handleSubmit}
      onClose={handleClose}
    />
  );
};

export default EntryLeadPopup;
