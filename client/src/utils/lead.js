export const DEFAULT_WHATSAPP = '918123105849';

const typeLabels = {
  new_student: 'New Student Registration',
  plan: 'Plan Enquiry',
  trial: 'Free Trial Booking',
  school: 'School Plan Enquiry',
  contact: 'Contact Form Enquiry',
  whatsapp: 'WhatsApp Enquiry',
  general: 'General Enquiry',
};

export const buildLeadMessage = ({ type, planName, name, phone, age, location, message }) => {
  const label = typeLabels[type] || typeLabels.general;
  const lines = [
    'Hello EACE,',
    `Enquiry Type: ${label}${planName ? ` - ${planName}` : ''}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Age: ${age}`,
    `Location: ${location}`,
  ];

  if (message) {
    lines.push(`Message: ${message}`);
  }

  return lines.join('\n');
};

export const openWhatsApp = (text, phone = DEFAULT_WHATSAPP) => {
  const safePhone = String(phone || DEFAULT_WHATSAPP).replace(/\D/g, '');
  const url = `https://wa.me/${safePhone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};
