import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const emptyForm = { name: '', phone: '', age: '', location: '', message: '' };

const LeadModal = ({
  open,
  title,
  subtitle,
  ctaLabel = 'Submit',
  contextLabel = '',
  onSubmit,
  onClose,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setError('');
      setLoading(false);
    }
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit({
        name: form.name.trim(),
        phone: form.phone.trim(),
        age: form.age,
        location: form.location.trim(),
        message: form.message.trim(),
      });
      setForm(emptyForm);
    } catch (_error) {
      setError('Unable to submit right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg rounded-2xl border border-[#D9E2F2] bg-white p-6 shadow-[0_24px_60px_rgba(9,32,70,0.18)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#790000]">EACE Enquiry</p>
                <h3 className="mt-2 text-2xl font-bold text-[#0B4192]">{title}</h3>
                {subtitle ? <p className="mt-2 text-sm text-[#3A5A8C]">{subtitle}</p> : null}
                {contextLabel ? <p className="mt-2 text-xs font-semibold text-[#0B4192]">{contextLabel}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#D9E2F2] px-3 py-1 text-xs font-semibold text-[#3A5A8C] hover:border-[#0B4192] hover:text-[#0B4192]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Full name"
                className="w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
              />
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                placeholder="Phone number"
                className="w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  type="number"
                  min="5"
                  value={form.age}
                  onChange={(event) => setForm((prev) => ({ ...prev, age: event.target.value }))}
                  placeholder="Age"
                  className="w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
                />
                <input
                  value={form.location}
                  onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                  placeholder="Location"
                  className="w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
                />
              </div>
              <textarea
                rows={3}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Message (optional)"
                className="w-full rounded-lg border border-[#D9E2F2] bg-white px-3 py-2 text-sm text-[#0B4192] outline-none focus:border-[#0B4192]"
              />

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                disabled={loading}
                className="mt-1 w-full rounded-lg bg-[#0B4192] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
              >
                {loading ? 'Submitting...' : ctaLabel}
              </button>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LeadModal;
