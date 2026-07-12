import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import doctorImg from "@/assets/doctor.jpg";
import { LeafDivider } from "@/components/LeafDivider";
import { SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Pinal Jain & Contact — Eat Smart" },
      { name: "description", content: "Meet Dr. Pinal Jain — BHMS, Diploma in Dietetics and Nutrition, Naturopathy Expert. Personalized natural care, and easy ways to get in touch." },
      { property: "og:title", content: "About Dr. Pinal Jain & Contact — Eat Smart" },
      { property: "og:description", content: "Natural, personalized nutrition guidance — and how to reach the clinic." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 -m-4 rounded-[2.5rem] bg-sage-light/60 -z-10" />
          <img src={doctorImg} alt={SITE.doctor} width={900} height={1100} className="rounded-[2rem] shadow-soft w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="font-script text-2xl text-olive">Your body is your home.</p>
          <h1 className="text-4xl md:text-5xl mt-2">Meet {SITE.doctor}</h1>
          <p className="text-sm text-leaf font-medium mt-2">{SITE.credentials}</p>
          <LeafDivider className="!justify-start"/>
          <p className="text-forest-deep/90 leading-relaxed">
            I believe your body is your home — and the way to care for it isn't through
            restriction or crash diets, but through <span className="text-leaf font-semibold">the right food, movement and mindset.</span>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            With a background in Homeopathy, Dietetics and Naturopathy, I combine time-tested
            natural wisdom with modern nutrition science to build plans that fit real Indian
            kitchens, real routines, and real lives. No fads. No unnecessary supplements.
            Just balanced, sustainable choices.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              ["Customized meal plans", "for your unique needs & lifestyle."],
              ["Natural approach", "No unnecessary supplements."],
              ["Expert guidance", "Better choices. Better life."],
              ["Naturopathy", "for a healthier, happier you."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-cream-soft p-4 flex gap-3">
                <span className="h-10 w-10 flex-shrink-0 rounded-full bg-forest-deep flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cream w-5 h-5">
                    <path d="M12 3C7 6 5 11 8 15C6 14 5 12 4 10c0 7 4 11 8 11s8-4 8-11c-1 2-2 4-4 5c3-4 2-9-4-12Z"/>
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-forest-deep text-sm">{t}</p>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3 flex-wrap">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">Chat on WhatsApp</a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="btn-outline">{SITE.phone}</a>
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", concern: "Weight management", message: "" });

  const buildMsg = () => {
    const parts = [`Hi Dr. Pinal, I'm ${form.name || "[name]"}.`, `I'd like guidance for: ${form.concern}.`];
    if (form.message.trim()) parts.push(form.message.trim());
    return parts.join("\n\n");
  };

  return (
    <section id="contact" className="mt-20 md:mt-28 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-script text-2xl text-olive">Let's talk</p>
        <h2 className="text-3xl md:text-4xl mt-1">Let's build a healthier, happier you</h2>
        <LeafDivider />
        <p className="text-muted-foreground">Send a quick note — it opens in WhatsApp so we can chat directly.</p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mt-10 max-w-5xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(whatsappLink(buildMsg()), "_blank", "noopener");
          }}
          className="rounded-3xl bg-card p-6 md:p-8 border border-border/60 shadow-card space-y-5"
        >
          <label className="block">
            <span className="text-sm font-medium text-forest-deep">Your name</span>
            <input
              required maxLength={80}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. Priya Sharma"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-forest-deep">What's on your mind?</span>
            <select
              value={form.concern}
              onChange={(e) => setForm({ ...form, concern: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {["Weight management", "PCOD / PCOS", "Thyroid", "Diabetes", "Hormonal balance", "General wellness", "Something else"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-forest-deep">Message (optional)</span>
            <textarea
              rows={4} maxLength={800}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Share a little about your goals or routine…"
            />
          </label>
          <button type="submit" className="btn-primary w-full sm:w-auto">Send via WhatsApp</button>
        </form>

        <aside className="rounded-3xl bg-sage-light/60 p-6 md:p-8 space-y-6">
          <div>
            <p className="font-serif text-2xl text-forest-deep">{SITE.doctor}</p>
            <p className="text-sm text-leaf">{SITE.credentials}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest-deep/60">WhatsApp / Phone</p>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="mt-1 block font-serif text-2xl text-forest-deep hover:text-leaf">
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest-deep/60">Consultation modes</p>
            <ul className="mt-2 space-y-1 text-forest-deep/90 text-sm">
              <li>· Online video / phone consultations</li>
              <li>· Personalized meal plan delivered digitally</li>
              <li>· Regular follow-ups & check-ins</li>
            </ul>
          </div>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
            Chat on WhatsApp
          </a>
          <p className="font-script text-lg text-forest text-center">I'm here to guide you! ♡</p>
        </aside>
      </div>
    </section>
  );
}
