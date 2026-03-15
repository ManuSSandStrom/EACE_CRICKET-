import { Lead } from '../models/Lead.js';

const normalizePhone = (value) => String(value || '').replace(/\s+/g, '').trim();

export const createLead = async (req, res) => {
  const { name, phone, age, location, type, source, planId, planName, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone are required' });
  }

  const parsedAge = age !== undefined && age !== null && age !== '' ? Number(age) : undefined;

  const payload = {
    name: String(name).trim(),
    phone: normalizePhone(phone),
    age: Number.isFinite(parsedAge) ? parsedAge : undefined,
    location: location ? String(location).trim() : '',
    type: type || 'general',
    source: source ? String(source).trim() : '',
    planId: planId ? String(planId).trim() : '',
    planName: planName ? String(planName).trim() : '',
    message: message ? String(message).trim() : '',
  };

  if (!payload.phone) {
    return res.status(400).json({ message: 'Valid phone is required' });
  }

  const lead = await Lead.create(payload);
  return res.status(201).json(lead);
};

export const getLeads = async (req, res) => {
  const { type, status, q } = req.query || {};
  const filter = {};

  if (type && type !== 'all') filter.type = type;
  if (status && status !== 'all') filter.status = status;

  if (q) {
    const pattern = new RegExp(String(q).trim(), 'i');
    filter.$or = [
      { name: pattern },
      { phone: pattern },
      { location: pattern },
      { planName: pattern },
      { message: pattern },
    ];
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  return res.json(leads);
};

export const updateLead = async (req, res) => {
  const { status, verified, notes } = req.body || {};
  const update = {};

  if (status) update.status = status;
  if (typeof verified === 'boolean') update.verified = verified;
  if (typeof notes === 'string') update.notes = notes.trim();

  if (update.verified === true && !update.status) {
    update.status = 'verified';
  }

  const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!lead) {
    return res.status(404).json({ message: 'Lead not found' });
  }

  return res.json(lead);
};

export const deleteLead = async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) {
    return res.status(404).json({ message: 'Lead not found' });
  }
  return res.json({ message: 'Deleted' });
};
