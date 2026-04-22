import { useState } from "react";
import { X, Clock } from "lucide-react";

const EMBARGO_LIFT = new Date("2026-05-04T05:01:00Z");

export function isEmbargoed(): boolean {
  return new Date() < EMBARGO_LIFT;
}

interface EmbargoModalProps {
  onClose: () => void;
}

function EmbargoModal({ onClose }: EmbargoModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="embargo-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-amber-700">
            <Clock size={18} />
            <h2 id="embargo-title" className="font-serif font-bold text-base">Paper Under Embargo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-sm font-sans text-gray-700 leading-relaxed">
          This paper is currently under embargo. Full access will be available at{" "}
          <strong>12:01 AM ET on May 4, 2026</strong>.
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-primary text-primary-foreground font-sans font-medium text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

interface EmbargoLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  href: string;
  children: React.ReactNode;
}

export function EmbargoLink({ href, children, className, ...rest }: EmbargoLinkProps) {
  const [showModal, setShowModal] = useState(false);

  if (!isEmbargoed()) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        className={className}
        data-testid={rest["data-testid"]}
        onClick={e => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        {children}
      </button>
      {showModal && <EmbargoModal onClose={() => setShowModal(false)} />}
    </>
  );
}
