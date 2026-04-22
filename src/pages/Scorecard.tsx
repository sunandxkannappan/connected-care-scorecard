import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ArrowRight, Building2, Scale, GraduationCap, Server, Users, Building, Smartphone, BarChart3 } from "lucide-react";
import {
  DIMENSIONS,
  JURISDICTIONS,
  MATURITY_LEVELS,
  HEATMAP_COLORS,
  getRating,
  getSubRating,
  jurisdictionSummary,
  type MaturityLevel,
  type Dimension,
  type SubDimension,
  type Jurisdiction,
  type SubDimensionRating
} from "@/data/scorecard";

const DIMENSION_ICONS: Record<string, React.ElementType> = {
  governance: Building2,
  legislation: Scale,
  incentives: GraduationCap,
  infrastructure: Server,
  community: Users,
  hospital: Building,
  portals: Smartphone,
  planning: BarChart3,
};

interface SelectedCell {
  jurisdiction: Jurisdiction;
  dimension: Dimension;
  subDimension: SubDimension;
  subRating: SubDimensionRating | null;
}

type ActivePanel = "none" | "cell" | "jurisdiction";

function SubDimDetailPanel({
  selected,
  showBack,
  onBack,
  onClose
}: {
  selected: SelectedCell;
  showBack: boolean;
  onBack: () => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { jurisdiction, dimension, subDimension, subRating } = selected;
  const level = subRating?.level ?? "Basic";
  const colors = HEATMAP_COLORS[level];

  useEffect(() => {
    closeRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      data-testid="overlay-detail"
      role="dialog"
      aria-modal="true"
      aria-label={`${jurisdiction.name}: ${subDimension.name}`}
    >
      <div
        className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        data-testid="panel-detail"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {showBack && (
                <div className="mb-3">
                  <button
                    onClick={e => { e.stopPropagation(); onBack(); }}
                    className="inline-flex items-center gap-1 text-xs font-sans text-primary hover:text-primary/80 transition-colors"
                    data-testid="button-back-to-jurisdiction"
                  >
                    <ChevronLeft size={13} />
                    Back to {selected.jurisdiction.name}
                  </button>
                </div>
              )}
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold border mb-2"
                style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
              >
                {level}
              </div>
              <h2 className="font-serif font-bold text-lg text-gray-900 leading-tight">
                {jurisdiction.name}
                {jurisdiction.footnoteMarker && <sup className="text-xs ml-0.5">{jurisdiction.footnoteMarker}</sup>}
              </h2>
              <p className="font-sans text-sm text-gray-500">{dimension.fullName} · {subDimension.name}</p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0"
              aria-label="Close panel"
              data-testid="button-close-panel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gray-500 mb-2">What this measures</p>
            <p className="font-sans text-sm text-gray-700 leading-relaxed">{subDimension.description}</p>
          </div>

          {subRating ? (
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-gray-500 mb-2">Justification</p>
              <p className="font-sans text-base text-gray-800 leading-relaxed">{subRating.justification}</p>
              {subRating.notes && (
                <p className="font-sans text-sm text-gray-500 mt-3 italic">{subRating.notes}</p>
              )}
            </div>
          ) : (
            <p className="font-sans text-sm text-gray-500 italic">No rating data available for this combination.</p>
          )}

          {jurisdiction.footnoteMarker && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm font-sans text-amber-800 leading-relaxed">
              <span className="font-semibold">{jurisdiction.footnoteMarker}</span> {jurisdiction.footnote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JurisdictionPanel({
  jurisdiction,
  onClose,
  onSelectCell
}: {
  jurisdiction: Jurisdiction;
  onClose: () => void;
  onSelectCell: (dim: Dimension, sub: SubDimension) => void;
}) {
  const summary = jurisdictionSummary(jurisdiction.id);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${jurisdiction.name} summary`}
    >
      <div
        className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        data-testid="panel-jurisdiction"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-gray-900">
              {jurisdiction.name}
              {jurisdiction.footnoteMarker && <sup className="text-xs ml-0.5">{jurisdiction.footnoteMarker}</sup>}
            </h2>
            <p className="font-sans text-xs text-gray-500 capitalize">{jurisdiction.type}</p>
          </div>
          <button ref={closeRef} onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex flex-wrap gap-2 mb-5">
            {(["Advanced", "Emerging", "Basic", "Not Applicable"] as MaturityLevel[]).map(level => (
              summary[level] > 0 && (
                <span
                  key={level}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-semibold border"
                  style={{ backgroundColor: HEATMAP_COLORS[level].bg, color: HEATMAP_COLORS[level].text, borderColor: HEATMAP_COLORS[level].border }}
                >
                  {summary[level]} {level}
                </span>
              )
            ))}
          </div>

          <p className="text-xs font-sans text-gray-400 mb-3">Click any sub-dimension to see the full justification.</p>

          <div className="space-y-4">
            {DIMENSIONS.map(dim => {
              const dimRating = getRating(jurisdiction.id, dim.id);
              return (
                <div key={dim.id}>
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 mb-2">{dim.shortName}</p>
                  <div className="space-y-1.5">
                    {dim.subDimensions.map(sub => {
                      const sr = dimRating?.subRatings.find(s => s.subDimensionId === sub.id);
                      const level = sr?.level ?? "Basic";
                      const colors = HEATMAP_COLORS[level];
                      return (
                        <button
                          key={sub.id}
                          className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
                          onClick={() => onSelectCell(dim, sub)}
                          data-testid={`jurisdiction-subdim-${sub.id}`}
                        >
                          <div
                            className="w-3 h-3 rounded-sm flex-shrink-0 border"
                            style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                          />
                          <span className="font-sans text-xs text-gray-700 flex-1 leading-snug">{sub.name}</span>
                          <span className="font-sans text-xs font-medium text-gray-400 group-hover:text-primary transition-colors flex-shrink-0">
                            {level === "Not Applicable" ? "N/A" : level} <ArrowRight size={10} className="inline ml-0.5" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {jurisdiction.footnoteMarker && (
            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs font-sans text-amber-800 leading-relaxed">
              <span className="font-semibold">{jurisdiction.footnoteMarker}</span> {jurisdiction.footnote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface HeatmapSectionProps {
  dims: Dimension[];
  sectionLabel: string;
  onCellClick: (j: Jurisdiction, dim: Dimension, sub: SubDimension) => void;
}

function HeatmapSection({ dims, sectionLabel, onCellClick }: HeatmapSectionProps) {
  return (
    <>
      <tr>
        <td
          colSpan={JURISDICTIONS.length + 1}
          className="py-2 px-3 text-xs font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: "#1a3d36" }}
        >
          {sectionLabel}
        </td>
      </tr>
      {dims.map(dim => {
        const Icon = DIMENSION_ICONS[dim.id];
        return (
        <React.Fragment key={dim.id}>
          <tr>
            <td
              colSpan={JURISDICTIONS.length + 1}
              className="py-1.5 px-3 text-xs font-semibold text-gray-700 bg-gray-100 border-b border-gray-200"
              style={{ position: "sticky", left: 0 }}
            >
              <span className="flex items-center gap-1.5">
                {Icon && <Icon size={13} className="text-primary flex-shrink-0" />}
                {dim.shortName}
              </span>
            </td>
          </tr>
          {dim.subDimensions.map(sub => (
            <tr key={sub.id} className="hover:bg-gray-50/50 group">
              <td
                className="bg-white group-hover:bg-gray-50 border-r border-gray-200 border-b border-gray-100 py-1.5 px-3 text-xs font-sans text-gray-700 leading-tight"
                style={{ position: "sticky", left: 0, zIndex: 10, width: 280, minWidth: 280, maxWidth: 280 }}
              >
                {sub.name}
              </td>
              {JURISDICTIONS.map(j => {
                const sr = getSubRating(j.id, dim.id, sub.id);
                const level: MaturityLevel = sr?.level ?? "Basic";
                const colors = HEATMAP_COLORS[level];

                const showQcMark = j.footnoteMarker === "*" &&
                  level !== "Not Applicable" &&
                  (dim.id === "governance" || sub.id === "legislation-1");
                const showDagger = j.footnoteMarker === "†" && level === "Not Applicable";

                return (
                  <td key={j.id} className="p-0.5 border-b border-gray-100">
                    <button
                      onClick={() => onCellClick(j, dim, sub)}
                      title={`${j.name}: ${sub.name}: ${level}`}
                      aria-label={`${j.name} ${sub.name}: ${level}. Click for justification.`}
                      className="w-full h-8 rounded-sm border transition-all hover:opacity-80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 relative"
                      style={{ backgroundColor: colors.bg, borderColor: colors.border, minWidth: 28 }}
                      data-testid={`cell-${j.id}-${sub.id}`}
                    >
                      {(showQcMark || showDagger) && (
                        <span
                          className="absolute bottom-0 right-0.5 text-[7px] leading-none font-bold"
                          style={{ color: level === "Not Applicable" ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.45)" }}
                        >
                          {j.footnoteMarker}
                        </span>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </React.Fragment>
        );
      })}
    </>
  );
}

const RATING_ORDER: MaturityLevel[] = ["Advanced", "Emerging", "Basic", "Not Applicable"];
const TOTAL_SUBDIMS = 20;

function JurisdictionSummaryCard({
  jurisdiction,
  onClick
}: {
  jurisdiction: Jurisdiction;
  onClick: () => void;
}) {
  const summary = jurisdictionSummary(jurisdiction.id);

  return (
    <button
      className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group w-full"
      onClick={onClick}
      data-testid={`jurisdiction-card-${jurisdiction.id}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="font-serif font-bold text-2xl text-primary leading-none">
            {jurisdiction.abbreviation}
          </span>
          {jurisdiction.footnoteMarker && (
            <sup className="font-sans text-[9px] text-gray-400 ml-0.5">{jurisdiction.footnoteMarker}</sup>
          )}
          <p className="font-sans text-xs text-gray-500 mt-0.5 leading-snug">{jurisdiction.name}</p>
        </div>
        <span className="font-sans text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Details <ArrowRight size={11} />
        </span>
      </div>

      {/* Proportional bar */}
      <div className="flex w-full h-3 rounded-full overflow-hidden border border-gray-200 mb-2.5">
        {RATING_ORDER.map(level => {
          const count = summary[level] ?? 0;
          if (count === 0) return null;
          const pct = (count / TOTAL_SUBDIMS) * 100;
          const bg = level === "Basic" ? "#e5e7eb" : HEATMAP_COLORS[level].bg;
          return (
            <div
              key={level}
              style={{ width: `${pct}%`, backgroundColor: bg }}
              title={`${count} ${level === "Not Applicable" ? "N/A" : level}`}
            />
          );
        })}
      </div>

      {/* Count labels */}
      <div className="flex flex-wrap gap-1">
        {RATING_ORDER.map(level => {
          const count = summary[level] ?? 0;
          if (count === 0) return null;
          const bg = level === "Basic" ? "#e5e7eb" : HEATMAP_COLORS[level].bg;
          const textColor = level === "Basic" ? "#374151" : HEATMAP_COLORS[level].text;
          const border = level === "Basic" ? "#d1d5db" : HEATMAP_COLORS[level].border;
          return (
            <span
              key={level}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-sans font-semibold border"
              style={{ backgroundColor: bg, color: textColor, borderColor: border }}
            >
              {count} {level === "Not Applicable" ? "N/A" : level === "Advanced" ? "Adv" : level === "Emerging" ? "Em" : "Basic"}
            </span>
          );
        })}
      </div>
    </button>
  );
}

export default function Scorecard() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("none");
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(null);

  const enablerDims = DIMENSIONS.filter(d => d.section === "Enabler");
  const statusDims = DIMENSIONS.filter(d => d.section === "Status");

  function openCellDirect(j: Jurisdiction, dim: Dimension, sub: SubDimension) {
    const sr = getSubRating(j.id, dim.id, sub.id) ?? null;
    setSelectedCell({ jurisdiction: j, dimension: dim, subDimension: sub, subRating: sr });
    setSelectedJurisdiction(null);
    setActivePanel("cell");
  }

  function openCellFromJurisdiction(dim: Dimension, sub: SubDimension) {
    if (!selectedJurisdiction) return;
    const sr = getSubRating(selectedJurisdiction.id, dim.id, sub.id) ?? null;
    setSelectedCell({ jurisdiction: selectedJurisdiction, dimension: dim, subDimension: sub, subRating: sr });
    setActivePanel("cell");
  }

  function openJurisdiction(j: Jurisdiction) {
    setSelectedJurisdiction(j);
    setActivePanel("jurisdiction");
  }

  function goBackToJurisdiction() {
    setActivePanel("jurisdiction");
  }

  function closeAll() {
    setActivePanel("none");
    setSelectedCell(null);
  }

  return (
    <div>
      {/* Page header */}
      <section className="bg-primary/5 border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-sans tracking-widest uppercase text-primary font-semibold mb-2">Interactive heatmap</div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2" data-testid="heading-scorecard">
            The Scorecard
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            Each row is a sub-dimension of EHR interoperability. Click any cell to see the full justification for that jurisdiction's rating. Click a jurisdiction name below the map to see a full summary.
          </p>
        </div>
      </section>

      {/* Legend — always visible */}
      <div className="border-b border-border bg-white px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-start gap-5" data-testid="heatmap-legend">
            {(["Basic", "Emerging", "Advanced", "Not Applicable"] as MaturityLevel[]).map(level => {
              const colors = HEATMAP_COLORS[level];
              const meta = MATURITY_LEVELS[level];
              return (
                <div key={level} className="flex items-start gap-2.5 max-w-xs">
                  <div
                    className="w-5 h-5 rounded-sm border flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                  />
                  <div>
                    <span className="font-sans font-semibold text-xs text-gray-700">{level}</span>
                    <span className="hidden sm:block font-sans text-xs text-gray-400 leading-snug mt-0.5">{meta.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-400 font-sans">
            * Quebec note applies to governance/legislation sub-dimensions only.{" "}
            † NWT and NU are single-EHR territories. N/A for content and exchange standards.
          </p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="table-fixed" style={{ width: "100%", minWidth: 680, borderCollapse: "collapse" }}>
              <thead>
                <tr className="bg-white border-b-2 border-gray-200" style={{ position: "sticky", top: 0, zIndex: 20 }}>
                  <th
                    className="bg-white border-r border-gray-200 px-3 py-1.5 text-left text-xs font-sans font-semibold text-gray-500 align-middle"
                    style={{ position: "sticky", left: 0, zIndex: 30, width: 280, minWidth: 280, maxWidth: 280 }}
                  >
                    <span className="sr-only">Sub-dimension</span>
                  </th>
                  {[
                    { label: "Western", span: 3 },
                    { label: "Central", span: 3 },
                    { label: "Atlantic", span: 4 },
                    { label: "Territories", span: 3 }
                  ].map(group => (
                    <th
                      key={group.label}
                      colSpan={group.span}
                      className="h-10 py-0 text-center text-xs font-sans font-semibold text-gray-500 border-l border-gray-200 align-middle"
                    >
                      {group.label}
                    </th>
                  ))}
                </tr>
                <tr className="bg-white border-b border-gray-200" style={{ position: "sticky", top: "37px", zIndex: 20 }}>
                  <th
                    className="bg-white border-r border-gray-200 px-3 py-1 align-middle"
                    style={{ position: "sticky", left: 0, zIndex: 30, width: 280, minWidth: 280, maxWidth: 280 }}
                  />
                  {JURISDICTIONS.map((j, idx) => {
                    const isNewGroup = [0, 3, 6, 10].includes(idx);
                    return (
                      <th key={j.id} className={`h-10 py-0 px-0 align-middle ${isNewGroup ? "border-l border-gray-200" : ""}`}>
                        <button
                          onClick={() => openJurisdiction(j)}
                          className="text-xs font-sans font-bold text-gray-600 hover:text-primary hover:underline underline-offset-2 transition-colors w-full h-full text-center cursor-pointer leading-none"
                          title={`Click to view ${j.name} summary`}
                          data-testid={`header-${j.id}`}
                          aria-label={`View ${j.name} summary`}
                        >
                          {j.abbreviation}
                          {j.footnoteMarker && <sup className="text-[7px]">{j.footnoteMarker}</sup>}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <HeatmapSection dims={enablerDims} sectionLabel="Interoperability Enablers" onCellClick={openCellDirect} />
                <HeatmapSection dims={statusDims} sectionLabel="Interoperability Status" onCellClick={openCellDirect} />
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 font-sans mt-3">
            All ratings are from Appendix 5 of the published paper (CMAJ 2026, doi: 10.1503/cmaj.251640). Click any cell to view the exact justification.
          </p>
        </div>
      </div>

      {/* Jurisdiction summary cards */}
      <div className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">Jurisdiction summaries</h2>
          <p className="font-sans text-sm text-muted-foreground mb-6">
            Click any card to explore all 20 sub-dimension ratings for that province or territory.
          </p>
          {[
            { label: "Western", ids: ["BC", "AB", "SK"] },
            { label: "Central", ids: ["MB", "ON", "QC"] },
            { label: "Atlantic", ids: ["NB", "PEI", "NS", "NL"] },
            { label: "Territories", ids: ["YT", "NWT", "NU"] },
          ].map(region => (
            <div key={region.label} className="mb-8">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-3">{region.label}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {JURISDICTIONS.filter(j => region.ids.includes(j.id)).map(j => (
                  <JurisdictionSummaryCard
                    key={j.id}
                    jurisdiction={j}
                    onClick={() => openJurisdiction(j)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-gray-400 font-sans">
            <span>* Quebec: distinct legislation applies to governance/legislation sub-dimensions only.</span>
            <span>† NWT and NU: single-EHR territories. N/A for content and exchange standards.</span>
          </div>
        </div>
      </div>

      {/* Cell detail panel */}
      {activePanel === "cell" && selectedCell && (
        <SubDimDetailPanel
          selected={selectedCell}
          showBack={selectedJurisdiction !== null}
          onBack={goBackToJurisdiction}
          onClose={closeAll}
        />
      )}

      {/* Jurisdiction summary panel */}
      {activePanel === "jurisdiction" && selectedJurisdiction && (
        <JurisdictionPanel
          jurisdiction={selectedJurisdiction}
          onClose={closeAll}
          onSelectCell={openCellFromJurisdiction}
        />
      )}
    </div>
  );
}
