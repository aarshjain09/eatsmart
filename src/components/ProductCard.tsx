type Props = {
  image: string;
  amazonLink: string;
};

export default function ProductCard({
  image,
  amazonLink,
}: Props) {
  return (
    <a
      href={amazonLink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-white p-6">
        <img
          src={image}
          alt="Amazon Product"
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="border-t border-border p-5">
        <button className="w-full rounded-xl bg-leaf py-3 text-sm font-semibold text-white transition duration-300 hover:bg-leaf/90">
          Buy on Amazon
        </button>
      </div>
    </a>
  );
}