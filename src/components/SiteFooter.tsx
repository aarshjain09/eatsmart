import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest-deep text-cream/90">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="[&_span]:!text-cream [&_.text-olive]:!text-sage-light">
            <Logo />
          </div>
          <p className="mt-4 text-sm text-cream/70 max-w-xs">
            Balanced meals. Right guidance. Real results — because good health begins with the right choices.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/75">
            <li><Link to="/about" className="hover:text-cream">About & Contact</Link></li>
            <li><Link to="/services" className="hover:text-cream">Services</Link></li>
            <li><Link to="/resources" className="hover:text-cream">Learn — Guides, Recipes & Workouts</Link></li>
            <li><Link to="/case-history" className="hover:text-cream">BMI & Case History</Link></li>
            <li><Link to="/testimonials" className="hover:text-cream">Testimonials</Link></li>
          </ul>

        </div>
        <div>
          <h4 className="font-serif text-lg text-cream mb-3">Get in touch</h4>
          <p className="text-sm text-cream/75">{SITE.doctor}</p>
          <p className="text-sm text-cream/60">{SITE.credentials}</p>
          <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="mt-3 block text-sm text-cream hover:text-sage-light">
            {SITE.phone}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex btn-outline text-sm !border-cream/40 !text-cream hover:!bg-cream hover:!text-forest-deep">
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-page py-5 text-xs text-cream/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Eat Smart. All rights reserved.</span>
          <span className="font-script text-sm text-sage-light">Eat smart. Live better.</span>
        </div>
      </div>
    </footer>
  );
}
