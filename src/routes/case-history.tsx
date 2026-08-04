import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LeafDivider } from "@/components/LeafDivider";
import { whatsappLink } from "@/lib/site";
import measurementGuide from "@/assets/measurement-guide.jpeg";


export const Route = createFileRoute("/case-history")({
  head: () => ({
    meta: [
      { title: "BMI Calculator & Case History Form — Eat Smart" },
      { name: "description", content: "Check your BMI in seconds, then share your case history so Dr. Pinal Jain can design a personalized plan for you." },
      { property: "og:title", content: "BMI & Case History — Eat Smart" },
      { property: "og:description", content: "Free BMI check and secure case history intake — your first step to a personalized plan." },
    ],
  }),
  component: CaseHistory,
});

type Units = "metric" | "imperial";

function classify(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", tone: "text-amber-700", advice: "Focus on nutrient-dense meals and strength-building foods. A personalized plan can help you gain healthily." };
  if (bmi < 25) return { label: "Healthy weight", tone: "text-leaf", advice: "Beautiful! Let's maintain this with balanced nutrition and lifestyle habits that keep you feeling your best." };
  if (bmi < 30) return { label: "Overweight", tone: "text-amber-700", advice: "Small, sustainable changes make the biggest difference. A tailored plan can guide you gently towards your goal." };
  return { label: "Obese", tone: "text-destructive", advice: "You're not alone — many of my clients start here. Personalized diet and naturopathy can bring meaningful, lasting change." };
}


type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  fullName: "", age: "", gender: "Female", email: "", phone: "", city: "",
  heightCm: "", weightKg: "", goal: "",
  neckCm: "", chestCm: "", waistCm: "", hipCm: "",
  conditions: "", medications: "", allergies: "",
  diet: "Vegetarian", mealsPerDay: "3", waterLiters: "2", sleepHours: "7",
  activity: "Moderate", occupation: "", typicalDay: "", notes: "",
};


function CaseHistory() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof initial>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting"); setError(null);
    try {
      const res = await fetch("/api/public/case-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong");
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="container-page py-20 max-w-xl text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-sage-light flex items-center justify-center text-3xl">✓</div>
        <h1 className="text-3xl md:text-4xl mt-6">Thank you!</h1>
        <LeafDivider/>
        <p className="text-muted-foreground">
          Your details are saved securely. Dr. Pinal will review them and get in touch with you soon.
        </p>
        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          <a href={whatsappLink("Hi Dr. Pinal, I just filled out the case history form.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Message on WhatsApp
          </a>
          <Link to="/" className="btn-outline">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-script text-2xl text-olive">First step</p>
        <h1 className="text-4xl md:text-5xl mt-1">BMI & Case History</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Start with a quick BMI check, then share your case history so Dr. Pinal can design a plan that truly fits you.
          Everything is stored securely and only reviewed by the clinic.
        </p>
      </div>

      <BMISection />

      <div className="text-center max-w-2xl mx-auto mt-16">
        <h2 className="text-3xl md:text-4xl">Case History Form</h2>
        <LeafDivider />
        <p className="text-muted-foreground">
          Share a few details so Dr. Pinal can design your personalized plan.
        </p>
      </div>



      <form onSubmit={onSubmit} className="mt-10 max-w-3xl mx-auto space-y-8">
        <Section title="About you">
          <Grid>
            <Text label="Full name *" value={form.fullName} onChange={(v) => update("fullName", v)} required maxLength={120}/>
            <Text label="Age" type="number" value={form.age} onChange={(v) => update("age", v)} min={1} max={120}/>
            <Select label="Gender" value={form.gender} onChange={(v) => update("gender", v)} options={["Female","Male","Other","Prefer not to say"]}/>
            <Text label="Phone / WhatsApp *" value={form.phone} onChange={(v) => update("phone", v)} required maxLength={40}/>
            <Text label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} maxLength={200}/>
            <Text label="City" value={form.city} onChange={(v) => update("city", v)} maxLength={80}/>
          </Grid>
        </Section>

        <Section title="Body & goals">
          <Grid>
            <Text label="Height (cm)" type="number" value={form.heightCm} onChange={(v) => update("heightCm", v)} min={1} max={250}/>
            <Text label="Weight (kg)" type="number" value={form.weightKg} onChange={(v) => update("weightKg", v)} min={1} max={300}/>
            <Text label="Your main goal" value={form.goal} onChange={(v) => update("goal", v)} placeholder="e.g. Lose 8 kg, improve PCOS, more energy"/>
            <Text label="Occupation" value={form.occupation} onChange={(v) => update("occupation", v)}/>
          </Grid>
        </Section>

        <Section title="Body measurements (in cm)">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <Grid>
                <Text label="Height (cm)" type="number" value={form.heightCm} onChange={(v) => update("heightCm", v)} min={1} max={250}/>
                <Text label="Weight (kg)" type="number" value={form.weightKg} onChange={(v) => update("weightKg", v)} min={1} max={300}/>
                <Text label="Your main goal" value={form.goal} onChange={(v) => update("goal", v)} placeholder="e.g. Lose 8 kg, improve PCOS, more energy"/>
                <Text label="Occupation" value={form.occupation} onChange={(v) => update("occupation", v)}/>
                <Text label="Neck" type="number" value={form.neckCm} onChange={(v) => update("neckCm", v)} min={1} max={80} step={0.5}/>
                <Text label="Chest / Bust" type="number" value={form.chestCm} onChange={(v) => update("chestCm", v)} min={1} max={200} step={0.5}/>
                <Text label="Waist" type="number" value={form.waistCm} onChange={(v) => update("waistCm", v)} min={1} max={200} step={0.5}/>
                <Text label="Hip" type="number" value={form.hipCm} onChange={(v) => update("hipCm", v)} min={1} max={200} step={0.5}/>
              </Grid>
              <p className="text-xs text-muted-foreground">
                Use a soft measuring tape. Measure the waist at the narrowest part of your torso and the hip at the widest part. See the reference guide →
              </p>
            </div>
            <figure className="rounded-2xl overflow-hidden border border-border/60 bg-cream-soft">
              <img
                src={measurementGuide}
                alt="How to measure your waist and hips with a soft tape measure"
                className="w-full h-auto"
                loading="lazy"
              />
              <figcaption className="text-xs text-muted-foreground px-3 py-2 text-center">
                Reference: how to measure waist &amp; hips
              </figcaption>
            </figure>
          </div>
        </Section>

        <Section title="Health">
          <Grid>
            <TextArea label="Existing conditions (Thyroid, PCOS, Diabetes, BP…)" value={form.conditions} onChange={(v) => update("conditions", v)}/>
            <TextArea label="Current medications / supplements" value={form.medications} onChange={(v) => update("medications", v)}/>
            <TextArea label="Allergies or foods to avoid" value={form.allergies} onChange={(v) => update("allergies", v)}/>
          </Grid>
        </Section>

        <Section title="Lifestyle">
          <Grid>
            <Select label="Diet preference" value={form.diet} onChange={(v) => update("diet", v)} options={["Vegetarian","Non-vegetarian","Eggetarian","Vegan","Jain"]}/>
            <Select label="Activity level" value={form.activity} onChange={(v) => update("activity", v)} options={["Sedentary","Light","Moderate","Active","Very active"]}/>
            <Text label="Meals per day" type="number" value={form.mealsPerDay} onChange={(v) => update("mealsPerDay", v)} min={1} max={10}/>
            <Text label="Water intake (L/day)" type="number" value={form.waterLiters} onChange={(v) => update("waterLiters", v)} min={0} max={10} step={0.5}/>
            <Text label="Sleep (hours/night)" type="number" value={form.sleepHours} onChange={(v) => update("sleepHours", v)} min={0} max={14} step={0.5}/>
          </Grid>
        </Section>

        <Section title="Anything else">
          <div className="space-y-4">
            <TextArea label="Describe a typical day of eating" value={form.typicalDay} onChange={(v) => update("typicalDay", v)} rows={4}/>
            <TextArea label="Anything else Dr. Pinal should know?" value={form.notes} onChange={(v) => update("notes", v)} rows={3}/>
          </div>
        </Section>

        {error && (
          <div className="rounded-2xl bg-destructive/10 text-destructive px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3 flex-wrap items-center">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting…" : "Submit case history"}
          </button>
          <span className="text-xs text-muted-foreground">
            By submitting, you agree to be contacted about your consultation.
          </span>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-3xl bg-card border border-border/60 p-6 shadow-card">
      <legend className="px-2 font-serif text-lg text-forest-deep">{title}</legend>
      {children}
    </fieldset>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}
function Text({ label, value, onChange, type = "text", required, placeholder, maxLength, min, max, step }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
  placeholder?: string; maxLength?: number; min?: number; max?: number; step?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        required={required} placeholder={placeholder} maxLength={maxLength}
        min={min} max={max} step={step}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
function TextArea({ label, value, onChange, rows = 2 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      <textarea
        rows={rows} value={value} onChange={(e) => onChange(e.target.value)} maxLength={1200}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
    </label>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

function BMISection() {
  const [units, setUnits] = useState<Units>("metric");
  const [heightCm, setHeightCm] = useState("165");
  const [weightKg, setWeightKg] = useState("65");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("5");
  const [weightLb, setWeightLb] = useState("143");

  const bmi = useMemo(() => {
    if (units === "metric") {
      const h = parseFloat(heightCm) / 100;
      const w = parseFloat(weightKg);
      if (!h || !w) return null;
      return +(w / (h * h)).toFixed(1);
    } else {
      const totalIn = parseFloat(heightFt) * 12 + parseFloat(heightIn || "0");
      const w = parseFloat(weightLb);
      if (!totalIn || !w) return null;
      return +((w / (totalIn * totalIn)) * 703).toFixed(1);
    }
  }, [units, heightCm, weightKg, heightFt, heightIn, weightLb]);

  const result = bmi ? classify(bmi) : null;
  const pct = bmi ? Math.max(0, Math.min(100, ((bmi - 15) / (40 - 15)) * 100)) : 0;

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl">BMI Calculator</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
          A quick starting point — not the whole story. Your habits, hormones and lifestyle matter more.
        </p>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl bg-card p-6 md:p-8 border border-border/60 shadow-card">
          <div className="inline-flex rounded-full bg-cream-soft p-1 text-sm">
            {(["metric", "imperial"] as Units[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnits(u)}
                className={`px-4 py-1.5 rounded-full transition ${units === u ? "bg-forest-deep text-cream" : "text-forest-deep/70"}`}
              >
                {u === "metric" ? "cm / kg" : "ft / lb"}
              </button>
            ))}
          </div>

          {units === "metric" ? (
            <div className="mt-6 space-y-5">
              <BMIField label="Height (cm)" value={heightCm} onChange={setHeightCm} min={50} max={250} />
              <BMIField label="Weight (kg)" value={weightKg} onChange={setWeightKg} min={20} max={250} />
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <BMIField label="Height (ft)" value={heightFt} onChange={setHeightFt} min={3} max={8} />
                <BMIField label="Height (in)" value={heightIn} onChange={setHeightIn} min={0} max={11} />
              </div>
              <BMIField label="Weight (lb)" value={weightLb} onChange={setWeightLb} min={50} max={500} />
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-forest-deep text-cream p-6 md:p-8 flex flex-col">
          <p className="text-cream/70 text-sm">Your BMI</p>
          <p className="font-serif text-7xl mt-1 !text-cream">{bmi ?? "—"}</p>
          {result && (
            <p className={`mt-1 font-medium ${result.tone === "text-leaf" ? "text-sage-light" : "text-amber-300"}`}>
              {result.label}
            </p>
          )}
          <div className="mt-6">
            <div className="h-3 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 via-40% to-red-400 relative">
              {bmi && (
                <div className="absolute -top-1 h-5 w-1 bg-cream rounded" style={{ left: `${pct}%` }} />
              )}
            </div>
            <div className="flex justify-between text-[10px] text-cream/60 mt-2">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-cream/80 flex-1">
            {result?.advice ?? "Enter your details to see your BMI and a gentle recommendation."}
          </p>

          <a
            href={whatsappLink(bmi ? `Hi Dr. Pinal, my BMI is ${bmi} (${result?.label}). I'd like guidance.` : undefined)}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary !bg-cream !text-forest-deep hover:!bg-sage-light mt-6 self-start"
          >
            Get personalized guidance
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 max-w-xl mx-auto">
        BMI is a screening tool, not a diagnosis. It doesn't account for muscle mass, bone density, or body composition. Always consult a professional for a full assessment.
      </p>
    </div>
  );
}

function BMIField({ label, value, onChange, min, max }: { label: string; value: string; onChange: (v: string) => void; min: number; max: number }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="w-28 rounded-full border border-input bg-background px-4 py-2 text-forest-deep focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="range"
          value={value || min}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="flex-1 accent-[oklch(0.38_0.08_145)]"
        />
      </div>
    </label>
  );
}

