import OpenAI from 'openai';

const systemPrompt =
  'You are the official AI assistant of Ekalavya Academy of Cricket Excellence. Only answer questions related to this academy including programs, facilities, registration, location, timings, and contact details. Do not answer unrelated topics.';

const buildAcademyContext = () => {
  const contactPhone = process.env.CONTACT_PHONE || '9515022680';
  const contactEmail = process.env.CONTACT_EMAIL || 'manoharbasappagari18@gmail.com';

  return `
Academy: Ekalavya Academy of Cricket Excellence (EACE)
Affiliation: Karnataka State Cricket Association Affiliated Academy
WhatsApp Registration: https://wa.me/919515022680
Address: Opposite Sunbeam International School, EACE, Mylasandra, Bengaluru, Karnataka - 560068
Phone: ${contactPhone}
WhatsApp Number: ${contactPhone}
Email: ${contactEmail}
Primary programs: Foundation Cricket Program, Advanced Skill Development, Elite Match Simulation, Strength and Conditioning
`;
};

const buildClientConfig = (apiKey) => {
  const isOpenRouterKey = apiKey.startsWith('sk-or-v1-');
  const baseURL = process.env.OPENAI_BASE_URL || (isOpenRouterKey ? 'https://openrouter.ai/api/v1' : undefined);
  const model = process.env.OPENAI_MODEL || (isOpenRouterKey ? 'openai/gpt-4o-mini' : 'gpt-4o-mini');

  const headers = {};

  if (isOpenRouterKey) {
    headers['HTTP-Referer'] = process.env.CLIENT_URL || 'https://your-netlify-url.netlify.app';
    headers['X-Title'] = 'EACE Assistant';
  }

  return {
    client: new OpenAI({
      apiKey,
      timeout: 15000,
      ...(baseURL ? { baseURL } : {}),
      ...(Object.keys(headers).length ? { defaultHeaders: headers } : {}),
    }),
    model,
  };
};

const buildFallbackReply = (rawMessage) => {
  const message = (rawMessage || '').toLowerCase();

  if (/join|enroll|admission|register|trial|book/.test(message)) {
    return 'You can join EACE via WhatsApp: https://wa.me/919515022680. Share your name, age group, and preferred batch to start enrollment.';
  }

  if (/time|timing|schedule|batch|session/.test(message)) {
    return 'Current batch timings: U10 6:30 AM, U14 7:30 AM, Advanced 4:30 PM, Elite 6:00 PM. For confirmation, message us on WhatsApp: +91 95150 22680.';
  }

  if (/where|location|address|map/.test(message)) {
    return 'EACE location: Opposite Sunbeam International School, Mylasandra, Bengaluru, Karnataka - 560068. You can request directions on WhatsApp: +91 95150 22680.';
  }

  if (/phone|call|contact|whatsapp|email/.test(message)) {
    return 'Contact EACE at +91 95150 22680 or email manoharbasappagari18@gmail.com. WhatsApp enrollment link: https://wa.me/919515022680.';
  }

  if (/program|coaching|facility|coach|training/.test(message)) {
    return 'EACE offers Foundation Cricket Program, Advanced Skill Development, Elite Match Simulation, and Strength & Conditioning with certified coaches and professional turf facilities.';
  }

  return 'I can help with EACE programs, registration, timings, location, facilities, and contact details. Ask any academy-related question or connect directly on WhatsApp: +91 95150 22680.';
};

export const askAssistant = async (req, res) => {
  const incoming = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!incoming) {
    return res.json({ reply: 'Please type your question so I can help you with EACE details.', source: 'fallback' });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return res.json({ reply: buildFallbackReply(incoming), source: 'fallback' });
  }

  try {
    const academyContext = buildAcademyContext();
    const { client, model } = buildClientConfig(apiKey);

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: `${systemPrompt}\n\nContext:\n${academyContext}` },
        { role: 'user', content: incoming },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.json({ reply: buildFallbackReply(incoming), source: 'fallback' });
    }

    return res.json({ reply, source: 'ai' });
  } catch (error) {
    console.error('Assistant provider error:', error?.status || '', error?.message || error);
    return res.json({ reply: buildFallbackReply(incoming), source: 'fallback' });
  }
};