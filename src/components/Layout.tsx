import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/why-connected-care", label: "Why Connected Care?" },
  { href: "/scorecard", label: "The Scorecard" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" data-testid="link-logo">
              <div className="flex items-center gap-2.5 cursor-pointer">
                <BrandMark className="h-10 w-10" />
                <span className="text-[17px] sm:text-[19px] font-serif font-bold leading-none tracking-[-0.02em] whitespace-nowrap">Connected Care Scorecard</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
              {NAV_LINKS.map(link => (
                <Link key={link.href} to={link.href} data-testid={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  <span className={`px-3 py-2 rounded text-sm font-sans font-medium transition-colors cursor-pointer ${
                    location.pathname === link.href
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            <button
              className="md:hidden p-2 rounded text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-primary" data-testid="nav-mobile">
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} to={link.href} data-testid={`mobile-nav-link-${link.href}`}>
                  <span
                    className={`block px-3 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                      location.pathname === link.href
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="w-full min-w-0">
              <h3 className="font-serif font-bold text-base mb-3">Connected Care Scorecard</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                A companion to the CMAJ paper, this public scorecard explores electronic health record interoperability across all 13 Canadian provinces and territories in a simple, clickable format.
              </p>
            </div>
            <div className="w-full min-w-0">
              <h3 className="font-serif font-bold text-base mb-3">Citation</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Kannappan S, Hastings S, Forster A, Dean S, Hollett G, Hagens S, Gheorghiu B, Affleck E, Snyman C, Adams O, Williamson T, Manns B. “The current state of electronic health records across Canada: an environmental scan and interoperability maturity assessment.” CMAJ. 2026.
              </p>
            </div>
            <div className="w-full min-w-0">
              <h3 className="font-serif font-bold text-base mb-3">Contact</h3>
              <p className="text-sm text-white/70 mb-1">Questions or feedback:</p>
              <a href="mailto:sunand.kannappan@ucalgary.ca" className="text-sm text-white/90 hover:text-white underline underline-offset-2 block" data-testid="link-footer-lead">
                sunand.kannappan@ucalgary.ca
              </a>
              <a href="mailto:bjmanns@ucalgary.ca" className="text-sm text-white/90 hover:text-white underline underline-offset-2 block mt-0.5" data-testid="link-footer-email">
                bjmanns@ucalgary.ca
              </a>
              <p className="text-xs text-white/50 mt-4">
                Ethics approval: University of Calgary REB23-1135
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/15 text-xs text-white/50 text-center">
            © 2026 Connected Care Scorecard.
          </div>
        </div>
      </footer>
    </div>
  );
}
