import type { Metadata } from "next";
import type { LandingPageData } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";

/** Единые meta для посадочных: canonical и OG с trailing slash */
export function landingMetadata(data: LandingPageData): Metadata {
  const path = `/${data.slug}/`;
  const url = `${SITE_URL}${path}`;

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: path },
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      type: "website",
      locale: "ru_RU",
    },
  };
}
