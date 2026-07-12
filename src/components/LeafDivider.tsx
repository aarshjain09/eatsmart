export function LeafDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 my-6 ${className}`}>
      <span className="h-px w-16 bg-olive/40" />
      <svg width="24" height="14" viewBox="0 0 32 18" fill="none" className="text-leaf">
        <path d="M16 2C12 6 10 10 12 14M16 2C20 6 22 10 20 14M16 2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="h-px w-16 bg-olive/40" />
    </div>
  );
}
