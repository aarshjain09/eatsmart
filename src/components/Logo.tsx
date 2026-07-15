import { Link } from "@tanstack/react-router";
import logo from "@/assets/eatsmart-logo.jpeg";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="Eat Smart — Dr. Pinal Jain" className="inline-flex items-center">
      <img
        src={logo}
        alt="Eat Smart — Dr. Pinal Jain"
        className={compact ? "h-12 md:h-14 w-auto" : "h-20 md:h-24 w-auto"}
      />
    </Link>
  );
}
