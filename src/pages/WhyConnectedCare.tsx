import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BARRIERS = [
  {
    number: "1",
    title: "Weak health data governance",
    body: "No single accountable oversight body exists at a national level, and decision-making is fragmented across vendors, regions, health authorities, and ministries. This fragmentation slows policy, creates misalignment, and leaves interoperability progress contingent on local initiative rather than coordinated strategy."
  },
  {
    number: "2",
    title: "Lack of interoperability legislation and standards",
    body: "Without legislative mandates, there is little obligation for vendors and data custodians to adopt common data content or exchange protocols. Most provincial health information legislation focuses on privacy, not on mandating data sharing or interoperability across systems or jurisdictions."
  },
  {
    number: "3",
    title: "Misaligned incentives",
    body: "Providers are rarely compensated for the time and effort required to implement interoperable workflows or share clinical data meaningfully. Where financial incentives for EHR adoption exist, they are rarely tied to data exchange or interoperability metrics, dampening uptake of connected workflows."
  },
  {
    number: "4",
    title: "Technical and funding challenges",
    body: "Many jurisdictions lack the sustained capital and operating funding to build and maintain unified platforms. Aging legacy systems, siloed health data repositories, and infrastructure gaps, particularly in rural and remote areas, make technical integration costly and slow."
  },
  {
    number: "5",
    title: "Low physician digital literacy and resistance to workflow change",
    body: "Low familiarity with digital health tools and reluctance to change established clinical workflows, particularly among more experienced or solo practitioners, reduces demand for interoperability improvements and limits adoption of implemented solutions."
  },
  {
    number: "6",
    title: "Privacy and cybersecurity concerns",
    body: "Concerns about data privacy and cybersecurity risk often lead organizations and clinics to default to restricting data access. While legitimate, these concerns, when not paired with enabling policy and technical safeguards, sustain reliance on fax-based communication and restrict the movement of clinical data."
  },
  {
    number: "7",
    title: "Limited vendor capacity and data-blocking behaviours",
    body: "Some EHR vendors impose proprietary interfaces, high connectivity fees, and slow integration timelines that constrain third-party connectivity. These data-blocking behaviours, whether intentional or structural, impede the creation of an open, interoperable health data ecosystem."
  },
  {
    number: "8",
    title: "Inconsistent data and workflow standards",
    body: "Heterogeneous clinical documentation practices, billing and coding systems, and referral processes make it difficult to exchange data meaningfully across settings. Even when technical connectivity exists, the semantic inconsistency of clinical notes, lab naming, and problem lists limits the usability of shared data."
  }
];

export default function WhyConnectedCare() {
  return (
    <div>
      {/* Page hero */}
      <section className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-sans tracking-widest uppercase text-primary font-semibold mb-3">Background</div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="heading-why">
            Why does connected care matter?
          </h1>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Canada has achieved near-universal adoption of electronic health records and yet interoperability (the secure exchange and use of health data across different systems and settings) remains limited. Understanding why requires examining both the benefits at stake and the barriers that have impeded progress.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">

          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">The problem of disconnected care</h2>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-6">
            Data exchange between primary care and specialists, and between hospitals and community settings, remains heavily dependent on fax (traditional or online) or mailed letters in every Canadian jurisdiction. Nearly all jurisdictions lack EHR interoperability between hospitals, community specialists, and primary care. Patient portal contents and system-level analytics using EHR data are underdeveloped nationally.
          </p>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-8">
            That fragmentation has direct consequences for patients, providers, and the health system. A patient who travels across provincial lines may find their records unavailable to treating clinicians. A specialist who lacks access to a patient's medication list or recent labs may order redundant tests. An emergency physician in a rural setting may not know a patient's documented diagnoses or allergies. These failures, rooted in disconnected data, are not merely inconvenient: they drive cost, harm, and inefficiency estimated at more than{" "}
            <a
              href="https://www.cihi.ca/en/digital-health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
              title="Canadian Institute for Health Information: Digital Health"
            >
              $9.4 billion annually in Canada
            </a>
            .
          </p>

          <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-5 mb-8" data-testid="callout-quote">
            <p className="font-serif text-lg italic text-foreground/90 leading-snug">
              "Integrated EHR health data exchange was limited, and nearly all jurisdictions lacked EHR interoperability between hospitals, community specialists, and primary care."
            </p>
            <p className="font-sans text-sm text-muted-foreground mt-2">CMAJ 2026 (doi: 10.1503/cmaj.251640)</p>
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What interoperability enables</h2>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
            The paper identifies five categories of benefit when interoperability is achieved:
          </p>
          <ul className="space-y-3 mb-8">
            {[
              { heading: "Safer, higher quality patient care", body: "Better communication, care coordination, and clinical decision support at the point of care, reducing medication errors, duplicate tests, and care gaps." },
              { heading: "Better provider experience", body: "Seamless access to appropriate patient information and less duplicative documentation, reducing administrative burden and clinician burnout." },
              { heading: "Operational efficiency", body: "Streamlined workflows, fewer repeated tests, and better access to data for day-to-day clinical management." },
              { heading: "Patient empowerment", body: "Patient digital access to their records, enabling better self-management, which is critical to improving health outcomes." },
              { heading: "Health system planning and innovation", body: "Stronger quality improvement, innovation, and population health management driven by linked, high-quality clinical data." }
            ].map((item, i) => (
              <li key={i} className="flex gap-3 font-sans text-base text-foreground/80 leading-relaxed" data-testid={`interop-item-${i}`}>
                <span className="text-primary font-bold mt-0.5 flex-shrink-0">→</span>
                <span><strong className="text-foreground font-semibold">{item.heading}:</strong> {item.body}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The 8 key barriers identified by the research</h2>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-6">
            Through structured interviews with 23 subject matter experts across all 10 provinces and 3 territories, the research team identified 8 recurring barriers to EHR interoperability. The first four align with the four enabler dimensions of the maturity model; the remaining four are cross-cutting systemic challenges.
          </p>

          <div className="space-y-4 mb-10">
            {BARRIERS.map((barrier, i) => (
              <div
                key={i}
                className="bg-card border border-card-border rounded-xl p-5 flex gap-4"
                data-testid={`barrier-${i}`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-serif font-bold text-sm text-primary">{barrier.number}</span>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground text-base mb-1">{barrier.title}</h3>
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed">{barrier.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">The policy context: Bill C-72 and Bill S-5</h2>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
            In 2023, Canada Health Infoway released the Shared Pan-Canadian Interoperability Roadmap. In 2024, four national medical organizations convened the Digital Health Interoperability Task Force to call for a 5-year national health data interoperability plan. Also in 2024, the federal government introduced{" "}
            <a
              href="https://www.parl.ca/legisinfo/en/bill/44-1/c-72"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
            >
              Bill C-72
            </a>
            {" "}(the{" "}
            <a
              href="https://www.canada.ca/en/health-canada/news/2024/06/the-government-of-canada-introduces-the-connected-care-for-canadians-act-improving-patients-safety-and-access-to-their-health-information.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
            >
              <em>Connected Care for Canadians Act</em>
            </a>
            ) to foster health data interoperability by prohibiting vendor data blocking through federal or equivalent jurisdictional regulatory standards.
          </p>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-4">
            When federal Parliament was prorogued in March 2025, Bill C-72 was terminated. On February 4, 2026, the federal government revived the legislation as{" "}
            <a
              href="https://www.canada.ca/en/health-canada/news/2026/02/the-government-of-canada-introduces-legislation-to-build-a-more-connected-health-care-system.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2"
            >
              Bill S-5
            </a>
            , the <em>Connected Care for Canadians Act</em>.
          </p>
          <p className="font-sans text-base text-foreground/80 leading-relaxed mb-8">
            The paper's authors conclude that national legislation, paired with jurisdiction-specific governance strengthening, standards enforcement, and targeted incentives, will be essential to realizing true pan-Canadian health data interoperability and the system-wide benefits it enables.
          </p>

          <div className="bg-card border border-card-border rounded-lg p-6 text-center" data-testid="cta-why">
            <p className="font-serif text-lg font-bold text-foreground mb-2">Ready to see how your province compares?</p>
            <p className="font-sans text-sm text-muted-foreground mb-4">Explore the interactive scorecard across all 13 jurisdictions and 8 dimensions.</p>
            <Link
              to="/scorecard"
              data-testid="link-why-to-scorecard"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sans font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Open the Scorecard <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
