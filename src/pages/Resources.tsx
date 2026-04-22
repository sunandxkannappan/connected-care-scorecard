import { Mail, ExternalLink } from "lucide-react";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const KEY_LINKS = [
  {
    title: "Bill S-5 official page",
    description: "Official Parliament of Canada bill page for S-5, the legislation aimed at building a more connected health care system.",
    url: "https://www.parl.ca/legisinfo/en/bill/45-1/s-5"
  },
  {
    title: "Government of Canada release on S-5",
    description: "Government of Canada news release announcing the legislation to build a more connected health care system.",
    url: "https://www.canada.ca/en/health-canada/news/2026/02/the-government-of-canada-introduces-legislation-to-build-a-more-connected-health-care-system.html"
  },
  {
    title: "Shared Pan-Canadian Interoperability Roadmap",
    description: "Canada Health Infoway's roadmap outlining the national direction for connected care.",
    url: "https://www.infoway-inforoute.ca/en/component/edocman/resources/interoperability/6444-connecting-you-to-modern-health-care-shared-pan-canadian-interoperability-roadmap"
  },
  {
    title: "Interoperability Saves Lives",
    description: "A report describing why interoperable health data matters for patient safety, efficiency, and better care delivery.",
    url: "https://cpsa.ca/wp-content/uploads/2023/11/Interoperability-Saves-Lives-Final.pdf"
  },
  {
    title: "CMA: How interoperability in health care can save lives",
    description: "Canadian Medical Association article on how interoperability in health care can save lives.",
    url: "https://www.cma.ca/latest-stories/how-interoperability-health-care-can-save-lives"
  },
  {
    title: "CIHI: Connected care",
    description: "Canadian Institute for Health Information overview of connected care and the need for better health data flow.",
    url: "https://www.cihi.ca/en/connected-care"
  }
];

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "https://connectedcarescorecard.ca";
const SHARE_TEXT_SHORT = "How connected is your care? Explore Canada's first comprehensive EHR interoperability scorecard: 13 jurisdictions, 20 sub-dimensions.";

function shareOnTwitter() {
  const params = new URLSearchParams({ text: SHARE_TEXT_SHORT, url: SITE_URL });
  window.open(`https://twitter.com/intent/tweet?${params.toString()}`, "_blank", "noopener,noreferrer");
}

function shareOnLinkedIn() {
  const params = new URLSearchParams({ url: SITE_URL });
  window.open(`https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`, "_blank", "noopener,noreferrer");
}

export default function Resources() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-sans tracking-widest uppercase text-primary font-semibold mb-3">Resources</div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-resources">
            Resources
          </h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Explore supporting links and share the scorecard.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-14">
          {/* Key links */}
          <div data-testid="section-key-links">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Key links</h2>
            <div className="space-y-3">
              {KEY_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-card border border-card-border rounded-lg p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                  data-testid={`link-key-${i}`}
                >
                  <div className="flex items-start gap-3">
                    <ExternalLink size={14} className="text-primary mt-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <p className="font-sans font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                        {link.title}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Share */}
          <div data-testid="section-share">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Share the scorecard</h2>
            <p className="font-sans text-sm text-muted-foreground mb-5 leading-relaxed">
              Help spread awareness of Canadian EHR interoperability by sharing the scorecard with your network.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={shareOnTwitter}
                className="inline-flex items-center gap-2.5 bg-black text-white font-sans font-semibold text-sm px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                data-testid="button-share-twitter"
              >
                <XIcon />
                Share on X / Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-5 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0077b5" }}
                data-testid="button-share-linkedin"
              >
                <LinkedInIcon />
                Share on LinkedIn
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground font-sans">
              Clicking these buttons opens a pre-populated post with a link to this scorecard. The scorecard's preview image will be included automatically when the link is shared.
            </p>
          </div>

          {/* Contact */}
          <div data-testid="section-contact">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Contact</h2>
            <div className="bg-card border border-card-border rounded-xl p-6">
              <p className="font-sans text-base text-foreground/80 leading-relaxed mb-5">
                For questions about the research, data, or this website:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-foreground">Sunand Kannappan <span className="font-normal text-muted-foreground">(Lead author)</span></p>
                    <a
                      href="mailto:sunand.kannappan@ucalgary.ca"
                      className="font-sans text-sm text-primary hover:underline underline-offset-2"
                      data-testid="link-contact-lead"
                    >
                      sunand.kannappan@ucalgary.ca
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-foreground">Dr. Braden Manns <span className="font-normal text-muted-foreground">(Corresponding author)</span></p>
                    <a
                      href="mailto:bjmanns@ucalgary.ca"
                      className="font-sans text-sm text-primary hover:underline underline-offset-2"
                      data-testid="link-contact-email"
                    >
                      bjmanns@ucalgary.ca
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
