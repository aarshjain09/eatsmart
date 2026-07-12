import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LeafDivider } from "@/components/LeafDivider";
import snacking from "@/assets/knowledge/AF49EA64.png.asset.json";
import plate from "@/assets/knowledge/D6032446.png.asset.json";
import hydrate from "@/assets/knowledge/F1591858.png.asset.json";
import stress from "@/assets/knowledge/4E469B8B.png.asset.json";
import sleep from "@/assets/knowledge/F629335C.png.asset.json";
import meal from "@/assets/knowledge/FDD3AF7F.png.asset.json";
import portion from "@/assets/knowledge/738F375C.png.asset.json";
import fiber from "@/assets/knowledge/3983174F.png.asset.json";
import water from "@/assets/knowledge/61872A75.png.asset.json";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Learn — Guides, Recipes & Workouts | Eat Smart" },
      { name: "description", content: "Practical wellness guides plus healthy recipes and beginner-friendly workout videos handpicked by Dr. Pinal Jain." },
      { property: "og:title", content: "Learn — Guides, Recipes & Workouts | Eat Smart" },
      { property: "og:description", content: "Free wellness guides, meal recipes and workout plans." },
      { property: "og:image", content: plate.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: plate.url },
    ],
  }),
  component: Resources,
});

// Swap these YouTube IDs for Dr. Pinal's own videos when ready.
const recipes = [
  { id: "MTTUbFlvu-o", title: "5-Minute Green Smoothie" },
  { id: "on_4rS1N4NA", title: "PCOS-Friendly Breakfast Bowl" },
  { id: "ZRLIcTgmAAU", title: "Weight-loss Dinner in 15 Min" },
];
const workouts = [
  { id: "UBMk30rjy0o", title: "10-Min Beginner Fat Burn" },
  { id: "ml6cT4AZdqI", title: "Full Body Home Workout" },
  { id: "AnYl6Nk9GOA", title: "Thyroid-Friendly Yoga Flow" },
];

const guides = [
  { img: plate, title: "Build a Healthy Plate", tag: "Nutrition Basics", blurb: "The 50/25/25 rule for vegetables, protein and whole grains — plus easy vegetarian protein options." },
  { img: portion, title: "Portion Control", tag: "Weight Management", blurb: "Eat right, feel light. Simple tricks to master portion sizes without counting calories." },
  { img: meal, title: "Meal Planning Made Easy", tag: "Habits", blurb: "5 simple steps to plan your week, save time and stay consistent with your goals." },
  { img: snacking, title: "Smart Snacking", tag: "Nutrition Basics", blurb: "Vegetarian snack ideas that curb cravings, sustain energy and keep you on track." },
  { img: fiber, title: "Fiber-Rich Foods", tag: "Digestive Health", blurb: "Everything about fiber — benefits, top sources and how to hit 25–30g a day." },
  { img: hydrate, title: "Hydrate Today, Feel Amazing", tag: "Hydration", blurb: "How much water you really need and the best hydrating drinks & foods." },
  { img: water, title: "Stay Hydrated, Stay Healthy", tag: "Hydration", blurb: "Simple daily habits to drink more water and reap the wellness benefits." },
  { img: sleep, title: "Good Sleep, Better You", tag: "Lifestyle", blurb: "7 simple tips for deeper, more restorative sleep — and why it matters." },
  { img: stress, title: "Beat Stress, Boost Health", tag: "Lifestyle", blurb: "Small daily changes to manage stress and protect your digestion, sleep and hormones." },
];

const CHANNEL_URL = "https://www.youtube.com/@drpinaljain";

export function Resources() {
  const [active, setActive] = useState<typeof guides[number] | null>(null);

  return (
    <div className="container-page py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-script text-2xl text-olive">Learn with me</p>
        <h1 className="text-4xl md:text-5xl mt-1">Guides, Recipes & Workouts</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Practical wellness guides plus short, easy videos to make healthy eating & movement effortless.
        </p>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline mt-6 inline-flex">
          <YouTubeIcon className="w-5 h-5"/> Visit YouTube channel
        </a>
      </div>

      {/* Knowledge guides */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl md:text-4xl">Wellness Guides</h2>
          <span className="h-px flex-1 mx-6 bg-border hidden sm:block"/>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => (
            <button
              key={g.title}
              onClick={() => setActive(g)}
              className="group text-left rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card hover:shadow-soft transition-all hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-sage-light/40">
                <img
                  src={g.img.url}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] uppercase tracking-widest text-leaf font-semibold bg-sage-light/60 rounded-full px-3 py-1">
                  {g.tag}
                </span>
                <h3 className="font-serif text-xl text-forest-deep mt-3">{g.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{g.blurb}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <VideoRow title="Meal Recipes" videos={recipes}/>
      <VideoRow title="Workout Plans" videos={workouts}/>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-forest-deep/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] w-full bg-cream rounded-2xl overflow-hidden shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-cream/95 flex items-center justify-center text-forest-deep hover:bg-white shadow-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <div className="overflow-auto max-h-[92vh]">
              <img src={active.img.url} alt={active.title} className="w-full h-auto block" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoRow({ title, videos }: { title: string; videos: { id: string; title: string }[] }) {
  return (
    <section className="mt-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl md:text-4xl">{title}</h2>
        <span className="h-px flex-1 mx-6 bg-border hidden sm:block"/>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <article key={v.id} className="rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card">
            <div className="aspect-video bg-forest-deep">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-forest-deep">{v.title}</p>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-leaf hover:text-forest-deep inline-flex items-center gap-1 mt-1"
              >
                Watch on YouTube →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s-.1-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
    </svg>
  );
}
