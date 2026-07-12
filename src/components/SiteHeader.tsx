import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";
import { whatsappLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About & Contact" },
  { to: "/services", label: "Services" },
  { to: "/resources", label: "Learn" },
  { to: "/case-history", label: "BMI & Case History" },
  { to: "/daily-update", label: "Daily Update" },
  { to: "/testimonials", label: "Testimonials" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/80 border-b border-border/60">
      <div className="container-page flex items-center justify-between py-3">
        <Logo compact />
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-forest/80 hover:text-forest-deep transition-colors"
              activeProps={{ className: "text-forest-deep font-medium" }}
            >
              {n.label}
            </Link>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            Book Consultation
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-md text-forest-deep"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-cream">
          <div className="container-page py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                className="py-2 text-forest/90"
                activeProps={{ className: "text-forest-deep font-medium" }}
              >
                {n.label}
              </Link>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm mt-2 self-start">
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
