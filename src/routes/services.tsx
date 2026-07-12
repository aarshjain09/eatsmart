import { createFileRoute, Link } from "@tanstack/react-router";
import { LeafDivider } from "@/components/LeafDivider";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Eat Smart" },
      { name: "description", content: "Personalized meal plans, naturopathy support, diet + workout guidance and holistic care for weight, PCOS, thyroid, diabetes and more." },
      { property: "og:title", content: "Services — Eat Smart" },
      { property: "og:description", content: "Personalized, holistic nutrition services." },
    ],
  }),
  component: Services,
});

const services = [
  { t: "Customized Meal Plan", d: "Made for you. Made to fit your body, goals & routine — with foods you actually enjoy.", icon: "📋" },
  { t: "Manage & Improve Naturally", d: "Support for Obesity, PCOD/PCOS, Thyroid, Diabetes, hormonal imbalance and more.", icon: "🌿" },
  { t: "Diet + Workout Guidance", d: "Balanced nutrition paired with the right workout plan for your body type.", icon: "💪" },
  { t: "Home Food. Real Results.", d: "Focus on home-cooked, seasonal meals. No unnecessary supplements or shakes.", icon: "🥗" },
  { t: "Naturopathy Support", d: "Natural therapies and lifestyle recommendations for holistic well-being.", icon: "🍃" },
  { t: "Continuous Guidance", d: "Regular check-ins, motivation and course-correction so you never feel alone.", icon: "🤝" },
];

function Services() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-script text-2xl text-olive">How I help you</p>
        <h1 className="text-4xl md:text-5xl mt-1">Holistic care through better food & better living</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Real food. Real guidance. <span className="text-leaf font-medium">Real you.</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {services.map((s) => (
          <article key={s.t} className="rounded-2xl bg-card p-6 shadow-card border border-border/60 hover:-translate-y-0.5 transition">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="font-serif text-xl text-forest-deep">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </article>
        ))}
      </div>

      {/* PRICING */}
      <div className="mt-14 max-w-3xl mx-auto rounded-[2rem] bg-cream border border-border/60 p-8 md:p-10 shadow-card">
        <div className="text-center">
          <p className="font-script text-2xl text-olive">Simple & transparent</p>
          <h2 className="text-3xl md:text-4xl mt-1">Pricing</h2>
          <LeafDivider />
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

      <div className="mt-14 rounded-3xl bg-sage-light/60 p-8 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl">Ready for a plan that actually fits your life?</h2>
        <p className="mt-3 text-forest-deep/80">Book a consultation — we'll build the right plan together.</p>
        <div className="mt-6 flex gap-3 flex-wrap justify-center">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">Book on WhatsApp</a>
          <Link to="/case-history" className="btn-outline">Check your BMI first</Link>
        </div>
      </div>
    </div>
  );
}
