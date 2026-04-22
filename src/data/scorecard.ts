/**
 * DATA PROVENANCE
 * All jurisdiction ratings, sub-dimension ratings, and justification text are derived
 * exclusively from Appendix 5 of:
 *   Kannappan S, et al. "The current state of electronic health records across Canada:
 *   an environmental scan and interoperability maturity assessment."
 *   CMAJ 2026. doi: 10.1503/cmaj.251640
 *
 * Dimension definitions and maturity criteria are from Appendix 2 of the same paper.
 *
 * Footnote markers:
 *   * (asterisk) — Quebec: uses distinct provincial legislation (Act Respecting Health and
 *     Social Services Information) and proprietary standards not directly comparable to
 *     pan-Canadian norms.
 *   † (dagger) — YT, NWT, NU: all three territories operate a single unified EHR
 *     (Meditech / Meditech Expanse territory-wide). Cross-system content and exchange
 *     standards sub-dimensions (Legislation & Standards dimension) are rated Not Applicable
 *     because there is no multi-vendor interoperability challenge requiring such standards.
 *     This applies equally to YT, NWT, and NU as confirmed in Appendix 5.
 */
export type MaturityLevel = "Basic" | "Emerging" | "Advanced" | "Not Applicable";

export interface SubDimension {
  id: string;
  name: string;
  description: string;
}

export interface Dimension {
  id: string;
  shortName: string;
  fullName: string;
  description: string;
  section: "Enabler" | "Status";
  subDimensions: SubDimension[];
}

export interface SubDimensionRating {
  subDimensionId: string;
  level: MaturityLevel;
  justification: string;
  notes?: string;
}

export interface JurisdictionRating {
  jurisdictionId: string;
  dimensionId: string;
  overallLevel: MaturityLevel;
  subRatings: SubDimensionRating[];
}

export interface Jurisdiction {
  id: string;
  name: string;
  abbreviation: string;
  type: "province" | "territory";
  footnote?: string;
  footnoteMarker?: "*" | "†";
}

export const MATURITY_LEVELS: Record<MaturityLevel, { label: string; bgClass: string; textClass: string; borderClass: string; description: string; hex: string }> = {
  Basic: {
    label: "Basic",
    hex: "#FFFFFF",
    bgClass: "bg-white",
    textClass: "text-gray-800",
    borderClass: "border-gray-300",
    description: "Initial policies or systems exist but are limited in scope, adoption, or integration."
  },
  Emerging: {
    label: "Emerging",
    hex: "#7EC9C4",
    bgClass: "bg-teal-200",
    textClass: "text-teal-900",
    borderClass: "border-teal-300",
    description: "Moderate progress with some interoperability features in place, but significant gaps remain."
  },
  Advanced: {
    label: "Advanced",
    hex: "#1A7A6E",
    bgClass: "bg-teal-700",
    textClass: "text-white",
    borderClass: "border-teal-800",
    description: "Robust, integrated systems with broad adoption and strong interoperability across care settings."
  },
  "Not Applicable": {
    label: "Not Applicable",
    hex: "#111111",
    bgClass: "bg-gray-900",
    textClass: "text-white",
    borderClass: "border-black",
    description: "The dimension does not apply to this jurisdiction given its context (e.g., single-EHR territory)."
  }
};

export const HEATMAP_COLORS: Record<MaturityLevel, { bg: string; text: string; border: string }> = {
  Basic: { bg: "#FFFFFF", text: "#374151", border: "#d1d5db" },
  Emerging: { bg: "#7EC9C4", text: "#134e4a", border: "#5eada8" },
  Advanced: { bg: "#1A7A6E", text: "#ffffff", border: "#145e54" },
  "Not Applicable": { bg: "#111111", text: "#ffffff", border: "#000000" }
};

export const DIMENSIONS: Dimension[] = [
  {
    id: "governance",
    shortName: "Governance",
    fullName: "Governance",
    section: "Enabler",
    description: "The decision-making bodies and processes by which interoperability efforts are managed and coordinated within a province or territory. This includes the structure of the health information system (HIS) organization, and the provincial or territorial strategy for interoperability.",
    subDimensions: [
      { id: "governance-1", name: "Governance structure", description: "Whether a central health information system authority governs across all care settings, with well-resourced and accountable efforts to drive EHR adoption and interoperability." },
      { id: "governance-2", name: "Strategy and monitoring", description: "Presence of a comprehensive provincial or territorial strategy with frontline user engagement, progress monitoring, consistent reporting, and alignment with national strategies." }
    ]
  },
  {
    id: "legislation",
    shortName: "Legislation & Standards",
    fullName: "Legislation & Standards",
    section: "Enabler",
    description: "The regulatory and legal frameworks that establish and enforce standards for interoperability. This includes data content and exchange standards (e.g., SNOMED CT, LOINC, HL7, FHIR), community EHR certification programs, and provincial health information legislation.",
    subDimensions: [
      { id: "legislation-1", name: "Content and exchange standards", description: "Whether data content (e.g., SNOMED, LOINC) and exchange standards (e.g., HL7, FHIR) are defined and enforced by the province or territory through a robust community EHR certification program mandating interoperability and data sharing." },
      { id: "legislation-2", name: "Health information legislation", description: "Whether provincial or territorial health information legislation promotes both privacy and interoperability, with strong health data management and exchange standards." }
    ]
  },
  {
    id: "incentives",
    shortName: "Incentives & Capacity",
    fullName: "Incentives & Capacity Building",
    section: "Enabler",
    description: "The financial and non-financial mechanisms designed to encourage and support providers in adopting and maintaining interoperability. This includes financial incentives for EHR implementation and meaningful use, as well as training and technical assistance programs.",
    subDimensions: [
      { id: "incentives-1", name: "Financial incentive structure", description: "Whether robust financial incentives are tied to meaningful EHR use, including enhanced payments for data sharing, using EHR data to improve care, interoperability metrics, or reporting outcomes." },
      { id: "incentives-2", name: "Training and support programs", description: "Availability of extensive government-funded training and technical assistance programs for community providers implementing EHRs, with specific guidance on interoperability and data sharing." }
    ]
  },
  {
    id: "infrastructure",
    shortName: "Technical Infrastructure",
    fullName: "Technical Infrastructure",
    section: "Enabler",
    description: "The technological foundation and systems that support the exchange and integration of health data. This includes the health data repository (HDR), and the interfaces that the HDR has with provider EHRs and patient portals.",
    subDimensions: [
      { id: "infrastructure-1", name: "Health data repository availability", description: "Whether a comprehensive provincial or territorial HDR is in place that can be accessed by all care providers across settings (labs, imaging, discharge summaries, medications, vaccinations)." },
      { id: "infrastructure-2", name: "Health data repository integration with EHRs or portals", description: "Whether there is direct workflow-level integration between the HDR and provider EHRs or patient portals, allowing bidirectional and real-time data exchange." }
    ]
  },
  {
    id: "community",
    shortName: "Community EHRs",
    fullName: "Community EHRs",
    section: "Status",
    description: "The systems and adoption supporting exchange and integration of health data within community care settings. This includes adoption of EHRs by community providers, electronic data exchange between community EHRs (e.g., e-referrals), and interoperability between community and hospital providers.",
    subDimensions: [
      { id: "community-1", name: "Community EHR adoption rate", description: "Proportion of community healthcare providers using an EHR system (Advanced: >95%; Emerging: 80–95%; Basic: <80%)." },
      { id: "community-2", name: "Intercommunity data exchange", description: "Extent of provincial or territorial electronic data exchange between community EHRs, including primary care and community specialist systems, with frequent and comprehensive data sharing (e.g., electronic referrals, clinical notes, labs, imaging, medications)." },
      { id: "community-3", name: "Community-hospital data exchange", description: "Extent of comprehensive electronic data exchange from community providers to hospitals, spanning all facilities and leveraging HDRs or other integrated platforms to enable seamless data sharing." }
    ]
  },
  {
    id: "hospital",
    shortName: "Hospital EHRs",
    fullName: "Hospital EHRs",
    section: "Status",
    description: "Systems and adoption supporting the exchange and integration of health data within hospitals and between hospitals and community providers. This includes adoption of EHRs in hospitals, electronic data exchange between hospital EHRs, and interoperability with community EHRs (e.g., discharge summaries).",
    subDimensions: [
      { id: "hospital-1", name: "Hospital EHR adoption rate", description: "Proportion of hospitals with an EHR system in use across regions and facility types (Advanced: >90%; Emerging: 80–90%; Basic: <80% or majority paper-based)." },
      { id: "hospital-2", name: "Interhospital data exchange", description: "Cross-provincial or cross-site electronic data exchange capabilities between hospital EHRs, facilitated by HDR or common interface, spanning all facilities with frequent and comprehensive sharing." },
      { id: "hospital-3", name: "Hospital-community data exchange", description: "Comprehensive electronic data exchange from hospitals to community EHRs, spanning all facilities and leveraging HDRs or other interfaces to share detailed clinical data (e.g., discharge summaries, imaging, labs) in a timely and actionable manner." }
    ]
  },
  {
    id: "portals",
    shortName: "Patient Portals",
    fullName: "Patient-Facing Portals",
    section: "Status",
    description: "Systems enabling patients to access and interact with their health information. This includes the availability of provincial patient portals, patient adoption of portals (provincial or through provider EHRs), and the extent of health data and interactions accessible to patients — such as labs, imaging, clinical notes, medications, and communication with clinicians.",
    subDimensions: [
      { id: "portals-1", name: "Provincial portal availability", description: "Whether a provincial or territorial patient portal is in place and accessible across all patients and providers." },
      { id: "portals-2", name: "Portal adoption by patients", description: "Proportion of patients who have accessed their personal health information electronically (Advanced: >40%; Emerging: 20–40%; Basic: <20% or no portal)." },
      { id: "portals-3", name: "Scope of patient data in portal", description: "Extent of health data and patient interactions available in the provincial portal, including clinical notes, labs, imaging, medications, vaccinations, communication with clinicians, and scheduling." }
    ]
  },
  {
    id: "planning",
    shortName: "Health System Planning",
    fullName: "Health System Planning",
    section: "Status",
    description: "Capability of the provincial or territorial health system to leverage EHR data for evidence-based decision-making, population health management, performance monitoring, and system planning.",
    subDimensions: [
      { id: "planning-1", name: "Analytics capacity in health system", description: "Presence of a mature health analytics function within the provincial or territorial health system, able to integrate and analyze EHR data from multiple care settings for population health management." },
      { id: "planning-2", name: "Use of EHR data in planning", description: "Extent to which EHR data from community and hospital settings is actively used by government or health authorities for health system planning, quality improvement, and decision-making." },
      { id: "planning-3", name: "Metric reporting for performance", description: "Availability of real-time or near-real-time performance metrics (e.g., ED wait times, surgical wait times, ALC rates) derived from EHR data, with clear accountability mechanisms." }
    ]
  }
];

export const JURISDICTIONS: Jurisdiction[] = [
  { id: "BC", name: "British Columbia", abbreviation: "BC", type: "province" },
  { id: "AB", name: "Alberta", abbreviation: "AB", type: "province" },
  { id: "SK", name: "Saskatchewan", abbreviation: "SK", type: "province" },
  { id: "MB", name: "Manitoba", abbreviation: "MB", type: "province" },
  { id: "ON", name: "Ontario", abbreviation: "ON", type: "province" },
  { id: "QC", name: "Quebec", abbreviation: "QC", type: "province", footnoteMarker: "*", footnote: "Significant variation between community and hospital ratings. Quebec has distinct legislative and governance frameworks." },
  { id: "NB", name: "New Brunswick", abbreviation: "NB", type: "province" },
  { id: "PEI", name: "Prince Edward Island", abbreviation: "PEI", type: "province" },
  { id: "NS", name: "Nova Scotia", abbreviation: "NS", type: "province" },
  { id: "NL", name: "Newfoundland & Labrador", abbreviation: "NL", type: "province" },
  { id: "YT", name: "Yukon", abbreviation: "YT", type: "territory" },
  { id: "NWT", name: "Northwest Territories", abbreviation: "NWT", type: "territory", footnoteMarker: "†", footnote: "† NWT operates a single unified EHR (Meditech). 'Not Applicable' ratings for Legislation & Standards reflect that cross-system content and exchange standards are not required in a single-vendor environment." },
  { id: "NU", name: "Nunavut", abbreviation: "NU", type: "territory", footnoteMarker: "†", footnote: "† Nunavut operates a single unified EHR (Meditech Expanse). 'Not Applicable' ratings for Legislation & Standards reflect that cross-system content and exchange standards are not required in a single-vendor environment." }
];

export const RATINGS: JurisdictionRating[] = [
  /* ─────────────────────── BRITISH COLUMBIA ─────────────────────── */
  {
    jurisdictionId: "BC", dimensionId: "governance", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "governance-1", level: "Basic", justification: "No central governance; decisions made by individual vendors, regions, and physicians without alignment. BC has a digital health leadership table for acute care without decision-making powers, as local health authorities make their own decisions with Treasury Board having final say. Governance table for community EHRs has just started." },
      { subDimensionId: "governance-2", level: "Basic", justification: "No province-wide strategy or oversight; interviewees described efforts as chaotic and lacking direction." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "legislation", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Basic", justification: "Standards for repository connection exist, but no provincial certification program or enforcement of SNOMED, HL7, or FHIR." },
      { subDimensionId: "legislation-2", level: "Basic", justification: "No health information legislation that mandates interoperability; governance depends on voluntary compliance." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "incentives", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Basic", justification: "Most physicians purchase EHRs independently; no province-wide incentive tied to interoperability." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "Doctors of BC offers a practice support program for EHRs with higher demand, but no comprehensive provincial-scale technical assistance." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "infrastructure", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Emerging", justification: "CareConnect, PharmaNet, and LifeLabs exist, but are siloed and not fully integrated." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "No real-time bidirectional integration; systems require multiple logins and re-entry of provincial health numbers." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Emerging", justification: "Medium adoption (~80–90%) but 40+ EHRs in use; 19% of Vancouver clinics still on paper." },
      { subDimensionId: "community-2", level: "Basic", justification: "Fax/e-fax remains dominant; digital referrals and orders program has recently started to connect EHRs for those who opt in, but onboarding is slow." },
      { subDimensionId: "community-3", level: "Basic", justification: "No structured integration; referrals, labs, and consults are sent by fax/e-fax or PDF uploads." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "hospital", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Advanced", justification: "Over 90% hospital EHR adoption (primarily Cerner, Meditech); all hospitals have EHRs aside from Correctional Health." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Sharing occurs via repository but full workflow integration is lacking; some electronic data exchange is available." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information flows to community EHRs via the repository, but does not return; outpatient clinic integration remains limited." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "Health Gateway is provincial, but fragmented with gaps across regions as health authorities may choose not to include some documentation; some rural portals do not feed in." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "58% of survey respondents have accessed health data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, imaging, and some discharge summaries are available, but some reports are delayed and not comprehensive." }
    ]
  },
  {
    jurisdictionId: "BC", dimensionId: "planning", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "planning-1", level: "Basic", justification: "Analytics are siloed; no centralized capability for longitudinal analysis or integration of community EHR data." },
      { subDimensionId: "planning-2", level: "Basic", justification: "EHR data not used for decision-making; planning is reactive, not data-informed. Issues with legislation and lack of trust." },
      { subDimensionId: "planning-3", level: "Basic", justification: "Wait time data, ED data, and medication reconciliation not consistently available; only BCCDC does consistent reporting (e.g., COVID)." }
    ]
  },

  /* ─────────────────────── ALBERTA ─────────────────────── */
  {
    jurisdictionId: "AB", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "Alberta Health Services governs acute care centrally via Epic, but primary care EHR governance is fragmented with no oversight or coordination." },
      { subDimensionId: "governance-2", level: "Basic", justification: "No integrated provincial strategy exists; interoperability efforts are siloed, politically constrained, and poorly aligned across sectors." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "legislation", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Basic", justification: "Alberta has guidance but no enforced standard for HL7, FHIR, or SNOMED; vendors operate independently without required conformance." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Privacy-focused legislation allows access (e.g., via Netcare) but does not mandate interoperability or health data exchange." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "incentives", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Funding programs like VCUR (2008–2019) supported select EHRs, but no current incentives exist; most providers self-fund." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "Advisory and technical support (e.g., from eHealth Services) is available but limited; no comprehensive program to support interoperability." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "infrastructure", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Advanced", justification: "Netcare serves as a provincial repository with wide access to labs, imaging, discharge summaries, medications, and vaccination data." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "Netcare is read-only and requires users to leave their EHR to access data; it lacks real-time, bidirectional integration." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "High adoption (98%) across ~14 vendors, but no standardization or certification; EHR selection is uncoordinated and siloed." },
      { subDimensionId: "community-2", level: "Basic", justification: "Fax remains dominant; limited efforts like CII are not scaled or real-time and involve only a small number of clinics." },
      { subDimensionId: "community-3", level: "Basic", justification: "No structured integration with Connect Care; data exchange relies on viewing Netcare rather than functional, bidirectional sharing." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "hospital", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Advanced", justification: "AHS has rolled out Epic across all hospitals, including future expansion to corrections, public health, and continuing care." },
      { subDimensionId: "hospital-2", level: "Advanced", justification: "Sharing occurs via HDR; Epic provides cross-site exchange capabilities within Alberta Health Services." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information flows to community EHRs; offers read-only access but real-time bidirectional connection is not yet available." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "MyAHS Connect and MyHealthAlberta are available but fragmented; portal access is inconsistent across care settings." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "68% of survey respondents have accessed data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, imaging, immunizations, and some clinical documents are available, but structured clinical data is limited or delayed." }
    ]
  },
  {
    jurisdictionId: "AB", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Alberta has strong internal analytics tools (e.g., Tableau, Strategic Clinical Networks), but insights are not well-integrated with operations or decision-making." },
      { subDimensionId: "planning-2", level: "Basic", justification: "EHR data is not widely used; hospital data only became useful during COVID, and primary care data is almost entirely excluded." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Reporting exists (e.g., surgery and ED wait times), but data quality is poor and reporting lacks clear ties to accountability or improvement." }
    ]
  },

  /* ─────────────────────── SASKATCHEWAN ─────────────────────── */
  {
    jurisdictionId: "SK", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "eHealth Saskatchewan centrally manages infrastructure, but hospital clinical information systems (CISs) are still regionalized. Fee-for-service physicians can choose one of two certified EHRs." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Several EHRs are certified for primary care use through a central body. Progress exists, but lack of standardization and high customization in data sharing limits alignment." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "FHIR standards are used for patient summaries, but enforcement is weak and integration is limited to a small set of EHRs." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Operational expectations exist through eHealth governance, but no strong legislative mandate for interoperability is evident." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Advanced", justification: "EHRs are heavily subsidized for eligible physicians; only certified EHRs (QHR, Telus) are supported." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "Operational support is implied, but no formal training or provincial-scale technical assistance programs are described." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "infrastructure", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Advanced", justification: "Saskatchewan HDR includes labs, medications, diagnostics, clinical documents, surgical bookings, and discharge summaries." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "Some EHRs (e.g., Med Access) can pull data using FHIR, but bidirectional or real-time integration is not yet standardized." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "Over 95% of community providers use either QHR or Med Access; EHR use is widespread and standardized." },
      { subDimensionId: "community-2", level: "Emerging", justification: "Direct exchange possible among supported EHRs, but fax/email still commonly used based on provider preference." },
      { subDimensionId: "community-3", level: "Emerging", justification: "Sharing occurs via the HDR, but full workflow integration is lacking and practice is inconsistent." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "hospital", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Basic", justification: "All large hospitals use Altera Allscripts, but instances are regionalized, not unified. Small hospitals are still paper-based." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some electronic data exchange between hospital systems via the HDR." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Sharing occurs via the HDR, but full workflow integration between hospital and community settings is lacking." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "MySaskHealthRecord is active with expanding features (e.g., surgical bookings), but primary care data is not yet included." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "72% of survey respondents have accessed data online. Approximately 60% of residents have patient portal accounts." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, imaging, prescriptions, and discharge summaries available; access to community records and full clinical notes is limited." }
    ]
  },
  {
    jurisdictionId: "SK", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Analytics are improving post-COVID, but coordination and proactive use remain limited across agencies." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Some hospital data used, but primary care and specialty care data remain largely untapped." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Real-time access to surgical and ED wait times exists; other indicators (e.g., blood pressure control) remain unavailable or untracked." }
    ]
  },

  /* ─────────────────────── MANITOBA ─────────────────────── */
  {
    jurisdictionId: "MB", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "Executive table chaired by deputy minister of health in collaboration with Digital Shared Services and clinical administrative leads is now active." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Manitoba is working on a single integrated CIS (standardized to Alterra for core inpatient functions) and engaging in national alignment." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "legislation", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Advanced", justification: "Manitoba has an EHR certification program that includes integration with the HDR (eChart); enhanced certification mandates structured data exchange. Must be on certified program to connect to eChart; some may choose not to." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Certification is enforced contractually, but no mention of specific legislation mandating interoperability province-wide." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Advanced", justification: "Manitoba previously funded EHRs and now restricts support to certified vendors; health authority-run clinics get EHRs as part of their service package." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "Training is provided for health authority-owned clinics, hospitals, etc. Fee-for-service providers can receive training on linking with eChart." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "infrastructure", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Advanced", justification: "eChart Manitoba includes labs, imaging, prescriptions, immunizations, discharge summaries from EDs using Alterra platform, and patient summary extracts from certified participating EHRs." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "EHRs have contextual viewer access to eChart, but integration is not yet bidirectional or fully real-time." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "EHRs have been adopted in 96–98% of community; Accuro is the market leader. Libra is used in some fee-for-service clinics." },
      { subDimensionId: "community-2", level: "Emerging", justification: "Certified EHRs integrate with eChart, but fax is still used for many clinical communications due to notification gaps." },
      { subDimensionId: "community-3", level: "Emerging", justification: "Access to hospital data via eChart is available, but workflow integration is limited and often paper-based at smaller sites." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "hospital", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Basic", justification: "All hospitals use Altera Sunrise, but only a few have the full clinical suite; most are still partly paper-based. Work is ongoing to increase EHR use in tertiary sites and have encounter information for all ambulatory clinics." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some electronic data exchange between hospital systems; EHR consolidation under Alterra is in progress." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information available via eChart, but workflow integration limited and often paper-based at smaller sites." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "No provincial patient portal exists; paper chart access is still the norm, though portal development is on the roadmap." },
      { subDimensionId: "portals-2", level: "Basic", justification: "Not applicable — no provincial portal yet; Dynacare offers a private paid lab portal." },
      { subDimensionId: "portals-3", level: "Basic", justification: "No real-time digital access; COVID immunization records are available, but broader patient access is not yet implemented." }
    ]
  },
  {
    jurisdictionId: "MB", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Provincial data warehouse exists and is maturing post-reform; capabilities are improving but still underdeveloped and underutilized." },
      { subDimensionId: "planning-2", level: "Basic", justification: "eChart is primarily used for transactional viewing; longitudinal data is underutilized for population health or planning." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Some indicators (e.g., wait times) are available at select sites, but reporting is incomplete." }
    ]
  },

  /* ─────────────────────── ONTARIO ─────────────────────── */
  {
    jurisdictionId: "ON", dimensionId: "governance", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "governance-1", level: "Basic", justification: "Decision-making is fragmented across hospitals and primary care; no single governance body enforces standards across settings." },
      { subDimensionId: "governance-2", level: "Basic", justification: "Ontario Health promotes standardization but no mandatory strategy exists; integration depends heavily on local leadership." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "Ontario has established a framework for interoperability standards, but adoption is inconsistent and terminology (e.g., lab systems) is not standardized." },
      { subDimensionId: "legislation-2", level: "Basic", justification: "No provincial directive or enforcement mechanism to ensure compliance with interoperability expectations." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "incentives", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Past support under OntarioMD ended in 2015; no current subsidies in place." },
      { subDimensionId: "incentives-2", level: "Basic", justification: "No structured training or provincial support mentioned for EHR integration or digital workflow transformation." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "infrastructure", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Emerging", justification: "Provincial viewer aggregates feeds from OLIS, drugs, and hospitals; lacks clinical notes and primary care integration." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "Viewer is read-only; systems remain siloed; clinicians must navigate multiple systems and formats." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "98% EHR adoption in community; PS Suite, Accuro, and OSCAR cover 80–90% of the primary care market." },
      { subDimensionId: "community-2", level: "Emerging", justification: "eReferral (via Ocean) supports some direct sharing, but variable adoption means fax remains dominant." },
      { subDimensionId: "community-3", level: "Basic", justification: "Hospitals send information via automated fax; no seamless, structured data integration exists." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "hospital", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Emerging", justification: "Epic, Meditech, and Cerner are in use; Ontario Health is consolidating some sites, but EHRs are still selected locally." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some electronic data exchange between hospital systems; Ontario Health is advancing consolidation." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information flows to community EHRs; developing HDR and provider and patient portal through government-funded projects through 2026." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "No provincial portal exists; hospital and lab portals are fragmented and inconsistently available." },
      { subDimensionId: "portals-2", level: "Basic", justification: "Fewer than 25% of hospitals have portals." },
      { subDimensionId: "portals-3", level: "Basic", justification: "Lab data often available; other information (e.g., diagnostic imaging, discharge summaries) is inconsistently available and varies by site." }
    ]
  },
  {
    jurisdictionId: "ON", dimensionId: "planning", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "planning-1", level: "Basic", justification: "Very limited use of clinical EHR data; Ontario Health relies on administrative data and limited research partnerships." },
      { subDimensionId: "planning-2", level: "Basic", justification: "EHR data is not used directly by the ministry or Ontario Health; only isolated use by research groups." },
      { subDimensionId: "planning-3", level: "Basic", justification: "Some real-time and monthly data exist (e.g., wait times), but access is inconsistent and no outcome-linked accountability exists." }
    ]
  },

  /* ─────────────────────── QUEBEC ─────────────────────── */
  {
    jurisdictionId: "QC", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "Fragmented hospital CIS deployment history; university hospitals made isolated decisions until the province mandated Epic adoption. Significant variation between community and hospital ratings.", notes: "Significant variation between community and hospital ratings." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "The Epic rollout is now coordinated provincially, but monitoring and strategy across care settings are still underdeveloped." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "All EHRs must connect to the HDR (DSQ); standards exist, but enforcement and consistency vary across settings.", notes: "Quebec's distinct legislative framework." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Provincial criteria exist for EHR certification, but there is no consistent enforcement; DSQ data privacy limits clinical data sharing." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "incentives", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Government pays approximately 75% of EHR license fees for primary care; some subsidies in place, but limited scope beyond family doctors." },
      { subDimensionId: "incentives-2", level: "Basic", justification: "No broad training programs mentioned; adoption success attributed more to freedom of vendor choice and learning from others." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "infrastructure", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Emerging", justification: "DSQ (Dossier Santé Québec) includes labs, medications, immunizations, and some imaging, but lacks clinical notes, pathology, and real-time clinical data." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "DSQ is view-only for hospitals; clinicians switch between windows with no system linkage — prone to error and inefficient workflows. Primary care EHRs can pull data from DSQ." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "6–7 certified EHRs widely used; high uptake with strong provincial alignment and user satisfaction in primary care." },
      { subDimensionId: "community-2", level: "Emerging", justification: "EHRs sync with DSQ daily; no direct community-to-community exchange; fax still used for consults." },
      { subDimensionId: "community-3", level: "Basic", justification: "Minimal digital exchange between primary care and hospitals; discharge summaries are often delayed or missing." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "hospital", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Basic", justification: "Province is transitioning to Epic across hospitals, but many still lack basic EHR capability or use custom/legacy systems." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "The Epic rollout is coordinated provincially but still in progress." },
      { subDimensionId: "hospital-3", level: "Basic", justification: "Community-hospital interoperability remains limited until the OPOR (One Patient One Record) project is complete." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "DSQ patient portal contains data for the last 20 years." },
      { subDimensionId: "portals-2", level: "Emerging", justification: "40% of survey respondents have accessed data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Patients can access labs, medications, vaccines, and visit history; clinical notes and imaging are missing or delayed." }
    ]
  },
  {
    jurisdictionId: "QC", dimensionId: "planning", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "planning-1", level: "Basic", justification: "No coordinated analytics system; only administrative data used, and data access is inconsistent across hospitals and conditions." },
      { subDimensionId: "planning-2", level: "Basic", justification: "Primary care and hospital data are not used effectively for planning; limited disease registry coverage (e.g., only cancer)." },
      { subDimensionId: "planning-3", level: "Basic", justification: "Only selected indicators (e.g., surgery wait times) are reported; most metrics are unavailable, untracked, or manually collected." }
    ]
  },

  /* ─────────────────────── NEW BRUNSWICK ─────────────────────── */
  {
    jurisdictionId: "NB", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "Decision-making is shared across health authorities, the government, and Service New Brunswick, with a new CIS initiative aiming to unify systems." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "NB is early in developing a digital health plan and procurement for unified CIS and EHR systems, but lacks concrete implementation so far." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "NB uses OntarioMD certification criteria for EHRs; integration only occurs if vendors are certified, but some uncertified systems still operate." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Certification is required for integration but enforcement is weak." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "incentives", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Collaborative practices receive financial support; subsidies exist but are fragmented and limited in reach." },
      { subDimensionId: "incentives-2", level: "Basic", justification: "No formal province-wide support programs described; resistance remains among solo physicians, many of whom still use paper." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "infrastructure", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Emerging", justification: "eHealth NB contains labs, medications, imaging, and visit history, but content is incomplete and lacks many hospital reports or documents." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "Most data must be accessed through a separate portal; non-certified EHRs cannot integrate; direct connections are limited or nonexistent." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Emerging", justification: "Certified EHRs (Intrahealth, PS Suite) are used but many physicians use paper or uncertified systems; provincial EHR (Intrahealth) is being phased out and province is seeking alternatives." },
      { subDimensionId: "community-2", level: "Basic", justification: "No direct peer-to-peer exchange; EHR data are faxed or manually pushed from eHealth NB if certified." },
      { subDimensionId: "community-3", level: "Basic", justification: "Exchange occurs via repository or fax; integration with hospital systems is limited, with major gaps between settings." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "hospital", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Emerging", justification: "Meditech is used widely in Vitalité; Horizon uses multiple systems. A unified CIS is planned but not yet procured." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some electronic data exchange between hospital systems; unified CIS procurement is in progress." },
      { subDimensionId: "hospital-3", level: "Basic", justification: "Exchange occurs via repository or fax; integration with community providers is limited, with major gaps between settings." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "MyHealthNB is available but lacks comprehensive hospital or primary care data." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "44% of survey respondents have accessed data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, COVID test results, immunizations, diagnostic imaging reports, and medications are available." }
    ]
  },
  {
    jurisdictionId: "NB", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Hospitals have started modelling demand and projecting needs by service line; analytics capacity is improving." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Primary and specialty care EHR data are not used; planning is based on hospital data and projections." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Wait times and discharge metrics are available, but reporting is fragmented and not consistently used for accountability or improvement." }
    ]
  },

  /* ─────────────────────── PRINCE EDWARD ISLAND ─────────────────────── */
  {
    jurisdictionId: "PEI", dimensionId: "governance", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "governance-1", level: "Advanced", justification: "Provincial approach for both hospital and community EHRs; led by Department of Health with Health PEI and medical society input." },
      { subDimensionId: "governance-2", level: "Advanced", justification: "Centralized governance (Health PEI) and provincial IMIT and Digital Health Strategy Committees oversee provincial approach and interoperability progress." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "legislation", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "Standards apply to the provincial EHR (Telus), clinical data repository stood up over the last year with datasets being added; view-only Cerner integration exists. Province has started to move to FHIR standard." },
      { subDimensionId: "legislation-2", level: "Advanced", justification: "Provincial EHR, CIS and Home Care Solution in place with standards and enforcement." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Provincial EHR grants and subsidies were provided during early adoption; fee-for-service physicians cover part of ongoing costs based on a sliding scale. Other EHR systems including CIS and Home Care Solution covered by government funding." },
      { subDimensionId: "incentives-2", level: "Advanced", justification: "Change management and training support is provided during EHR, CIS, and Home Care Solution onboarding." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "infrastructure", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Basic", justification: "HDR available with some interface between HDR and patient portal for lab and immunization data. Evolving HDR is being developed (18-month phased rollout); all hospital data exists on a single Cerner instance." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "Integration is one-way (hospital to community EHR); HDR is in development to allow bidirectional flow of information." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "community", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "Telus EHR now used by approximately 90% of providers, but some still use paper or legacy systems; EHR use only began rollout in 2021." },
      { subDimensionId: "community-2", level: "Advanced", justification: "Single EHR allows data exchange; consult letters are still e-faxed due to a known issue being fixed." },
      { subDimensionId: "community-3", level: "Emerging", justification: "Cerner pushes data to the community EHR, but the reverse is not yet true; view-only integration for ED and Acute Care Mental Health and Addictions." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "hospital", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Advanced", justification: "All acute care sites are on a single instance of Cerner; PEI is fully standardized at the hospital level." },
      { subDimensionId: "hospital-2", level: "Advanced", justification: "Single Cerner instance enables comprehensive cross-site exchange between all acute care facilities." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Cerner pushes data to the community EHR, but the reverse is not yet true; view-only integration for ED and Acute Care." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "Provincial portal launched in 2025 with labs and immunization data." },
      { subDimensionId: "portals-2", level: "Basic", justification: "Not applicable — data not available to reflect new patient portal." },
      { subDimensionId: "portals-3", level: "Basic", justification: "Limited data available via patient portal. Some community providers may enable basic sharing through provincial EHR." }
    ]
  },
  {
    jurisdictionId: "PEI", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "CIS data from hospitals available for system planning along with other health system data sources. EHR data is just beginning to be used; dashboards are available, but most analysis is focused on utilization, not outcomes." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Some primary care and cancer screening data used for planning from EHR. CIS data currently being used." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Wait times, ED metrics, and discharge summaries are tracked and used to support staffing and service redesign." }
    ]
  },

  /* ─────────────────────── NOVA SCOTIA ─────────────────────── */
  {
    jurisdictionId: "NS", dimensionId: "governance", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "governance-1", level: "Advanced", justification: "EHR decisions are made collaboratively by IWK, NSHA, and the provincial government." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Cerner Oracle Canada was awarded One Patient One Record (OPOR) contract and a 10-year deal to design, build, and maintain — the build is still in progress prior to the first implementation at the IWK, followed by staged implementation in the rest of the province." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "Certification is required for EHRs in Nova Scotia, and only two vendors are approved; integration requirements exist, but are inconsistently enforced." },
      { subDimensionId: "legislation-2", level: "Basic", justification: "Integration into SHARE is expected, but there is no legislated mandate for comprehensive interoperability or data sharing across systems." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "incentives", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Emerging", justification: "Doctors NS provides startup and utilization grants; broader participation-based payments are being phased into base salaries." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "Supports exist, but change management gaps persist — especially for late-career or non-digital providers; lack of test environments noted." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "infrastructure", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Emerging", justification: "SHARE contains clinical data from legacy systems, but fragmentation persists across zones; OPOR will replace it by 2026." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "Systems are not fully integrated; physicians must open multiple applications (e.g., SHARE, Millennium) to view complete records." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Emerging", justification: "Only two certified EHRs (Accuro, MedAccess) are allowed; uptake varies, and many providers still use paper or fragmented tools." },
      { subDimensionId: "community-2", level: "Basic", justification: "No direct integration between community EHRs; faxes, emails, and manual updates remain common." },
      { subDimensionId: "community-3", level: "Emerging", justification: "Documents and test results can be scanned or imported into SHARE, but workflows are fragmented and reliant on manual review." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "hospital", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Emerging", justification: "Cerner OPOR has been selected but is still being rolled out; legacy Meditech and McKesson systems are still in place." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some hospital-to-hospital sharing via SHARE and legacy systems; OPOR will enable comprehensive exchange." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information flows to community EHRs via SHARE; outpatient clinic integration remains limited until the provincial OPOR (Cerner) rollout is complete." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "YourHealthNS is new (2024) and provides access to labs, diagnostics, medications, and hospital stays; primary care data is largely absent." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "55% of survey respondents have accessed data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, diagnostic imaging, medications, and immunizations are visible; discharge summaries and clinical notes are limited or unavailable." }
    ]
  },
  {
    jurisdictionId: "NS", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Program-level analytics (e.g., renal, diabetes) exist, but not system-wide; plans for integration via OPOR exist but are under development." },
      { subDimensionId: "planning-2", level: "Basic", justification: "Primary and specialty care data are rarely used; hospital data is used within specific programs for local planning." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Most standard indicators (e.g., ED wait times, surgeries, ALC, COVID) are reported at the provincial level." }
    ]
  },

  /* ─────────────────────── NEWFOUNDLAND AND LABRADOR ─────────────────────── */
  {
    jurisdictionId: "NL", dimensionId: "governance", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "governance-1", level: "Advanced", justification: "The new digital health division leads EHR strategy with collaboration from eDOCSNL for both health authority and fee-for-service providers; roles are still evolving post-health authority merger." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "NL is planning province-wide Epic and Med Access integration, but strategy remains under formation and lacks execution maturity." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "legislation", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Emerging", justification: "Some standards exist between Meditech and Med Access, but the province lacks a broader legislative mandate or technical enforcement." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Standards in place for two supported systems (Med Access and Meditech)." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Advanced", justification: "Public providers use Med Access without fees. Incentives (e.g., Practice 360) exist for EHR use and quality improvement engagement." },
      { subDimensionId: "incentives-2", level: "Advanced", justification: "Fully funded and resourced EHR support program (eDOCSNL) with quality improvement support for community and health authority providers." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "infrastructure", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Advanced", justification: "HEALTHe NL aggregates hospital data, diagnostic imaging, labs, medications, vaccinations, and is expanding to include primary care EHR data and directives." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "Data flows into HEALTHe NL, and EHRs can pull information if physicians are tagged; broader real-time bidirectional flow is still limited." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "community", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "Over 90% of providers use Med Access via eDOCSNL, but many use separate instances." },
      { subDimensionId: "community-2", level: "Basic", justification: "Most EHRs are siloed by former region or provider; little direct exchange between EHRs except through HEALTHe NL." },
      { subDimensionId: "community-3", level: "Emerging", justification: "Integration depends on tagging physicians on reports; no shared clinical workflow or real-time syncing yet." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "hospital", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Emerging", justification: "All hospitals use Meditech now; Epic rollout is just starting and will take several years to complete." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "Some hospital-to-hospital sharing via HEALTHe NL; Epic rollout will improve cross-site exchange." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "Some hospital information flows to community EHRs via HEALTHe NL; outpatient clinic integration remains limited until provincial Epic implementation is complete." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "portals", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "portals-1", level: "Emerging", justification: "MyHealthNL provides some provincial data." },
      { subDimensionId: "portals-2", level: "Advanced", justification: "42% of survey respondents have accessed data online." },
      { subDimensionId: "portals-3", level: "Emerging", justification: "Labs, imaging, and medications available; primary care notes and specialist reports are delayed or restricted." }
    ]
  },
  {
    jurisdictionId: "NL", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "NL's data lab is robust and unique; hospital and some public EHR data are actively used, but primary and specialty EHR data is missing." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Hospital data is used extensively; primary care and specialty care data are being prepared for future use." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Real-time and monthly data (e.g., wait times, ALC, ED visits) are available and used for planning, though not always centralized." }
    ]
  },

  /* ─────────────────────── YUKON ─────────────────────── */
  {
    jurisdictionId: "YT", dimensionId: "governance", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "governance-1", level: "Emerging", justification: "No centralized governance for primary care EHRs; recent creation of Digital Health Strategy Steering Committee may change this." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Digital Health Strategy Steering Committee recently created; early conversations on standardizing Plexia instances and data exchange." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "legislation", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Basic", justification: "Yukon uses multiple separate community EHR instances (Plexia) alongside a hospital EHR (Meditech Expanse); no territory-wide content or exchange standards govern interoperability between these distinct systems." },
      { subDimensionId: "legislation-2", level: "Basic", justification: "Health Information Privacy and Management Act allows data sharing, but complexity leads to confusion and hesitancy around interoperability adoption." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "incentives", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Basic", justification: "No dedicated EHR incentive program; physicians pay for Plexia; small clinic overhead support exists but is not EHR-specific." },
      { subDimensionId: "incentives-2", level: "Basic", justification: "No structured supports or onboarding programs reported; fragmented adoption due to lack of centralized help." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "infrastructure", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Basic", justification: "Meditech Expanse acts as de facto HDR for the territory (labs, diagnostics, referrals), but limited to hospital-based systems." },
      { subDimensionId: "infrastructure-2", level: "Basic", justification: "Some integration from Plexia or other community EHRs into hospital systems; lab and reports electronically exchange. Other information must be manually exchanged or e-faxed." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "community", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "Most providers use Plexia, but in 7–13 separate instances; fragmented adoption hinders coordination." },
      { subDimensionId: "community-2", level: "Basic", justification: "No data exchange between Plexia instances; locums face challenges switching between systems." },
      { subDimensionId: "community-3", level: "Basic", justification: "Minimal direct exchange; e-fax and HL7 messages for labs used, but community EHRs and hospital EHRs are siloed." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "hospital", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Advanced", justification: "All hospitals are on a single instance of Meditech Expanse; coverage is standardized." },
      { subDimensionId: "hospital-2", level: "Emerging", justification: "HealthNet Viewer is read-only; EHR data is not bidirectionally linked with hospital systems, which remain largely on paper." },
      { subDimensionId: "hospital-3", level: "Emerging", justification: "All providers in the hospital use the territorial EHR to reference for health information. However, hospitals chart on paper; some physicians print notes from EHR to include in hospital chart manually." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "No patient portal exists; access limited to paper record requests, medical imaging results, and COVID vaccine proof." },
      { subDimensionId: "portals-2", level: "Basic", justification: "No provincial portal." },
      { subDimensionId: "portals-3", level: "Basic", justification: "Only COVID vaccine records and medical imaging reports are available electronically; all other data must be requested manually." }
    ]
  },
  {
    jurisdictionId: "YT", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Business and clinical analytics just launched with Meditech; early-stage use and infrastructure." },
      { subDimensionId: "planning-2", level: "Basic", justification: "Limited use of primary care data; billing data used; hospital data use emerging through Meditech analytics." },
      { subDimensionId: "planning-3", level: "Basic", justification: "Utilizes CIHI performance indicators." }
    ]
  },

  /* ─────────────────────── NORTHWEST TERRITORIES ─────────────────────── */
  {
    jurisdictionId: "NWT", dimensionId: "governance", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "governance-1", level: "Advanced", justification: "Centralized body manages the single territorial EHR." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Formal strategy to implement single EHR was achieved but ongoing development and strategy may be hindered by lack of proactive oversight." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "legislation", overallLevel: "Not Applicable",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Not Applicable", justification: "Only one EHR is used (Meditech) so standards are not needed. However, no HL7 integration yet; exploring standard summaries for interprovincial exchange but not currently enforced or standardized." },
      { subDimensionId: "legislation-2", level: "Basic", justification: "Legislation allows sharing but lacks clarity; culture of privacy blocks progress." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Advanced", justification: "All providers are government-funded; full public coverage for EHR participation with no clinic-level billing." },
      { subDimensionId: "incentives-2", level: "Advanced", justification: "Central territorial office manages training of all personnel for territorial EHR; virtual training for locums; staff test all upgrades and work closely with vendor." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "infrastructure", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Advanced", justification: "HealthNet Viewer consolidates labs, diagnostic imaging, medications, consults, discharge summaries, and immunizations, serving as the territorial data hub." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "HealthNet Viewer is read-only; EHR data is not bidirectionally linked with hospital systems, which remain largely on paper." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "community", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "100% adoption across territory (except one bandwidth-limited site); all community providers use single Telus Wolf instance." },
      { subDimensionId: "community-2", level: "Advanced", justification: "Single instance across NWT enables seamless sharing across clinics; no need for cross-vendor integration." },
      { subDimensionId: "community-3", level: "Basic", justification: "Hospitals chart on paper; limited structured digital exchange exists between community EHRs and hospital documentation systems." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "hospital", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Basic", justification: "Community providers and hospital-based outpatient services use EHR, but inpatient hospital units do not use it for documentation; scanned documents are manually shared." },
      { subDimensionId: "hospital-2", level: "Basic", justification: "No cross-site hospital electronic exchange; hospitals chart on paper." },
      { subDimensionId: "hospital-3", level: "Basic", justification: "One-way exchange via fax or report routing; limited interoperability between community EHRs (Meditech Expanse) and hospital documentation systems." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "No patient portal." },
      { subDimensionId: "portals-2", level: "Basic", justification: "Not available; patients rely solely on paper-based records." },
      { subDimensionId: "portals-3", level: "Basic", justification: "No access to records online." }
    ]
  },
  {
    jurisdictionId: "NWT", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Basic", justification: "Basic reporting via Meditech analytics just launched; capabilities for proactive planning or quality improvement are underdeveloped. EHR analytics capabilities are underused." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Planning informed by clinical data in EHR and population demographics; focus is on tailoring services to community needs." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Some performance metrics (e.g., surgical wait times, ED access) available in real time; broader system reporting not described." }
    ]
  },

  /* ─────────────────────── NUNAVUT ─────────────────────── */
  {
    jurisdictionId: "NU", dimensionId: "governance", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "governance-1", level: "Advanced", justification: "Entire territory uses a single EHR (Meditech Expanse) governed by the Department of Health; decisions are centralized." },
      { subDimensionId: "governance-2", level: "Emerging", justification: "Emerging: Clear roadmap and vision exist (e.g., PrescribeIT, patient portal), but infrastructure and national connectivity still being developed." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "legislation", overallLevel: "Not Applicable",
    subRatings: [
      { subDimensionId: "legislation-1", level: "Not Applicable", justification: "Only one EHR is used (Meditech Expanse) so standards are not needed. No HL7 integration yet; exploring standard summaries for interprovincial exchange but not currently enforced or standardized." },
      { subDimensionId: "legislation-2", level: "Emerging", justification: "Privacy frameworks and audit tools exist and EHR is tightly governed, but additional layers are still being refined." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "incentives", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "incentives-1", level: "Advanced", justification: "All EHR-related costs are publicly funded for physicians and nurse practitioners; no private payment or opt-out described." },
      { subDimensionId: "incentives-2", level: "Emerging", justification: "EHR is universally deployed and all staff are trained, but depends heavily on vendor/consultant support for problem support. There is a personalized learning plan for all users of OPOR but details are still in progress." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "infrastructure", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "infrastructure-1", level: "Basic", justification: "No true HDR yet; Meditech Expanse serves as a territory-wide CIS and data repository for lab, diagnostic imaging, immunizations, and clinical notes." },
      { subDimensionId: "infrastructure-2", level: "Emerging", justification: "All services are on Meditech, but there is no HL7-based integration with other provinces; interprovincial scanning and PACS links exist or are in progress." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "community", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "community-1", level: "Advanced", justification: "100% adoption; all primary care, mental health, and public health services chart directly into Meditech." },
      { subDimensionId: "community-2", level: "Advanced", justification: "Single-instance EHR allows seamless access and documentation across all sites in Nunavut." },
      { subDimensionId: "community-3", level: "Advanced", justification: "Hospital and community data are unified in Meditech; virtual providers access the same system in real time." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "hospital", overallLevel: "Advanced",
    subRatings: [
      { subDimensionId: "hospital-1", level: "Advanced", justification: "All services use the same EHR platform; documentation is unified and fully accessible across care settings." },
      { subDimensionId: "hospital-2", level: "Not Applicable", justification: "Nunavut operates a single unified Meditech Expanse instance across all facilities; cross-system hospital data exchange is not applicable in a single-EHR territory." },
      { subDimensionId: "hospital-3", level: "Advanced", justification: "Hospital and community data are unified in Meditech; virtual providers access the same system in real time." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "portals", overallLevel: "Basic",
    subRatings: [
      { subDimensionId: "portals-1", level: "Basic", justification: "Patient portal is in planning; broadband access has been a major barrier to deployment but Starlink is helping with connection." },
      { subDimensionId: "portals-2", level: "Basic", justification: "No portal currently available; future adoption is contingent on infrastructure and rollout." },
      { subDimensionId: "portals-3", level: "Basic", justification: "Only COVID vaccine records are electronically accessible; all other data is paper-based until portal launches." }
    ]
  },
  {
    jurisdictionId: "NU", dimensionId: "planning", overallLevel: "Emerging",
    subRatings: [
      { subDimensionId: "planning-1", level: "Emerging", justification: "Meditech supports population health analytics and registry reporting; efforts are underway to build a 140-indicator planning tool." },
      { subDimensionId: "planning-2", level: "Emerging", justification: "Planning informed by clinical data in EHR and population demographics; focus is on tailoring services to community needs." },
      { subDimensionId: "planning-3", level: "Emerging", justification: "Basic reporting exists (e.g., ALC, blood pressure control); many indicators available but some tracked manually or ad hoc." }
    ]
  }
];

export function getRating(jurisdictionId: string, dimensionId: string): JurisdictionRating | undefined {
  return RATINGS.find(r => r.jurisdictionId === jurisdictionId && r.dimensionId === dimensionId);
}

export function getJurisdiction(id: string): Jurisdiction | undefined {
  return JURISDICTIONS.find(j => j.id === id);
}

export function getDimension(id: string): Dimension | undefined {
  return DIMENSIONS.find(d => d.id === id);
}

export function countByLevel(level: MaturityLevel): number {
  let count = 0;
  for (const r of RATINGS) {
    for (const s of r.subRatings) {
      if (s.level === level) count++;
    }
  }
  return count;
}

export function jurisdictionSummary(jurisdictionId: string): Record<MaturityLevel, number> {
  const ratings = RATINGS.filter(r => r.jurisdictionId === jurisdictionId);
  const result: Record<MaturityLevel, number> = { Basic: 0, Emerging: 0, Advanced: 0, "Not Applicable": 0 };
  for (const r of ratings) {
    for (const s of r.subRatings) {
      result[s.level]++;
    }
  }
  return result;
}

export function getSubRating(jurisdictionId: string, dimensionId: string, subDimensionId: string): SubDimensionRating | undefined {
  return getRating(jurisdictionId, dimensionId)?.subRatings.find(s => s.subDimensionId === subDimensionId);
}

export const TOTAL_SUB_DIMENSIONS = DIMENSIONS.reduce((acc, d) => acc + d.subDimensions.length, 0);

export const SUB_DIMENSION_CRITERIA: Record<string, { basic: string; emerging: string; advanced: string }> = {
  "governance-1": {
    basic: "No central HIS governance, fragmented decision-making, and no efforts to drive EHR adoption or interoperability.",
    emerging: "HIS governance split across regions and care settings, with some limited efforts to drive EHR adoption and interoperability.",
    advanced: "Central HIS authority governs across all care settings, with well-resourced and accountable efforts to drive EHR adoption and interoperability."
  },
  "governance-2": {
    basic: "No provincial/territorial strategy or monitoring on progress towards EHR interoperability.",
    emerging: "Some strategy and monitoring of progress towards EHR interoperability, but limited to specific regions or care settings.",
    advanced: "Comprehensive provincial/territorial strategy with frontline user engagement, progress monitoring, consistent reporting, and alignment with national strategies."
  },
  "legislation-1": {
    basic: "No data content or exchange standards are defined by the province/territory.",
    emerging: "Data content (e.g., SNOMED, LOINC) and exchange standards (e.g., HL7, FHIR) are defined but not enforced by the province/territory through a certification program.",
    advanced: "Data content (e.g., SNOMED, LOINC) and exchange standards (e.g., HL7, FHIR) are defined and enforced by the province/territory, supported by a robust community EHR certification program that mandates interoperability and data sharing."
  },
  "legislation-2": {
    basic: "No established provincial/territorial health information legislation, or still in development.",
    emerging: "Provincial/territorial health information legislation promotes privacy, with safe data management requirements but limited focus on health data exchange.",
    advanced: "Provincial/territorial health information legislation promotes privacy and interoperability, with strong health data management and exchange standards."
  },
  "incentives-1": {
    basic: "No financial incentives to support EHR implementation, and EHR use is left entirely to the discretion of providers.",
    emerging: "Some financial incentives support EHR implementation, but there are no interoperability or data-sharing requirements.",
    advanced: "Robust financial incentives are tied to meaningful EHR use, including enhanced payments for data sharing, using EHR data to improve care, interoperability metrics, or reporting outcomes."
  },
  "incentives-2": {
    basic: "No government-funded training or technical assistance programs for community providers implementing EHRs.",
    emerging: "Some government-funded training and technical assistance programs exist for community providers, but without specific guidance on interoperability or data sharing.",
    advanced: "Extensive government-funded training and technical assistance programs for community providers implementing EHRs, with specific guidance on interoperability and data sharing."
  },
  "infrastructure-1": {
    basic: "No comprehensive provincial/territorial health data repository; health data is siloed across systems without a shared repository accessible across care settings.",
    emerging: "A health data repository exists but has limited scope, covering only some care settings or data types, or is not accessible to all care providers.",
    advanced: "A comprehensive provincial/territorial health data repository is accessible to all care providers across settings, containing labs, imaging, discharge summaries, medications, and vaccinations."
  },
  "infrastructure-2": {
    basic: "No workflow-level integration between the health data repository and provider EHRs or patient portals; data retrieval requires separate login or manual access.",
    emerging: "Some interfaces exist between the repository and certain EHRs or portals, but integration is not comprehensive, bidirectional, or real-time.",
    advanced: "Direct workflow-level integration exists between the health data repository and provider EHRs and patient portals, enabling bidirectional and real-time data exchange."
  },
  "community-1": {
    basic: "Fewer than 80% of community healthcare providers use an EHR system.",
    emerging: "80–95% of community healthcare providers use an EHR system.",
    advanced: "More than 95% of community healthcare providers use an EHR system."
  },
  "community-2": {
    basic: "No or minimal electronic data exchange between community EHRs; referrals and communications are primarily paper-based or fax-based.",
    emerging: "Some electronic data exchange exists between community EHRs (e.g., electronic referrals) but is limited in scope, frequency, or comprehensiveness.",
    advanced: "Comprehensive and frequent electronic data exchange between community EHRs, covering referrals, clinical notes, labs, imaging, and medications across primary care and community specialist systems."
  },
  "community-3": {
    basic: "No or minimal electronic data exchange from community providers to hospitals; most transfer of care information is paper-based.",
    emerging: "Some electronic data exchange between community and hospital settings exists but does not span all facilities or data types.",
    advanced: "Comprehensive electronic data exchange from community providers to all hospitals, leveraging health data repositories or integrated platforms for seamless data sharing."
  },
  "hospital-1": {
    basic: "Fewer than 80% of hospitals have an EHR system in use, or the majority of care is still paper-based.",
    emerging: "80–90% of hospitals have an EHR system across regions and facility types.",
    advanced: "More than 90% of hospitals have an EHR system in use across all regions and facility types."
  },
  "hospital-2": {
    basic: "No or minimal electronic data exchange between hospital EHRs; sharing relies on fax, paper, or manual transfer.",
    emerging: "Some electronic data exchange between hospital EHRs exists, facilitated by a health data repository or shared interface, but does not span all facilities or data types.",
    advanced: "Comprehensive cross-site electronic data exchange between all hospital EHRs, facilitated by a health data repository or common interface, with frequent and comprehensive sharing across all facilities."
  },
  "hospital-3": {
    basic: "No or minimal electronic data exchange from hospitals to community EHRs; discharge summaries and clinical data are primarily paper-based.",
    emerging: "Some electronic data exchange from hospitals to community EHRs exists but does not span all facilities or consistently include detailed clinical data.",
    advanced: "Comprehensive electronic data exchange from all hospitals to community EHRs, sharing detailed clinical data (e.g., discharge summaries, imaging, labs) in a timely and actionable manner."
  },
  "portals-1": {
    basic: "No provincial/territorial patient portal is available; patients cannot electronically access health information through a government-supported system.",
    emerging: "A provincial/territorial patient portal is available but is not accessible to all patients or providers, or coverage is incomplete.",
    advanced: "A provincial/territorial patient portal is fully in place and accessible to all patients and providers throughout the jurisdiction."
  },
  "portals-2": {
    basic: "Fewer than 20% of patients have accessed their personal health information electronically, or no portal exists.",
    emerging: "20–40% of patients have accessed their personal health information electronically.",
    advanced: "More than 40% of patients have accessed their personal health information electronically."
  },
  "portals-3": {
    basic: "The portal provides access to limited health data only (e.g., vaccination records), with no patient-provider interaction features.",
    emerging: "The portal provides access to several categories of health data (e.g., labs, some clinical notes), but does not cover the full range of patient data or interaction features.",
    advanced: "The portal provides comprehensive access including clinical notes, labs, imaging, medications, vaccinations, and enables communication with clinicians and scheduling."
  },
  "planning-1": {
    basic: "Limited analytics capacity; EHR data is not systematically integrated or analyzed for population health management.",
    emerging: "A health analytics function exists and can access some EHR data, but capacity for comprehensive population health management across settings is limited.",
    advanced: "A mature health analytics function integrates and analyzes EHR data from multiple care settings for comprehensive population health management."
  },
  "planning-2": {
    basic: "EHR data from community and hospital settings is not actively used for health system planning; decisions rely primarily on administrative data or manual reporting.",
    emerging: "EHR data is used for some planning purposes but is not systematically integrated across care settings or used consistently by government or health authorities.",
    advanced: "EHR data from community and hospital settings is actively and systematically used by government or health authorities for health system planning, quality improvement, and decision-making."
  },
  "planning-3": {
    basic: "No real-time or near-real-time performance metrics derived from EHR data; reporting relies on periodic administrative data with limited accountability.",
    emerging: "Some performance metrics are derived from EHR data but reporting is not real-time or near-real-time, or lacks comprehensive accountability mechanisms.",
    advanced: "Real-time or near-real-time performance metrics (e.g., ED wait times, surgical wait times, ALC rates) are derived from EHR data with clear accountability mechanisms."
  }
};
