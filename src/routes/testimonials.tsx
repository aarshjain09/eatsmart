import { createFileRoute } from "@tanstack/react-router";
import { LeafDivider } from "@/components/LeafDivider";
import poojaImg from "@/assets/testimonials/pooja.jpeg";
import reenaImg from "@/assets/testimonials/reena.jpeg";
import azraImg from "@/assets/testimonials/azra.jpeg";
import mitaliImg from "@/assets/testimonials/mitali.jpeg";
import shilpaImg from "@/assets/testimonials/shilpa.jpeg";
import tearsImg from "@/assets/testimonials/tears.jpeg";
import shwetaImg from "@/assets/testimonials/shweta.jpeg";
import kavitaImg from "@/assets/testimonials/kavita.jpeg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Eat Smart" },
      { name: "description", content: "Real stories and Instagram video reviews from clients who transformed their health with Dr. Pinal Jain." },
      { property: "og:title", content: "Testimonials — Eat Smart" },
      { property: "og:description", content: "Real stories. Real results." },
    ],
  }),
  component: Testimonials,
});

const written = [
  { name: "Pooja Barodiya", tag: "Weight loss & gut health", src: poojaImg },
  { name: "Reena Doshi", tag: "Menopause · Sugar · Cholesterol", src: reenaImg },
  { name: "Azra", tag: "10 kg weight loss", src: azraImg },
  { name: "Dr Mitali (Mumbai)", tag: "Gut health · Bloating", src: mitaliImg },
  { name: "Shilpa", tag: "Weight loss without starvation", src: shilpaImg },
  { name: "Happy client", tag: "Post-pregnancy · 65.7 kg", src: tearsImg },
  { name: "Shweta (Mumbai)", tag: "Lifestyle transformation", src: shwetaImg },
  { name: "Kavita Joshi", tag: "13 kg weight loss", src: kavitaImg},
];


// Swap these Instagram reel URLs with real client videos.
// Any public reel/post URL from instagram.com works with the embed script.
const reels = [
  { url: "https://www.instagram.com/p/DaNzNkaDUTA/", caption: "Client feedback" },
  { url: "https://www.instagram.com/p/DaKC3syDTVo/", caption: "Client feedback" },
  { url: "https://www.instagram.com/p/DZZudGft_xJ/", caption: "Client feedback" },
  { url: "https://www.instagram.com/p/DVWOv4mDUaU/", caption: "Client feedback" },
  { url: "https://www.instagram.com/reel/C6H1kv7oXk-/", caption: "Sneha's 8 kg journey" },
  { url: "https://www.instagram.com/reel/C7Yc2C_Iqe0/", caption: "PCOS reversal story" },
];

const INSTA_PROFILE = "https://www.instagram.com/eatsmart.drpinaljain?igsh=am4ydTFlMThsdmg4";

function Testimonials() {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-script text-2xl text-olive">Real people, real results</p>
        <h1 className="text-4xl md:text-5xl mt-1">Stories from the Eat Smart family</h1>
        <LeafDivider />
        <p className="text-muted-foreground">
          Small choices today, <span className="text-leaf font-medium">big change tomorrow.</span>
        </p>
      </div>

      {/* Instagram reels */}
      <section className="mt-14">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl">Client videos on Instagram</h2>
            <p className="text-sm text-muted-foreground mt-1">Real journeys — in their own words.</p>
          </div>
          <a href={INSTA_PROFILE} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
            <InstaIcon className="w-4 h-4"/> Follow on Instagram
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((r) => (
            <ReelCard key={r.url} url={r.url} caption={r.caption}/>
          ))}
        </div>
      </section>

      {/* Written */}
      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl text-center">In their words</h2>
        <LeafDivider/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {written.map((t) => (
            <figure key={t.name} className="rounded-2xl overflow-hidden bg-card shadow-card border border-border/60 flex flex-col">
              <a href={t.src} target="_blank" rel="noopener noreferrer" className="block bg-forest-deep">
                <img
                  src={t.src}
                  alt={`WhatsApp feedback from ${t.name}`}
                  loading="lazy"
                  className="w-full h-auto object-contain max-h-[560px] mx-auto"
                />
              </a>
              <figcaption className="px-5 py-4 border-t border-border/60">
                <p className="font-medium text-forest-deep">{t.name}</p>
                <p className="text-xs text-leaf">{t.tag}</p>
              </figcaption>
            </figure>
          ))}
        </div>

      </section>
    </div>
  );
}

function ReelCard({ url, caption }: { url: string; caption: string }) {
  // Instagram's oEmbed iframe — no script needed for basic embed.
  const embedUrl = `${url.replace(/\/$/, "")}/embed/`;
  return (
    <article className="rounded-2xl overflow-hidden bg-card border border-border/60 shadow-card">
      <div className="bg-forest-deep" style={{ aspectRatio: "9 / 14" }}>
        <iframe
          src={embedUrl}
          title={caption}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="font-medium text-forest-deep text-sm">{caption}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-leaf hover:text-forest-deep">
          Open ↗
        </a>
      </div>
    </article>
  );
}

function InstaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
