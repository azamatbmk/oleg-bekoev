import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage/LandingPage";
import { getLanding } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";

const data = getLanding("vyvod-iz-zapoya")!;

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `/${data.slug}` },
  openGraph: {
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/${data.slug}`,
    type: "website",
    locale: "ru_RU",
  },
};

export default function Page() {
  return <LandingPage data={data} />;
}
