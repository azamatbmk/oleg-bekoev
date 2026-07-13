import Link from "next/link";
import Book from "@/components/Book/Book";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import type { LandingPageData } from "@/lib/landings";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/phone";
import { SITE_URL } from "@/lib/site";
import styles from "./LandingPage.module.css";

type Props = {
  data: LandingPageData;
};

export default function LandingPage({ data }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: data.h1,
        description: data.description,
        url: `${SITE_URL}/${data.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              <a href={PHONE_TEL} className={styles.primaryButton}>
                Позвонить {PHONE_DISPLAY}
              </a>
              <a href="#book" className={styles.secondaryButton}>
                Оставить заявку
              </a>
            </div>
          </header>

          <div className={styles.body}>
            {data.paragraphs.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>

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

          <p className={styles.back}>
            <Link href="/#services">Все услуги на главной</Link>
          </p>
        </div>
      </article>
      <Book />
      <SiteFooter />
    </main>
  );
}
