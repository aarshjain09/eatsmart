import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LeafDivider } from "@/components/LeafDivider";
import { whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/daily-update")({
  head: () => ({
    meta: [
      { title: "Daily & Weekly Update — Eat Smart" },
      { name: "description", content: "Send Dr. Pinal your daily or weekly progress — weight, step count, meals, cheat meal and a photo — in one quick form." },
      { property: "og:title", content: "Daily & Weekly Update — Eat Smart" },
      { property: "og:description", content: "Log your weight, steps, meals and cheat meal — with an optional photo — so Dr. Pinal can guide you week by week." },
    ],
  }),
  component: DailyUpdate,
});

type Status = "idle" | "submitting" | "success" | "error";

const initial = {
  fullName: "",
  phone: "",
  date: new Date().toISOString().slice(0, 10),
  weight: "",
  steps: "",
  meals: "",
  cheatMeal: "",
  notes: "",
};

function DailyUpdate() {
  const [form, setForm] = useState(initial);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof initial>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function onPickImage(f: File | null) {
    setImage(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      if (image) body.append("image", image);

      const res = await fetch("/api/public/daily-update", { method: "POST", body });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong");
      setStatus("success");
      setForm({ ...initial, fullName: form.fullName, phone: form.phone });
      onPickImage(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="container-page py-16 md:py-20 max-w-xl text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-sage-light flex items-center justify-center text-3xl">✓</div>
        <h1 className="text-3xl md:text-4xl mt-6">Update saved!</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Dr. Pinal has your latest numbers. Keep going — one honest day at a time.
        </p>
        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          <button onClick={() => setStatus("idle")} className="btn-primary">
            Log another update
          </button>
          <a href={whatsappLink("Hi Dr. Pinal, I just submitted my daily update.")} target="_blank" rel="noopener noreferrer" className="btn-outline">
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
        <p className="font-script text-2xl text-olive">Stay on track</p>
        <h1 className="text-4xl md:text-5xl mt-1">Daily / Weekly Update</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Log your weight, step count, meals and any cheat meal — add a photo if you'd like.
          Small check-ins keep your plan personal and moving forward.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 max-w-3xl mx-auto space-y-8">
        <Section title="Who & when">
          <Grid>
            <Text label="Full name *" value={form.fullName} onChange={(v) => update("fullName", v)} required maxLength={120} />
            <Text label="Phone / WhatsApp *" value={form.phone} onChange={(v) => update("phone", v)} required maxLength={40} />
            <Text label="Date *" type="date" value={form.date} onChange={(v) => update("date", v)} required />
          </Grid>
        </Section>

        <Section title="Today's numbers">
          <Grid>
            <Text label="Weight (kg)" type="number" value={form.weight} onChange={(v) => update("weight", v)} min={20} max={300} step={0.1} placeholder="e.g. 68.4" />
            <Text label="Step count" type="number" value={form.steps} onChange={(v) => update("steps", v)} min={0} max={100000} placeholder="e.g. 7500" />
          </Grid>
        </Section>

        <Section title="Meals & cheat meal">
          <div className="space-y-4">
            <TextArea
              label="Meals (Breakfast / Lunch / Dinner / Snacks)"
              value={form.meals}
              onChange={(v) => update("meals", v)}
              rows={5}
              placeholder={"B: Poha with veg\nL: 2 roti, dal, sabzi, salad\nD: Moong soup + paneer bhurji\nS: Fruit, buttermilk"}
            />
            <TextArea
              label="Cheat meal (if any)"
              value={form.cheatMeal}
              onChange={(v) => update("cheatMeal", v)}
              rows={2}
              placeholder="e.g. 2 slices of pizza after dinner"
            />
            <TextArea
              label="Notes (energy, sleep, cravings, workout…)"
              value={form.notes}
              onChange={(v) => update("notes", v)}
              rows={3}
            />
          </div>
        </Section>

        <Section title="Photo (optional)">
          <p className="text-sm text-muted-foreground mb-3">
            Attach a progress photo, meal picture, or a screenshot of your step count. Uploaded to Dr. Pinal's private Drive.
          </p>
          <div className="flex flex-wrap items-start gap-4">
            <label className="btn-outline cursor-pointer">
              {image ? "Change photo" : "Choose photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onPickImage(e.target.files?.[0] ?? null)}
              />
            </label>
            {image && (
              <button type="button" onClick={() => onPickImage(null)} className="text-sm text-muted-foreground underline">
                Remove
              </button>
            )}
            {preview && (
              <figure className="rounded-2xl overflow-hidden border border-border/60 bg-cream-soft max-w-[220px]">
                <img src={preview} alt="Selected preview" className="w-full h-auto" />
                <figcaption className="text-xs text-muted-foreground px-3 py-2 text-center truncate">
                  {image?.name}
                </figcaption>
              </figure>
            )}
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
            {status === "submitting" ? "Saving…" : "Send update"}
          </button>
          <span className="text-xs text-muted-foreground">
            Saved securely to Dr. Pinal's tracking sheet.
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
function TextArea({ label, value, onChange, rows = 2, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-forest-deep">{label}</span>
      <textarea
        rows={rows} value={value} onChange={(e) => onChange(e.target.value)} maxLength={2000}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-input bg-background px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring resize-none whitespace-pre-wrap"
      />
    </label>
  );
}
