import type { Metadata } from "next";
import Link from "next/link";
import Book from "@/components/Book/Book";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { DOCTOR } from "@/lib/doctor";
import { SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: `${DOCTOR.fullName} — психиатр и нарколог во Владикавказе`,
  },
  description: `${DOCTOR.fullName}, ${DOCTOR.specialty}. ${DOCTOR.serviceArea}. Выезд 24/7, консультации, лечение зависимостей.`,
  alternates: { canonical: "/o-vrage/" },
  openGraph: {
    title: `${DOCTOR.fullName} — психиатр и нарколог во Владикавказе`,
    description: DOCTOR.experienceNote,
    url: `${SITE_URL}/o-vrage/`,
    type: "profile",
    locale: "ru_RU",
  },
};

export default function DoctorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": `${SITE_URL}/#physician`,
    },
    url: `${SITE_URL}/o-vrage/`,
    name: DOCTOR.fullName,
    description: `${DOCTOR.fullName} — ${DOCTOR.specialty}`,
    breadcrumb: {
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
          name: "О враче",
          item: `${SITE_URL}/o-vrage/`,
        },
      ],
    },
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
            <span>О враче</span>
          </nav>

          <header className={styles.header}>
            <span className={styles.label}>Врач</span>
            <h1 className={styles.title}>{DOCTOR.fullName}</h1>
            <p className={styles.lead}>
              {DOCTOR.specialty}. Приём и выездная помощь во{" "}
              {DOCTOR.cityLocative} и в РСО-Алании (Северная Осетия).
            </p>
          </header>

          <section className={styles.block}>
            <h2 className={styles.h2}>Опыт и подход</h2>
            <p>{DOCTOR.experienceNote}</p>
            <p>
              Работаю с зависимостями, тревожными и депрессивными состояниями,
              оказываю экстренную наркологическую помощь на дому и составляю
              дальнейший план лечения.
            </p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Образование</h2>
            <ul className={styles.list}>
              {DOCTOR.education.map((item) => (
                <li key={item.place}>
                  <strong>{item.place}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Диплом и аккредитация подтверждаются Минздравом России. Копии
              документов предоставляются по запросу на консультации.
            </p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>График и зона помощи</h2>
            <ul className={styles.list}>
              <li>{DOCTOR.schedule.houseCall}</li>
              <li>{DOCTOR.schedule.appointment}</li>
              <li>Зона: {DOCTOR.serviceArea}</li>
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Исполнитель услуг и лицензия</h2>
            <p>{DOCTOR.legal.executor}</p>
            <p>{DOCTOR.legal.license}</p>
            <p>{DOCTOR.legal.address}</p>
            <p className={styles.note}>
              Реквизиты исполнителя и номер лицензии уточняйте по телефону или на
              консультации — после подтверждения документов они будут указаны на
              этой странице.
            </p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>Профили и контакты</h2>
            <ul className={styles.list}>
              <li>
                Телефон:{" "}
                <a href={`tel:${DOCTOR.contacts.phoneE164}`}>
                  {DOCTOR.contacts.phoneDisplay}
                </a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${DOCTOR.contacts.email}`}>
                  {DOCTOR.contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={DOCTOR.profiles.prodoctorov}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Профиль на ПроДокторов
                </a>{" "}
                — сверьте ФИО, город и стаж с документами (на агрегаторе может
                отличаться город/стаж).
              </li>
              <li>
                <a
                  href={DOCTOR.profiles.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </section>

          <p className={styles.links}>
            <Link href="/konsultaciya/">Консультация</Link>
            <Link href="/politika-konfidencialnosti/">
              Политика конфиденциальности
            </Link>
          </p>
        </div>
      </article>
      <Book />
      <SiteFooter />
    </main>
  );
}
