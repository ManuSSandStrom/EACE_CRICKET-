import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';
import { askAssistant } from '../api/contentApi.js';

const starter = {
  role: 'assistant',
  text: 'Welcome to EACE. Ask me about programs, facilities, registration, timings, or location.',
};

const FloatingAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([starter]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, typing]);

  const canSend = useMemo(() => input.trim().length > 0 && !typing, [input, typing]);

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setTyping(true);

    try {
      const reply = await askAssistant(question);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Unable to connect right now. Please reach us directly on WhatsApp: +91 95150 22680.',
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-[100] sm:right-6">
      <button
        className="gold-ring flex h-14 w-14 items-center justify-center rounded-full border border-[#B8C9E8] bg-white text-xl text-[#0B4192] transition hover:scale-105"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open AI assistant"
      >
        <FaRobot />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            className="mt-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-[#B8C9E8] bg-white shadow-[0_16px_36px_rgba(11,65,146,0.15)]"
          >
            <div className="flex items-center justify-between border-b border-[#D0D8E8] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#0B4192]">EACE AI Assistant</p>
                <p className="text-[11px] text-[#3A5A8C]">Academy-only support</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded px-2 py-1 text-xs text-[#3A5A8C] hover:bg-[#F0F4FA]">
                Close
              </button>
            </div>

            <div ref={listRef} className="chat-scrollbar h-72 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((message, idx) => (
                <div
                  key={`${message.role}-${idx}`}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    message.role === 'assistant' ? 'bg-[#F0F4FA] text-[#1a1a2e]' : 'ml-auto bg-[#D0D8E8] text-[#1a1a2e]'
                  }`}
                >
                  {message.text}
                </div>
              ))}

              {typing ? (
                <div className="inline-flex items-center gap-1 rounded-xl bg-[#F0F4FA] px-3 py-2 text-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B4192] [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B4192] [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0B4192]" />
                </div>
              ) : null}
            </div>

            <div className="flex gap-2 border-t border-[#D0D8E8] p-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleSend();
                }}
                placeholder="Ask about EACE programs, timings..."
                className="w-full rounded-lg border border-[#B8C9E8] bg-white px-3 py-2 text-sm text-[#1a1a2e] outline-none placeholder:text-[#3A5A8C] focus:border-[#0B4192]"
              />
              <button
                disabled={!canSend}
                onClick={handleSend}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B4192] text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default FloatingAssistant;