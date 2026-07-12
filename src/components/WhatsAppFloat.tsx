import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.62_0.17_150)] hover:bg-[oklch(0.55_0.17_150)] text-white pl-3 pr-4 py-3 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.7 9.7 0 0 1 2.3 12C2.3 6.7 6.7 2.3 12 2.3c2.6 0 5 1 6.9 2.9A9.6 9.6 0 0 1 21.7 12c0 5.4-4.4 9.8-9.7 9.8zm5.3-7.3c-.3-.1-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.4.1-.6c.1-.1.3-.3.4-.5s.2-.3.3-.5.1-.4 0-.5-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5H7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.3-.2-.6-.3z"/>
      </svg>
      <span className="text-sm font-medium hidden sm:inline">WhatsApp</span>
    </a>
  );
}
