import { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Search, X } from 'lucide-react';

/**
 * Design Philosophy: Minimalist Institutional
 * - Soft blue and white palette for eye comfort
 * - Generous whitespace and breathing room
 * - Serif headings (Playfair Display) with sans-serif body (Inter)
 * - Subtle animations and smooth transitions
 * - Hierarchical structure through typography and spacing
 */

interface Section {
  id: string;
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    id: 'header',
    title: 'Coalition of Nations for Anomalous Security (CONAS)',
    content: 'General Operations Document (Out of Roleplay)',
  },
  {
    id: 'intro',
    title: 'Overview: What is CONAS?',
    content: `The Coalition of Nations for Anomalous Security (CONAS) is a multinational conglomerate operating within SCP frameworks. It provides funding, resources, and personnel to organizations engaged in anomalous containment and research, most notably the SCP Foundation, of which CONAS is a primary supporter.

CONAS serves as the operational bridge between global governments and the anomalous world, ensuring coordination, secrecy, and sustained operational capability.`,
  },
  {
    id: 'funding',
    title: 'Funding Structure',
    content: `CONAS derives its funding through multiple channels, including but not limited to:

Mandatory Government Contributions: All Member States are required to provide fixed contributions allocated toward defense intelligence, disaster response, and civil protection services.

Strategic Technological Exchange: Member States maintain investment due to access to proprietary CONAS technologies, including advanced weaponry, deep-sea systems, and experimental innovations not available through conventional sectors.

Classified Industrial and Manufacturing Revenue: CONAS produces containment systems, anomalous-resistant materials, and specialized machinery, which are distributed to authorized anomalous organizations at high value.

Licensing of Containment and Safety Systems: CONAS technologies are licensed for fixed operational periods, requiring renewal or system retrofitting to maintain compliance with evolving anomalous standards.`,
  },
  {
    id: 'objectives',
    title: 'Strategic Objectives',
    content: `CONAS operates under the following objectives:

Support the containment, security, and research of anomalous entities

Sustain and protect the operational capacity of the SCP Foundation and allied organizations

Reduce reliance on direct military escalation during anomalous incidents

Prevent the weaponization of anomalies by governments or private entities

Preserve global secrecy while maintaining stable international relations`,
  },
  {
    id: 'civil-branch',
    title: 'Civil Branch',
    content: `The Civil Branch consists of four subdivisions dedicated to diplomatic, financial, and logistical operations.

Office of Diplomatic Affairs (ODA): Serves as the primary civil authority of CONAS within Site-416. Maintains diplomatic relations with the SCP Foundation, conducts joint meetings and strategic discussions, oversees financial coordination and future development planning, and performs inspections across containment zones, general facilities, and combat areas.

Division and Allocation (D&A): Governs all financial distribution within CONAS operations. Reviews and approves funding requests, allocates resources across sites and divisions, and holds final authority over investment, expansion, and development decisions.

External Financial Investigations Division (EFID): Enforces financial integrity across all CONAS operations. Investigates financial fraud, theft, and misuse of funds, exercises executive authority to suspend or terminate funding, detains and extradites personnel involved in financial misconduct, and conducts independent financial investigations involving external organizations, including the SCP Foundation.

Logistics and Engineering (L&E): Ensures all facilities meet CONAS operational and structural standards. Repairs structural damage, screens incoming materials, and implements CONAS-grade infrastructure and containment standards. The Bio-Technical Maintenance Team (BMT), a specialized unit within L&E, conducts decontamination, repair, and restoration of bio-contaminated zones.`,
  },
  {
    id: 'defense-branch',
    title: 'Defense Branch',
    content: `The Defense Branch consists of four subdivisions responsible for security, medical response, and classified operations.

Praetor-1 "Silent Watch" (P-1): Serves as the primary protective force for CONAS Civil personnel. Provides security for ODA and other Civil members, maintains a continuous protective presence across facilities, and acts as the largest internal defense division within CONAS.

Medical Emergency Response Corps (MERC): A specialized combat-medical division with fully certified combat medics and advanced medical training beyond standard field care. Ensures the health and operational readiness of all CONAS personnel.

Authority Elite Guarding & Intervention Service (A.E.G.I.S.): [CLASSIFIED] Known subdivision includes Æ – B.I.O ("JACKALS"), which provides security for L&E BMT operations and specializes in biologically hazardous and high-risk environments.

Vanguard Intelligence and Global Infiltration Liaison (V.I.G.I.L.): [CLASSIFIED]`,
  },
  {
    id: 'acknowledgements',
    title: 'Acknowledgements',
    content: `Document Author: ProLockMaster – CONAS Faction Leader

This document has been produced under the oversight of the CONAS Faction Leader and is designated as Out of Roleplay (OOR) material.`,
  },
];

interface TableOfContentsItem {
  id: string;
  label: string;
  subsections?: Array<{ id: string; label: string }>;
}

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<string>('logo-section');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['civil-section', 'defense-section'])
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tableOfContents: TableOfContentsItem[] = [
    { id: 'logo-section', label: 'Overview' },
    { id: 'overview-section', label: 'What is CONAS?' },
    { id: 'objectives-section', label: 'Strategic Objectives' },
    {
      id: 'civil-section',
      label: 'Civil Branch',
      subsections: [
        { id: 'civil-oda', label: 'Office of Diplomatic Affairs' },
        { id: 'civil-da', label: 'Division and Allocation' },
        { id: 'civil-efid', label: 'External Financial Investigations' },
        { id: 'civil-le', label: 'Logistics and Engineering' },
      ],
    },
    {
      id: 'defense-section',
      label: 'Defense Branch',
      subsections: [
        { id: 'defense-p1', label: 'Praetor-1 "Silent Watch"' },
        { id: 'defense-merc', label: 'Medical Emergency Response Corps' },
        { id: 'defense-aegis', label: 'A.E.G.I.S.' },
        { id: 'defense-vigil', label: 'V.I.G.I.L.' },
      ],
    },
    { id: 'ack-section', label: 'Acknowledgements' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
            // Update active section when it comes into view
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-section]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const isSectionExpandable = (item: TableOfContentsItem) =>
    item.subsections && item.subsections.length > 0;

  const filterTableOfContents = () => {
    if (!searchQuery.trim()) return tableOfContents;

    return tableOfContents
      .map((item) => {
        const labelMatches = item.label
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const subsectionsMatch = item.subsections?.filter((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

        if (labelMatches || subsectionsMatch.length > 0) {
          return {
            ...item,
            subsections: subsectionsMatch.length > 0 ? subsectionsMatch : item.subsections,
          };
        }
        return null;
      })
      .filter((item) => item !== null) as TableOfContentsItem[];
  };

  const filteredContents = filterTableOfContents();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Table of Contents Sidebar - Mobile Friendly */}
      <aside className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-card border-r border-border pt-24 overflow-y-auto">
        <nav className="px-6 py-8">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">Contents</h3>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-muted/50 border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-background transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {filteredContents.length > 0 ? (
              filteredContents.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center">
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex-1 flex items-center gap-2 text-sm transition-all duration-200 py-1 px-2 rounded ${
                        activeSection === item.id
                          ? 'text-accent font-semibold bg-accent/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      {activeSection === item.id && (
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </button>
                    {isSectionExpandable(item) && (
                      <button
                        onClick={() => toggleExpanded(item.id)}
                        className="p-1 hover:bg-muted/30 rounded transition-colors"
                        aria-label={
                          expandedSections.has(item.id) ? 'Collapse' : 'Expand'
                        }
                      >
                        {expandedSections.has(item.id) ? (
                          <ChevronDown className="w-4 h-4 text-accent" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                  {isSectionExpandable(item) && expandedSections.has(item.id) && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                      {item.subsections!.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center gap-2 text-xs transition-all duration-200 py-1 px-2 rounded text-muted-foreground hover:text-foreground hover:bg-muted/30 w-full text-left"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                            <span>{sub.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li className="py-4 text-center">
                <p className="text-sm text-muted-foreground">No sections found</p>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container py-6 flex items-center gap-6">
            <img
              src="/manus-storage/Coalition_Of_Nations_For_Anomalous_Security..._569aa721.png"
              alt="CONAS Logo"
              className="w-20 h-20 flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl font-bold text-accent">CONAS</h1>
              <p className="text-sm text-muted-foreground mt-1">General Operations Document</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-12">
          {/* Logo Hero Section */}
          <section
          data-section
          id="logo-section"
          className={`mb-16 text-center transition-all duration-700 ${
            visibleSections.has('logo-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <img
            src="/manus-storage/Coalition_Of_Nations_For_Anomalous_Security..._569aa721.png"
            alt="CONAS Logo"
            className="w-48 h-48 mx-auto mb-8"
          />
        </section>

          {/* Intro Section */}
          <section
          data-section
          id="intro-section"
          className={`mb-16 transition-all duration-700 delay-100 ${
            visibleSections.has('intro-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <p className="text-sm text-accent font-semibold uppercase tracking-wide">
              Out of Roleplay
            </p>
            <p className="text-lg text-foreground mt-4 leading-relaxed">
              This document applies to all active divisions under the Coalition of Nations for
              Anomalous Security (CONAS). It has been produced under the oversight of the CONAS
              Faction Leader and is designated as Out of Roleplay (OOR) material.
            </p>
            <p className="text-lg text-foreground mt-4 leading-relaxed">
              CONAS is structured into two primary branches: Civil Branch and Defense Branch.
            </p>
          </div>
        </section>

          {/* Overview Section */}
          <section
          data-section
          id="overview-section"
          className={`mb-16 transition-all duration-700 delay-200 ${
            visibleSections.has('overview-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Overview: What is CONAS?</h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              The Coalition of Nations for Anomalous Security (CONAS) is a multinational
              conglomerate operating within SCP frameworks. It provides funding, resources, and
              personnel to organizations engaged in anomalous containment and research, most
              notably the SCP Foundation, of which CONAS is a primary supporter.
            </p>
            <p>
              CONAS serves as the operational bridge between global governments and the anomalous
              world, ensuring coordination, secrecy, and sustained operational capability.
            </p>
          </div>

          {/* Funding Structure Subsection */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-accent mb-4">Funding Structure</h3>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>CONAS derives its funding through multiple channels:</p>
              <div className="space-y-3 ml-4 border-l-2 border-accent pl-4">
                <div>
                  <p className="font-semibold text-accent">Mandatory Government Contributions</p>
                  <p className="text-sm mt-1">
                    All Member States are required to provide fixed contributions allocated toward
                    defense intelligence, disaster response, and civil protection services.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Strategic Technological Exchange</p>
                  <p className="text-sm mt-1">
                    Member States maintain investment due to access to proprietary CONAS
                    technologies, including advanced weaponry, deep-sea systems, and experimental
                    innovations not available through conventional sectors.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-accent">
                    Classified Industrial and Manufacturing Revenue
                  </p>
                  <p className="text-sm mt-1">
                    CONAS produces containment systems, anomalous-resistant materials, and
                    specialized machinery, which are distributed to authorized anomalous
                    organizations at high value.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-accent">Licensing of Containment and Safety Systems</p>
                  <p className="text-sm mt-1">
                    CONAS technologies are licensed for fixed operational periods, requiring
                    renewal or system retrofitting to maintain compliance with evolving anomalous
                    standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* Strategic Objectives */}
          <section
          data-section
          id="objectives-section"
          className={`mb-16 transition-all duration-700 delay-300 ${
            visibleSections.has('objectives-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Strategic Objectives</h2>
          <div className="space-y-3 text-foreground">
            {[
              'Support the containment, security, and research of anomalous entities',
              'Sustain and protect the operational capacity of the SCP Foundation and allied organizations',
              'Reduce reliance on direct military escalation during anomalous incidents',
              'Prevent the weaponization of anomalies by governments or private entities',
              'Preserve global secrecy while maintaining stable international relations',
            ].map((objective, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </section>

          {/* Civil Branch */}
          <section
          data-section
          id="civil-section"
          className={`mb-16 transition-all duration-700 delay-400 ${
            visibleSections.has('civil-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Civil Branch</h2>
          <p className="text-sm text-muted-foreground mb-6 font-semibold">(4 Subdivisions)</p>

          <div className="space-y-8">
            {[
              {
                title: 'Office of Diplomatic Affairs (ODA)',
                desc: 'Serves as the primary civil authority of CONAS within Site-416.',
                items: [
                  'Maintaining diplomatic relations with the SCP Foundation',
                  'Conducting joint meetings and strategic discussions',
                  'Overseeing financial coordination and future development planning',
                  'Performing inspections across containment zones, general facilities, and combat areas',
                ],
              },
              {
                title: 'Division and Allocation (D&A)',
                desc: 'Governs all financial distribution within CONAS operations.',
                items: [
                  'Reviewing and approving funding requests',
                  'Allocating resources across sites and divisions',
                  'Holding final authority over investment, expansion, and development decisions',
                ],
              },
              {
                title: 'External Financial Investigations Division (EFID)',
                desc: 'Enforces financial integrity across all CONAS operations.',
                items: [
                  'Investigating financial fraud, theft, and misuse of funds',
                  'Exercising executive authority to suspend or terminate funding',
                  'Detaining and extraditing personnel involved in financial misconduct',
                  'Conducting independent financial investigations involving external organizations',
                ],
              },
              {
                title: 'Logistics and Engineering (L&E)',
                desc: 'Ensures all facilities meet CONAS operational and structural standards.',
                items: [
                  'Repairing structural damage, wear, and anomaly-related destruction',
                  'Screening all incoming materials to prevent sabotage or defects',
                  'Implementing CONAS-grade infrastructure and containment standards',
                  'Bio-Technical Maintenance Team (BMT) conducts decontamination and restoration',
                ],
              },
            ].map((division, idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-accent mb-2">{division.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{division.desc}</p>
                <ul className="space-y-2">
                  {division.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-foreground text-sm">
                      <span className="text-accent font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

          {/* Defense Branch */}
          <section
          data-section
          id="defense-section"
          className={`mb-16 transition-all duration-700 delay-500 ${
            visibleSections.has('defense-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Defense Branch</h2>
          <p className="text-sm text-muted-foreground mb-6 font-semibold">(4 Subdivisions)</p>

          <div className="space-y-8">
            {[
              {
                title: 'Praetor-1 "Silent Watch" (P-1)',
                desc: 'Primary protective force for CONAS Civil personnel.',
                items: [
                  'Providing security for ODA and other Civil members',
                  'Maintaining a continuous protective presence across facilities',
                  'Acting as the largest internal defense division within CONAS',
                ],
              },
              {
                title: 'Medical Emergency Response Corps (MERC)',
                desc: 'Specialized combat-medical division.',
                items: [
                  'Fully certified combat medics',
                  'Advanced medical training beyond standard field care',
                  'Ensuring the health and operational readiness of all CONAS personnel',
                ],
              },
              {
                title: 'Authority Elite Guarding & Intervention Service (A.E.G.I.S.)',
                desc: '[CLASSIFIED]',
                items: [
                  'Known Subdivision: Æ – B.I.O ("JACKALS")',
                  'Provides security for L&E BMT operations',
                  'Specializes in biologically hazardous and high-risk environments',
                ],
              },
              {
                title: 'Vanguard Intelligence and Global Infiltration Liaison (V.I.G.I.L.)',
                desc: '[CLASSIFIED]',
                items: [],
              },
            ].map((division, idx) => (
              <div key={idx} className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-accent mb-2">{division.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{division.desc}</p>
                {division.items.length > 0 && (
                  <ul className="space-y-2">
                    {division.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-foreground text-sm">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

          {/* Acknowledgements */}
          <section
          data-section
          id="ack-section"
          className={`mb-16 transition-all duration-700 delay-600 ${
            visibleSections.has('ack-section')
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-4xl font-bold text-accent mb-6">Acknowledgements</h2>
          <div className="bg-card rounded-lg p-8 border border-border space-y-6">
            <div>
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-accent">Document Author:</span> ProLockMaster –
                CONAS Faction Leader
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold text-accent">Website Creator:</span> Shinouyu & Manus
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              This document has been produced under the oversight of the CONAS Faction Leader and
              is designated as Out of Roleplay (OOR) material.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Coalition of Nations for Anomalous Security © 2026
          </p>
        </footer>
        </main>
      </div>
    </div>
  );
}
