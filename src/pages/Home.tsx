import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, FileText, Building2, Scale, GraduationCap, Server, Users, Building, Smartphone } from "lucide-react";
import { JURISDICTIONS, DIMENSIONS, TOTAL_SUB_DIMENSIONS } from "@/data/scorecard";
import type { LucideIcon } from "lucide-react";

const FIGURE2_ENABLERS: { name: string; desc: string; icon: LucideIcon }[] = [
  {
    name: "Governance",
    desc: "Decision-making bodies and processes by which interoperability efforts are managed and coordinated within a province",
    icon: Building2
  },
  {
    name: "Legislation and standards",
    desc: "Regulatory and legal frameworks that establish and enforce standards for interoperability",
    icon: Scale
  },
  {
    name: "Incentives and capacity building",
    desc: "Financial and nonfinancial mechanisms designed to encourage and support providers in adopting interoperability",
    icon: GraduationCap
  },
  {
    name: "Technical infrastructure",
    desc: "The technological foundation and systems that support the exchange and integration of health data",
    icon: Server
  }
];

const FIGURE2_STATUS: { name: string; desc: string; icon: LucideIcon }[] = [
  {
    name: "Community EHRs",
    desc: "Systems and adoption supporting exchange and integration of health data within community care settings",
    icon: Users
  },
  {
    name: "Hospital EHRs",
    desc: "Systems and adoption supporting exchange and integration of health data within hospital care settings",
    icon: Building
  },
  {
    name: "Patient portals",
    desc: "Systems enabling patients to access and interact with their health data, across all care settings",
    icon: Smartphone
  },
  {
    name: "System analytics",
    desc: "Capabilities of the provincial health system to leverage data for evidence-based decisions and performance monitoring",
    icon: BarChart3
  }
];

const HEATMAP_HEADER_BG = "#1A7A6E";

export default function Home() {
  const numDimensions = DIMENSIONS.length;

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="heading-hero">
            How connected is your care?
          </h1>
          <p className="font-sans text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Canada has near-universal EHR adoption, yet the ability to securely share health data across providers, settings, and systems remains uneven. This scorecard measures electronic health record interoperability across all 13 Canadian provinces and territories using a structured maturity model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scorecard"
              data-testid="link-hero-scorecard"
              className="inline-flex items-center gap-2 bg-white text-primary font-sans font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors shadow-lg"
            >
              Explore the Scorecard
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/why-connected-care"
              data-testid="link-hero-why"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-sans font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              Why does this matter?
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-12 px-4 bg-secondary/40 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div data-testid="stat-jurisdictions">
              <div className="text-4xl font-serif font-bold text-primary">{JURISDICTIONS.length}</div>
              <div className="text-sm font-sans text-muted-foreground mt-1">Jurisdictions assessed</div>
            </div>
            <div data-testid="stat-dimensions">
              <div className="text-4xl font-serif font-bold text-primary">{numDimensions}</div>
              <div className="text-sm font-sans text-muted-foreground mt-1">Dimensions evaluated</div>
            </div>
            <div data-testid="stat-subdimensions">
              <div className="text-4xl font-serif font-bold text-primary">{TOTAL_SUB_DIMENSIONS}</div>
              <div className="text-sm font-sans text-muted-foreground mt-1">Sub-dimensions scored</div>
            </div>
          </div>
        </div>
      </section>

      {/* What we measured — mirrors Figure 2 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">What we measured</h2>
          <p className="text-center text-muted-foreground font-sans mb-10 max-w-2xl mx-auto">
            The maturity model assesses each jurisdiction across eight dimensions: four <strong>Interoperability Enablers</strong> (the structural conditions that make interoperability possible) and four <strong>Interoperability Status</strong> dimensions (the current state of digital health data exchange in different care settings). Each dimension is scored at the sub-dimension level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Enablers column */}
            <div>
              <div
                className="text-center text-white font-sans font-bold text-sm py-3 px-4 rounded-t-lg"
                style={{ backgroundColor: HEATMAP_HEADER_BG }}
              >
                Interoperability enablers
              </div>
              <div className="border border-t-0 rounded-b-lg overflow-hidden" style={{ borderColor: "#a7d7d3" }}>
                {FIGURE2_ENABLERS.map((item, i) => (
                  <div key={item.name} className={`p-4 ${i < FIGURE2_ENABLERS.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#d1ecea" }}>
                    <h3 className="font-sans font-bold text-sm mb-1 flex items-center gap-1.5" style={{ color: HEATMAP_HEADER_BG }}>
                      <item.icon size={14} className="flex-shrink-0" />
                      {item.name}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status column */}
            <div>
              <div
                className="text-center text-white font-sans font-bold text-sm py-3 px-4 rounded-t-lg"
                style={{ backgroundColor: HEATMAP_HEADER_BG }}
              >
                Interoperability status
              </div>
              <div className="border border-t-0 rounded-b-lg overflow-hidden" style={{ borderColor: "#a7d7d3" }}>
                {FIGURE2_STATUS.map((item, i) => (
                  <div key={item.name} className={`p-4 ${i < FIGURE2_STATUS.length - 1 ? "border-b" : ""}`} style={{ borderColor: "#d1ecea" }}>
                    <h3 className="font-sans font-bold text-sm mb-1 flex items-center gap-1.5" style={{ color: HEATMAP_HEADER_BG }}>
                      <item.icon size={14} className="flex-shrink-0" />
                      {item.name}
                    </h3>
                    <p className="text-xs font-sans text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maturity levels */}
      <section className="py-14 px-4 bg-secondary/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2 text-center">Maturity levels</h2>
          <p className="text-center text-sm font-sans text-muted-foreground mb-8 max-w-xl mx-auto">
            Each sub-dimension is independently rated Basic, Emerging, Advanced, or Not Applicable. There are no dimension-level or jurisdiction-level aggregate scores, only the granular sub-dimension ratings shown in the heatmap.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                level: "Basic",
                bg: "#FFFFFF",
                border: "#d1d5db",
                text: "#374151",
                desc: "Initial systems or policies exist but are limited in scope, adoption, or integration."
              },
              {
                level: "Emerging",
                bg: "#7EC9C4",
                border: "#5eada8",
                text: "#134e4a",
                desc: "Moderate progress; some interoperability features are in place but significant gaps remain."
              },
              {
                level: "Advanced",
                bg: "#1A7A6E",
                border: "#145e54",
                text: "#ffffff",
                desc: "Robust, integrated systems with broad adoption and strong interoperability across care settings."
              },
              {
                level: "Not Applicable",
                bg: "#111111",
                border: "#000000",
                text: "#ffffff",
                desc: "This sub-dimension does not apply given the jurisdiction's context (e.g., single-EHR territory)."
              }
            ].map(item => (
              <div
                key={item.level}
                className="rounded-lg p-4 border"
                style={{ backgroundColor: item.bg, borderColor: item.border }}
                data-testid={`legend-${item.level.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div
                  className="font-sans font-bold text-xs mb-2"
                  style={{ color: item.text }}
                >
                  {item.level}
                </div>
                <p className="text-xs font-sans leading-relaxed" style={{ color: item.text, opacity: 0.85 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <BarChart3 className="mx-auto mb-4 text-primary" size={40} />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="font-sans text-muted-foreground leading-relaxed mb-8">
            Click into the interactive scorecard to see how each province and territory is rated across all 20 sub-dimensions. Click any cell to read the exact justification from Appendix 5 of the published paper, or click a jurisdiction header to see a full summary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scorecard"
              data-testid="link-cta-scorecard"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow"
            >
              Open the Scorecard
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/about"
              data-testid="link-cta-about"
              className="inline-flex items-center gap-2 border border-border text-foreground font-sans font-medium px-6 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <FileText size={16} />
              About the research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
