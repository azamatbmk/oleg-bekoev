import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage/LandingPage";
import { getLanding } from "@/lib/landings";
import { landingMetadata } from "@/lib/landingMetadata";

const data = getLanding("narkolog-na-dom")!;

export const metadata: Metadata = landingMetadata(data);

export default function Page() {
  return <LandingPage data={data} />;
}
