import React, { useState } from "react";
import { ChevronDown, ChevronUp, Building2, Scale, GraduationCap, Server, Users, Building, Smartphone, BarChart3, Linkedin } from "lucide-react";
import { DIMENSIONS, MATURITY_LEVELS, SUB_DIMENSION_CRITERIA } from "@/data/scorecard";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

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

const AUTHORS = [
  {
    id: "kannappan",
    photo: withBase("authors/kannappan.png"),
    name: "Sunand Kannappan",
    credentials: "BHSc",
    role: "Lead author",
    affiliation: "University of Calgary",
    linkedin: "https://www.linkedin.com/in/sunand-kannappan-b3b97a183/",
    bio: "Physician-in-training at the University of Calgary with experience in health consulting at McKinsey and the Cleveland Clinic. He is a passionate advocate for digital health in Canada and led the environmental scan and interoperability maturity assessment for this study."
  },
  {
    id: "hastings",
    photo: withBase("authors/hastings.png"),
    name: "Stephanie Hastings",
    credentials: "MSc PhD",
    role: "Co-author",
    affiliation: "University of Calgary",
    linkedin: "https://www.linkedin.com/in/stephanie-hastings-ph-d-668ab741/",
    bio: "Senior research and evaluation professional at the University of Calgary with a focus on health services research and health system structure. Her work examines how care organization and policy shape patient outcomes across Canadian jurisdictions."
  },
  {
    id: "forster",
    photo: withBase("authors/forster.png"),
    name: "Alan Forster",
    credentials: "MD MSc",
    role: "Co-author",
    affiliation: "McGill University Health Centre",
    linkedin: "https://www.linkedin.com/in/alan-john-forster-231207106/",
    bio: "Professor of Innovation and Director of Innovation, Transformation and Clinical Performance at the McGill University Health Centre, where he leads efforts to improve care quality through data, AI, and electronic health systems. His research spans patient safety, health system performance, and the responsible use of health information."
  },
  {
    id: "dean",
    photo: withBase("authors/dean.png"),
    name: "Stafford Dean",
    credentials: "PhD",
    role: "Co-author",
    affiliation: "Alberta Health Services",
    linkedin: "https://www.linkedin.com/in/stafford-dean-23481984/",
    bio: "Chief Data and Analytics Officer at Alberta Health Services, where he leads enterprise data strategy, analytics infrastructure, and evidence-informed decision-making across one of Canada's largest health systems. His work focuses on harnessing health data to improve population health and system performance."
  },
  {
    id: "hollett",
    photo: null,
    name: "Grant Hollett",
    credentials: "BSc",
    role: "Co-author",
    affiliation: "",
    linkedin: null,
    bio: "Health researcher focused on digital health assessment and EHR interoperability policy. He contributed to data collection and comparative analysis for this national environmental scan."
  },
  {
    id: "hagens",
    photo: withBase("authors/hagens.png"),
    name: "Simon Hagens",
    credentials: "MBA",
    role: "Co-author",
    affiliation: "Hagens Consulting",
    linkedin: "https://www.linkedin.com/in/simon-hagens/",
    bio: "Former Vice President of Performance at Canada Health Infoway, where he led national measurement and evaluation of EHR adoption and digital health benefits. He is now Principal at Hagens Consulting and Adjunct Professor at the Telfer School of Management, University of Ottawa."
  },
  {
    id: "gheorghiu",
    photo: withBase("authors/gheorghiu.png"),
    name: "Bobby Gheorghiu",
    credentials: "MHSc",
    role: "Co-author",
    affiliation: "Canada Health Infoway",
    linkedin: "https://www.linkedin.com/in/bgheorghiu/",
    bio: "Senior Director of Research and Analytics at Canada Health Infoway, with expertise spanning data analytics, performance measurement, health policy, and digital health strategy. His work helps shape evidence-based decision-making for national digital health programs."
  },
  {
    id: "affleck",
    photo: withBase("authors/affleck.png"),
    name: "Ewan Affleck",
    credentials: "CM MDCM",
    role: "Co-author",
    affiliation: "Yellowknife, NWT",
    linkedin: "https://www.linkedin.com/in/ewan-affleck-a32253189/",
    bio: "Family physician who has practiced in Canada's North for over 30 years and was named to the Order of Canada in 2013 for pioneering the adoption of electronic medical records in the NWT. He is a nationally recognized advocate for equitable digital health access in rural, remote, and northern communities."
  },
  {
    id: "snyman",
    photo: withBase("authors/snyman.png"),
    name: "Claire Snyman",
    credentials: "BSc",
    role: "Co-author",
    affiliation: "Synapse Consulting",
    linkedin: "https://www.linkedin.com/in/clairesnyman/",
    bio: "Patient experience strategist and digital health consultant who brings a dual perspective as both a health system professional and a patient partner. A TEDx speaker and author, she advises health systems and researchers on designing health data initiatives that meaningfully engage patients."
  },
  {
    id: "adams",
    photo: withBase("authors/adams.png"),
    name: "Owen Adams",
    credentials: "PhD",
    role: "Co-author",
    affiliation: "",
    linkedin: null,
    bio: "Chief Policy Advisor at the Canadian Medical Association with over two decades of research in health workforce, health system policy, and digital health. His work has shaped national policies on physician engagement and health system modernization."
  },
  {
    id: "williamson",
    photo: withBase("authors/williamson.png"),
    name: "Tyler Williamson",
    credentials: "PhD",
    role: "Co-author",
    affiliation: "University of Calgary",
    linkedin: "https://www.linkedin.com/in/dr-tyler-williamson-b2530428/",
    bio: "Director of the Centre for Health Informatics and Professor of Biostatistics at the University of Calgary's Cumming School of Medicine, where he leads research on health data science, EHR analytics, and primary care informatics. His work advances the use of real-world health data to improve population health outcomes."
  },
  {
    id: "manns",
    photo: withBase("authors/manns.png"),
    name: "Braden Manns",
    credentials: "MD MSc",
    role: "Corresponding author",
    affiliation: "University of Calgary",
    contact: "bjmanns@ucalgary.ca",
    linkedin: "https://www.linkedin.com/in/braden-manns-0377182b8/",
    bio: "Senior Associate Dean for Health Research at the University of Calgary's Cumming School of Medicine and a practicing nephrologist who holds the Svare Professorship in Health Economics. His research focuses on the value and cost-effectiveness of health system interventions, with a commitment to improving the quality of Canadian kidney care and health system performance."
  }
];

function SubDimensionCriteriaCard({ subDimId, subDimName }: { subDimId: string; subDimName: string }) {
  const [open, setOpen] = useState(false);
  const criteria = SUB_DIMENSION_CRITERIA[subDimId];
  if (!criteria) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-card hover:bg-muted/50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-sans text-sm font-medium text-foreground">{subDimName}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-border">
          {(["Basic", "Emerging", "Advanced"] as const).map(level => {
            const meta = MATURITY_LEVELS[level];
            return (
              <div
                key={level}
                className="flex flex-col gap-2 px-4 py-3 border-b border-border last:border-b-0"
              >
                <span
                  className="inline-block text-xs font-sans font-semibold px-2.5 py-1 rounded border self-start"
                  style={{
                    backgroundColor: meta.hex,
                    color: level === "Basic" ? "#374151" : level === "Emerging" ? "#134e4a" : "#ffffff",
                    borderColor: level === "Basic" ? "#d1d5db" : level === "Emerging" ? "#5eada8" : "#145e54"
                  }}
                >
                  {level}
                </span>
                <p className="font-sans text-xs text-foreground/80 leading-relaxed">
                  {criteria[level.toLowerCase() as "basic" | "emerging" | "advanced"]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const enablerDims = DIMENSIONS.filter(d => d.section === "Enabler");
  const statusDims = DIMENSIONS.filter(d => d.section === "Status");

  return (
    <div>
      <section className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-sans tracking-widest uppercase text-primary font-semibold mb-3">About this project</div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-about">
            About the Connected Care Scorecard
          </h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            The Connected Care Scorecard was developed to assess and compare EHR interoperability maturity across all 13 Canadian provinces and territories using a structured interoperability maturity model.
          </p>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-14">

          {/* Study design */}
          <div data-testid="section-methods">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Study design</h2>
            <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
              The research team conducted a national environmental scan of EHR interoperability status across all 10 provinces and 3 territories, focusing on the primary use of health data for clinical care. The study combined a review of Canada Health Infoway jurisdictional surveys, including the 2024 National Survey of Canadian Physicians and the 2024 Canadian Digital Health Survey, with structured interviews of provincial and territorial subject matter experts.
            </p>
            <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
              Interviews were conducted with 23 participants who had detailed knowledge of all provinces and territories, selected for their expertise in government or ministry, health authority or hospital, or clinical leadership. Interviews were conducted via video call between September 2024 and June 2025, audio-recorded, and transcribed.
            </p>
            <p className="font-sans text-base text-foreground/80 leading-relaxed">
              Two researchers independently generated preliminary maturity ratings based on document review and interviews, resolving discrepancies through discussion and, when needed, adjudication by a third reviewer. Draft ratings were shared with interview participants; at least one participant per jurisdiction reviewed and validated the data. The ratings reflect the state of EHR interoperability assessed at mid-2025.
            </p>
          </div>

          {/* Maturity model */}
          <div data-testid="section-framework">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">The interoperability maturity model</h2>
            <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
              The research team developed a purpose-built EHR interoperability maturity model through an iterative process. The model includes four dimensions that <em>enable</em> interoperability and four dimensions that capture the current <em>status</em> of interoperability, each with two or three sub-dimensions rated independently at Basic, Emerging, or Advanced.
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              Expand any sub-dimension below to see what each maturity level means in practice. Full criteria are available in Appendix 2 of the published paper.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {(["Basic", "Emerging", "Advanced"] as const).map(level => {
                const meta = MATURITY_LEVELS[level];
                return (
                  <div key={level} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-sm border flex-shrink-0"
                      style={{
                        backgroundColor: meta.hex,
                        borderColor: level === "Basic" ? "#d1d5db" : level === "Emerging" ? "#5eada8" : "#145e54"
                      }}
                    />
                    <span className="font-sans text-xs font-semibold text-foreground/70">{level}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-8">
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-4">Interoperability Enablers</p>
              {enablerDims.map(dim => {
                const Icon = DIMENSION_ICONS[dim.id];
                return (
                <div key={dim.id} className="mb-6">
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-1 flex items-center gap-1.5">
                    {Icon && <Icon size={14} className="text-primary flex-shrink-0" />}
                    {dim.shortName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-3">{dim.description}</p>
                  <div className="space-y-2">
                    {dim.subDimensions.map(sub => (
                      <SubDimensionCriteriaCard key={sub.id} subDimId={sub.id} subDimName={sub.name} />
                    ))}
                  </div>
                </div>
                );
              })}
            </div>

            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary mb-4">Interoperability Status</p>
              {statusDims.map(dim => {
                const Icon = DIMENSION_ICONS[dim.id];
                return (
                <div key={dim.id} className="mb-6">
                  <h3 className="font-sans font-semibold text-sm text-foreground mb-1 flex items-center gap-1.5">
                    {Icon && <Icon size={14} className="text-primary flex-shrink-0" />}
                    {dim.shortName}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-3">{dim.description}</p>
                  <div className="space-y-2">
                    {dim.subDimensions.map(sub => (
                      <SubDimensionCriteriaCard key={sub.id} subDimId={sub.id} subDimName={sub.name} />
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Authors */}
          <div data-testid="section-authors">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Authors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {AUTHORS.map(author => (
                <div key={author.id} className="flex gap-4 items-start">
                  {author.photo ? (
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-16 h-16 rounded-full object-cover object-top flex-shrink-0 border-2 border-border shadow-sm"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-border text-primary font-serif font-bold text-lg"
                      aria-label={author.name}
                    >
                      {author.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-sm text-foreground leading-tight">
                      {author.name}
                      {author.credentials && (
                        <span className="font-normal text-muted-foreground">, {author.credentials}</span>
                      )}
                    </div>
                    {author.role === "Corresponding author" && (
                      <div className="font-sans text-xs text-primary font-medium mt-0.5">Corresponding author</div>
                    )}
                    {author.affiliation && (
                      <div className="font-sans text-xs text-muted-foreground">{author.affiliation}</div>
                    )}
                    {author.contact && (
                      <a
                        href={`mailto:${author.contact}`}
                        className="font-sans text-xs text-primary hover:underline"
                      >
                        {author.contact}
                      </a>
                    )}
                    {"bio" in author && author.bio && (
                      <p className="font-sans text-xs text-foreground/60 leading-relaxed mt-1.5">{author.bio}</p>
                    )}
                    {"linkedin" in author && author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans text-[10px] text-[#0A66C2] hover:underline mt-1.5"
                      >
                        <Linkedin size={10} />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethics */}
          <div className="bg-muted/60 rounded-lg p-6" data-testid="section-ethics">
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Ethics</h2>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed">
              This study received ethics approval from the University of Calgary Conjoint Health Research Ethics Board (REB23-1135).
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
