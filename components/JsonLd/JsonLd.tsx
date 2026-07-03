import { faqItems } from "@/lib/faq";
import { PHONE_E164 } from "@/lib/phone";
import {
  CITY,
  CONTACT_EMAIL,
  REGION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import { INSTAGRAM_URL } from "@/lib/social";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "ru-RU",
      },
      {
        "@type": "Physician",
        "@id": `${SITE_URL}/#physician`,
        name: "Олег Бекоев",
        url: SITE_URL,
        image: `${SITE_URL}/images/doctor.png`,
        telephone: PHONE_E164,
        email: CONTACT_EMAIL,
        description: SITE_DESCRIPTION,
        address: {
          "@type": "PostalAddress",
          addressLocality: CITY,
          addressRegion: REGION,
          addressCountry: "RU",
        },
        areaServed: {
          "@type": "City",
          name: CITY,
        },
        medicalSpecialty: [
          "Psychiatric",
          "Addiction Medicine",
          "Psychotherapy",
        ],
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
