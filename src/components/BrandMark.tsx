export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
      role="img"
    >
      <rect x="0" y="0" width="64" height="64" rx="18" fill="#173d33" />
      <rect x="23" y="12" width="18" height="10" rx="4" fill="#f4f7f5" />
      <rect x="15" y="18" width="34" height="34" rx="7" fill="none" stroke="#f4f7f5" strokeWidth="3.5" />
      <rect x="22" y="30" width="12" height="3.5" rx="1.75" fill="#f4f7f5" />
      <rect x="22" y="37" width="12" height="3.5" rx="1.75" fill="#f4f7f5" opacity="0.78" />
      <rect x="22" y="44" width="12" height="3.5" rx="1.75" fill="#f4f7f5" opacity="0.58" />
      <rect x="36" y="30" width="7" height="3.5" rx="1.75" fill="#f4f7f5" opacity="0.78" />
      <rect x="36" y="37" width="7" height="3.5" rx="1.75" fill="#f4f7f5" opacity="0.58" />
      <rect x="36" y="44" width="7" height="3.5" rx="1.75" fill="#f4f7f5" opacity="0.42" />
    </svg>
  );
}
