export type LandingSection = {
  title: string;
  paragraphs: string[];
};

export type LandingPageData = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  navLabel: string;
  label: string;
  lead: string;
  price: string;
  paragraphs: string[];
  /** Экспертные блоки (осмотр, показания, ограничения) */
  sections: LandingSection[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  related: { slug: string; label: string }[];
  reviewedNote?: string;
};
