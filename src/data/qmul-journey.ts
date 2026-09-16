import type { ImageMetadata } from "astro";

import leavingMastercardImage from "../assets/qmul-journey/2025-09-02_7368737574506487808_1.jpg";
import startingQmulImage from "../assets/qmul-journey/2025-09-21_7375639002533576704_1.gif";
import encodeHackathonImage from "../assets/qmul-journey/2025-10-27_7388489345877557248_1.jpg";
import londonJsImage from "../assets/qmul-journey/2025-10-31_7389948758479994880_1.jpg";
import dataWorkshopImage from "../assets/qmul-journey/2025-12-02_7401583926055538688_1.jpg";
import thamesReadingImage from "../assets/qmul-journey/2025-12-13_7405561500909719552_1.jpg";
import finovateImage from "../assets/qmul-journey/2026-02-05_7425158750853820418_1.jpg";
import nebiusAcceptanceImage from "../assets/qmul-journey/2026-03-09_7436863451832107008_1.jpg";
import nebiusProjectImage from "../assets/qmul-journey/2026-04-20_7452036707119632384_1.jpg";
import interactionDesignImage from "../assets/qmul-journey/2026-05-05_7457315209146220544_1.jpg";
import nebiusBuildImage from "../assets/qmul-journey/2026-05-21_7463308462517768192_1.jpg";
import techEuropeImage from "../assets/qmul-journey/2026-06-28_7476788871427702784_1.jpg";
import replitLondonImage from "../assets/qmul-journey/2026-09-10_7503948499323924481_1.jpg";

export type JourneyCategory = "Academic" | "Community" | "Fellowship" | "Event";

export interface QmulJourneyItem {
  date: string;
  dateTime: string;
  heading: string;
  summary: string;
  category: JourneyCategory;
  image?: ImageMetadata;
  imageAlt?: string;
  sourceUrl?: string;
}

export const qmulJourney: QmulJourneyItem[] = [
  {
    date: "2 September 2025",
    dateTime: "2025-09-02",
    heading: "Closing one chapter, opening another",
    summary:
      "After six years at Mastercard, I said goodbye to the team that shaped my early career and prepared to move to London for a master’s in Computer Science at Queen Mary University of London.",
    category: "Academic",
    image: leavingMastercardImage,
    imageAlt: "Ayman marking the end of his six-year journey at Mastercard",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7368737574506487808/",
  },
  {
    date: "21 September 2025",
    dateTime: "2025-09-21",
    heading: "Starting the MSc at QMUL",
    summary:
      "I began the MSc in Advanced Computer Science, bringing six years of industry experience into deeper study of machine learning, big data and functional programming.",
    category: "Academic",
    image: startingQmulImage,
    imageAlt: "Announcement of Ayman starting his MSc at Queen Mary University of London",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7375639002533576704/",
  },
  {
    date: "27 October 2025",
    dateTime: "2025-10-27",
    heading: "Third place at my first London hackathon",
    summary:
      "Representing the QMUL Computer Science Society, our team built Phantom Fraud in 72 hours and placed third in the Encode London Hackathon’s Solana bounty.",
    category: "Community",
    image: encodeHackathonImage,
    imageAlt: "The QMUL Computer Science Society team at the Encode London Hackathon",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7388489345877557248/",
  },
  {
    date: "31 October 2025",
    dateTime: "2025-10-31",
    heading: "My first London tech meetup",
    summary:
      "I headed to London.js after classes and learned about web performance, creative programming education and emerging protocols for AI agents.",
    category: "Community",
    image: londonJsImage,
    imageAlt: "A London.js meetup attended after classes",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7389948758479994880/",
  },
  {
    date: "2 December 2025",
    dateTime: "2025-12-02",
    heading: "Exploring the modern data stack",
    summary:
      "A Confluent workshop connected classroom interests with a live pipeline spanning Kafka, Flink, time-series forecasting, Iceberg and DuckDB.",
    category: "Event",
    image: dataWorkshopImage,
    imageAlt: "A modern data engineering workshop in London",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7401583926055538688/",
  },
  {
    date: "13 December 2025",
    dateTime: "2025-12-13",
    heading: "Making space to keep learning",
    summary:
      "Between university work and London life, I took The Scaling Era to the Thames and reflected on the people and ideas shaping modern AI.",
    category: "Community",
    image: thamesReadingImage,
    imageAlt: "Reading The Scaling Era beside the River Thames in London",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7405561500909719552/",
  },
  {
    date: "5 February 2026",
    dateTime: "2026-02-05",
    heading: "Returning to fintech with a student’s perspective",
    summary:
      "Finovate Europe offered a fresh look at financial services, AI and fraud defence while reconnecting my master’s studies with my earlier payments experience.",
    category: "Event",
    image: finovateImage,
    imageAlt: "Finovate Europe 2026 event announcement",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7425158750853820418/",
  },
  {
    date: "9 March 2026",
    dateTime: "2026-03-09",
    heading: "Accepted into Nebius Academy",
    summary:
      "In the middle of exam season, I joined a 14-week AI Engineering fellowship to study LLM architecture, performance engineering, post-training and production MLOps.",
    category: "Fellowship",
    image: nebiusAcceptanceImage,
    imageAlt: "Acceptance into the Nebius Academy AI Engineering fellowship",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7436863451832107008/",
  },
  {
    date: "20 April 2026",
    dateTime: "2026-04-20",
    heading: "Building a code-aware repository summariser",
    summary:
      "For the Nebius Academy challenge, I built an API that uses Tree-sitter and token-budgeted context assembly to turn GitHub repositories into useful summaries.",
    category: "Fellowship",
    image: nebiusProjectImage,
    imageAlt: "Architecture of the repository summarisation project",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7452036707119632384/",
  },
  {
    date: "5 May 2026",
    dateTime: "2026-05-05",
    heading: "Designing for work at the lab bench",
    summary:
      "Our Interactive System Design project explored how wet-lab researchers document experiments, moving from user research and conceptual models to iterative prototypes.",
    category: "Academic",
    image: interactionDesignImage,
    imageAlt: "Interactive System Design project about wet-lab experiment documentation",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7457315209146220544/",
  },
  {
    date: "21 May 2026",
    dateTime: "2026-05-21",
    heading: "Seeing AI infrastructure at production scale",
    summary:
      "At Nebius Build/Lon, I connected the fellowship’s foundations to GPU-era serverless systems, inference performance, coding benchmarks and real-world agent reliability.",
    category: "Fellowship",
    image: nebiusBuildImage,
    imageAlt: "A talk at the Nebius Build London event",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7463308462517768192/",
  },
  {
    date: "28 June 2026",
    dateTime: "2026-06-28",
    heading: "Bridging deep science and venture capital",
    summary:
      "At the Tech Europe Hackathon, our team built an AI research-to-investment pipeline and received an award for the event’s most secure codebase.",
    category: "Event",
    image: techEuropeImage,
    imageAlt: "The team presenting at the Tech Europe Hackathon",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7476788871427702784/",
  },
  {
    date: "10 September 2026",
    dateTime: "2026-09-10",
    heading: "Ending the year among London’s builders",
    summary:
      "A Replit London conversation with Amjad Masad and Paul Graham made a fitting final marker for a year spent studying, building and joining the city’s technology community.",
    category: "Event",
    image: replitLondonImage,
    imageAlt: "Amjad Masad and Paul Graham speaking at Replit London",
    sourceUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7503948499323924481/",
  },
];
