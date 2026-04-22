import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="text-6xl font-serif font-bold text-primary/20 mb-4">404</div>
        <h1 className="font-serif text-2xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="font-sans text-muted-foreground leading-relaxed mb-8">
          The page you're looking for doesn't exist. Try navigating to one of the sections below.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
