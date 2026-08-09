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

/** Sitewide schema (без FAQ — FAQ только на главной / посадочных) */
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
        areaServed: [
          { "@type": "City", name: CITY },
          { "@type": "AdministrativeArea", name: REGION },
        ],
        availableService: [
          { "@type": "MedicalProcedure", name: "Нарколог на дом" },
          { "@type": "MedicalProcedure", name: "Вывод из запоя" },
          { "@type": "MedicalProcedure", name: "Кодирование от алкоголя" },
          { "@type": "MedicalProcedure", name: "Лечение алкоголизма" },
        ],
        medicalSpecialty: [
          "Psychiatric",
          "Addiction Medicine",
          "Psychotherapy",
        ],
        sameAs: [INSTAGRAM_URL],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
