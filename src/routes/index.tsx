import { createFileRoute, Link } from "@tanstack/react-router";
import { LeafDivider } from "@/components/LeafDivider";
import heroBowl from "@/assets/hero-bowl.jpg";
import smoothie from "@/assets/smoothie.jpg";
import { SITE, whatsappLink } from "@/lib/site";
import poojaImg from "@/assets/testimonials/pooja.jpeg";
import azraImg from "@/assets/testimonials/azra.jpeg";
import kavitaImg from "@/assets/testimonials/kavita.jpeg";
import shilpaImg from "@/assets/testimonials/shilpa.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eat Smart — Personalized Nutrition & Naturopathy" },
      { name: "description", content: "Smart choices today, better health tomorrow. Personalized meal plans and natural care from Dr. Pinal Jain." },
      { property: "og:title", content: "Eat Smart — Personalized Nutrition & Naturopathy" },
      { property: "og:description", content: "Smart choices today, better health tomorrow." },
    ],
  }),
  component: Index,
});

const highlights = [
  { title: "Eat Right", sub: "Feel Light" },
  { title: "Better Health", sub: "Every Day" },
  { title: "Sustainable", sub: "Results" },
];

const conditions = [
  { label: "Obesity / Weight", icon: "⚖️" },
  { label: "PCOD / PCOS", icon: "🌸" },
  { label: "Thyroid", icon: "🦋" },
  { label: "Diabetes", icon: "💧" },
  { label: "Hormonal Balance", icon: "🌿" },
];

const differentiators = [
  "Personalized plans for your unique needs & routine",
  "Focus on natural, home-cooked & seasonal foods",
  "No crash diets. No fads. Just sustainable results.",
  "Guidance, motivation & continuous support",
  "Small changes. Lasting impact.",
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <LeafOrnament className="absolute -top-6 -left-4 w-56 opacity-70 rotate-12" />
        <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div>
            <p className="font-script text-2xl text-olive">It's all about your choices!</p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              Smart choices today,<br/>
              <span className="text-leaf">better health</span> tomorrow.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Personalized diet plans, naturopathy support and gentle guidance from
              <span className="text-forest-deep font-medium"> {SITE.doctor}</span> — because your body deserves the right food, not less food.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Your Consultation
              </a>
              <Link to="/case-history" className="btn-outline">Check Your BMI</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-2 max-w-md">
              {highlights.map((h) => (
                <div key={h.title} className="text-center">
                  <div className="mx-auto h-14 w-14 rounded-full bg-sage-light flex items-center justify-center">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest-deep">
                      <path d="M4 12c0 4 4 8 8 8s8-4 8-8H4z"/>
                      <path d="M12 12V4M9 6c1 2 2 4 3 6M15 6c-1 2-2 4-3 6"/>
                    </svg>
                  </div>
                  <p className="mt-2 text-xs font-medium text-forest-deep">{h.title}</p>
                  <p className="text-xs text-leaf">{h.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-[3rem] bg-sage-light/50 -z-10" />
            <img
              src={heroBowl}
              alt="Fresh Buddha bowl with quinoa, chickpeas, avocado and vegetables"
              width={1280}
              height={1280}
              className="rounded-[2.5rem] shadow-soft w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -left-4 md:-left-8 rounded-full bg-forest-deep text-cream px-6 py-4 shadow-soft text-center">
              <p className="font-serif text-xs tracking-widest">REAL FOOD</p>
              <p className="font-serif text-xs tracking-widest">REAL CHANGE</p>
              <p className="font-serif text-xs tracking-widest text-sage-light">REAL YOU</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMISE STRIP */}
      <section className="container-page py-12">
        <div className="rounded-3xl bg-sage-light/60 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
          <div className="flex gap-4 items-start">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-forest-deep flex items-center justify-center">
              <LeafIcon className="text-cream w-6 h-6"/>
            </div>
            <p className="text-forest-deep">
              Balanced meals. Right guidance. <span className="font-semibold text-leaf">Real results.</span>
            </p>
          </div>
          <div className="flex gap-4 items-start md:border-l border-forest/20 md:pl-6">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-forest-deep/10 flex items-center justify-center">
              <LeafIcon className="text-forest-deep w-6 h-6"/>
            </div>
            <p className="text-forest-deep">
              Because good health begins with the <span className="font-semibold text-leaf">right choices.</span>
            </p>
          </div>
        </div>
      </section>

      {/* HOW I HELP */}
      <section className="container-page py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl">How I Help You</h2>
          <LeafDivider />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {[
            { t: "Personalized Meal Plans", d: "Made for you. Made to fit your body, goals & routine." },
            { t: "Manage & Improve Naturally", d: "Support for Obesity, PCOD/PCOS, Thyroid, Diabetes & more." },
            { t: "Diet + Workout Guidance", d: "Balanced nutrition with the right workout plan." },
            { t: "Home Food. Real Results.", d: "Focus on home-made meals. No unnecessary supplements." },
            { t: "Naturopathy Support", d: "Natural therapies & lifestyle tips for holistic well-being." },
            { t: "Continuous Guidance", d: "Motivation and support at every step of your journey." },
          ].map((c) => (
            <article key={c.t} className="rounded-2xl bg-card p-6 shadow-card border border-border/60 hover:shadow-soft transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-sage-light flex items-center justify-center mb-4">
                <LeafIcon className="text-forest-deep w-6 h-6"/>
              </div>
              <h3 className="font-serif text-xl text-forest-deep">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="bg-cream-soft py-16">
        <div className="container-page">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl uppercase tracking-wide">Conditions I Can Help With</h2>
            <LeafDivider />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8">
            {conditions.map((c) => (
              <div key={c.label} className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-sage-light flex items-center justify-center text-4xl shadow-card">
                  {c.icon}
                </div>
                <p className="mt-3 font-medium text-forest-deep">{c.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white/80 p-5 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-forest-deep flex-shrink-0 flex items-center justify-center">
              <LeafIcon className="text-cream w-5 h-5"/>
            </div>
            <p className="text-forest-deep">
              The right meal plan & lifestyle can bring the <span className="text-leaf font-semibold">right change.</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES DIFFERENT + smoothie image */}
      <section className="container-page py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src={smoothie}
            alt="Green smoothie with apple and measuring tape"
            width={1024}
            height={1024}
            loading="lazy"
            className="rounded-[2.5rem] shadow-soft w-full object-cover"
          />
          <div className="absolute -top-4 -right-2 md:-right-6 max-w-[220px] rounded-2xl bg-cream border border-border/60 px-4 py-3 shadow-card">
            <p className="font-script text-lg text-forest">You don't need less food,</p>
            <p className="font-script text-lg text-leaf">you need the right food!</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl">What makes <span className="text-leaf">Eat Smart</span> different?</h2>
          <LeafDivider className="!justify-start"/>
          <ul className="mt-4 space-y-4">
            {differentiators.map((d) => (
              <li key={d} className="flex gap-3 items-start">
                <span className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-sage-light flex items-center justify-center">
                  <LeafIcon className="text-forest-deep w-4 h-4"/>
                </span>
                <p className="text-forest-deep">{d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link to="/services" className="btn-outline">See all services →</Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="container-page py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-script text-2xl text-olive">Simple & transparent</p>
          <h2 className="text-4xl md:text-5xl mt-1">Pricing</h2>
          <LeafDivider />
        </div>
        <div className="mt-10 max-w-3xl mx-auto rounded-[2rem] bg-cream border border-border/60 p-8 md:p-10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">3-Month Plan</p>
              <p className="text-4xl md:text-5xl font-serif text-forest-deep mt-1">₹7,500</p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-lg font-medium text-forest-deep">3 Months</p>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              "Detailed consultation for case history",
              "2 Diet Plans",
              "Workout Plan",
              "Food Recipes",
              "Weekly follow-up",
              "Guidance and support",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-leaf/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-forest-deep">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </span>
                <p className="text-sm text-forest-deep">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-sage-light/50 p-5">
            <p className="font-medium text-forest-deep">Payment Schedule</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-leaf font-medium">1.</span> 1st Payment — once the 1st Diet Plan is provided</li>
              <li className="flex gap-2"><span className="text-leaf font-medium">2.</span> 2nd Payment — after 1.5 months</li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book Your Consultation
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="bg-cream-soft py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-script text-2xl text-olive">Real people, real results</p>
            <h2 className="text-4xl md:text-5xl mt-1">What clients say</h2>
            <LeafDivider />
            <p className="text-muted-foreground">
              A few honest words from the <span className="text-leaf font-medium">Eat Smart family.</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              { name: "Pooja Barodiya", tag: "Weight loss & gut health", src: poojaImg },
              { name: "Azra", tag: "10 kg weight loss", src: azraImg },
              { name: "Shilpa", tag: "No starvation", src: shilpaImg },
              { name: "Kavita Joshi", tag: "13 kg weight loss", src: kavitaImg },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl overflow-hidden bg-card shadow-card border border-border/60 flex flex-col">
                <a href={t.src} target="_blank" rel="noopener noreferrer" className="block bg-forest-deep">
                  <img
                    src={t.src}
                    alt={`WhatsApp feedback from ${t.name}`}
                    loading="lazy"
                    className="w-full h-auto object-contain max-h-[320px] mx-auto"
                  />
                </a>
                <figcaption className="px-4 py-3 border-t border-border/60">
                  <p className="font-medium text-forest-deep text-sm truncate">{t.name}</p>
                  <p className="text-xs text-leaf">{t.tag}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <blockquote className="mt-10 max-w-2xl mx-auto rounded-2xl bg-white/80 border border-border/60 p-6 text-center">
            <p className="font-script text-2xl text-forest-deep">"Doctor is very supportive and always available for guidance. I lost weight without starving — just real food and small changes."</p>
            <footer className="mt-3 text-sm text-muted-foreground">— Happy client</footer>
          </blockquote>

          <div className="mt-8 text-center">
            <Link to="/testimonials" className="btn-outline">Read all stories →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16 pt-16">

        <div className="rounded-[2.5rem] bg-forest-deep text-cream p-10 md:p-14 text-center relative overflow-hidden">
          <LeafOrnament className="absolute top-4 right-6 w-40 text-sage-light/30" />
          <p className="font-script text-3xl text-sage-light">Ready to take the</p>
          <h2 className="text-4xl md:text-5xl !text-cream mt-2">next step?</h2>
          <p className="mt-4 text-cream/80 max-w-xl mx-auto">
            Let's build a healthier, happier you — together. Small changes today, remarkable results tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-cream !text-forest-deep hover:!bg-sage-light">
              Book Your Consultation
            </a>
            <Link to="/about" className="btn-outline !border-cream/50 !text-cream hover:!bg-cream hover:!text-forest-deep">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M12 3C7 6 5 11 8 15C6 14 5 12 4 10c0 7 4 11 8 11s8-4 8-11c-1 2-2 4-4 5c3-4 2-9-4-12Z"/>
      <path d="M12 21v-8" strokeLinecap="round"/>
    </svg>
  );
}

function LeafOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.2" className="text-leaf/40">
        <path d="M20 40 Q60 20 100 60 Q140 100 180 80"/>
        <path d="M40 40 l10 10 M55 55 l10 10 M75 75 l10 10 M95 95 l10 10"/>
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse key={i} cx={30 + i * 25} cy={30 + i * 20} rx="12" ry="6" transform={`rotate(${20 + i * 15} ${30 + i * 25} ${30 + i * 20})`} fill="currentColor" className="text-sage/50"/>
        ))}
      </g>
    </svg>
  );
}
