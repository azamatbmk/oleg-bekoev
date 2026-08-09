import Link from "next/link";
import Book from "@/components/Book/Book";
import PhoneLink from "@/components/PhoneLink/PhoneLink";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import type { LandingPageData } from "@/lib/landings";
import { PHONE_DISPLAY } from "@/lib/phone";
import { SITE_URL } from "@/lib/site";
import styles from "./LandingPage.module.css";

type Props = {
  data: LandingPageData;
};

export default function LandingPage({ data }: Props) {
  const pageUrl = `${SITE_URL}/${data.slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: data.h1,
        description: data.description,
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data.h1,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((item) => ({
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader homeLinks />
      <article className={styles.page}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Навигация">
            <Link href="/">Главная</Link>
            <span aria-hidden>/</span>
            <span>{data.h1}</span>
          </nav>

          <header className={styles.header}>
            <span className={styles.label}>{data.label}</span>
            <h1 className={styles.title}>{data.h1}</h1>
            <p className={styles.lead}>{data.lead}</p>
            <p className={styles.price}>
              Стоимость: <strong>{data.price}</strong>
            </p>
            <div className={styles.actions}>
              <PhoneLink
                className={styles.primaryButton}
                goalParams={{ place: "landing", page: data.slug }}
              >
                Позвонить {PHONE_DISPLAY}
              </PhoneLink>
              <a href="#book" className={styles.secondaryButton}>
                Оставить заявку
              </a>
            </div>
          </header>

          <div className={styles.body}>
            {data.paragraphs.map((text, index) => (
              <p key={`${data.slug}-p-${index}`}>{text}</p>
            ))}
          </div>

          {data.sections.map((section, sectionIndex) => {
            const headingId = `${data.slug}-section-${sectionIndex}`;
            return (
              <section
                key={headingId}
                className={styles.expert}
                aria-labelledby={headingId}
              >
                <h2 id={headingId} className={styles.sectionTitle}>
                  {section.title}
                </h2>
                {section.paragraphs.map((text, index) => (
                  <p
                    key={`${headingId}-p-${index}`}
                    className={styles.expertText}
                  >
                    {text}
                  </p>
                ))}
              </section>
            );
          })}

          <section className={styles.benefits} aria-labelledby="benefits-title">
            <h2 id="benefits-title" className={styles.sectionTitle}>
              Что входит в помощь
            </h2>
            <ul className={styles.benefitList}>
              {data.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.faq} aria-labelledby="landing-faq-title">
            <h2 id="landing-faq-title" className={styles.sectionTitle}>
              Частые вопросы
            </h2>
            <div className={styles.faqList}>
              {data.faqs.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{item.question}</h3>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.related} aria-labelledby="related-title">
            <h2 id="related-title" className={styles.sectionTitle}>
              Связанные услуги
            </h2>
            <ul className={styles.relatedList}>
              {data.related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}/`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <p className={styles.back}>
            <Link href="/#services">Все услуги на главной</Link>
          </p>
          {data.reviewedNote ? (
            <p className={styles.disclaimer}>{data.reviewedNote}</p>
          ) : null}
        </div>
      </article>
      <Book />
      <SiteFooter />
    </main>
  );
}
